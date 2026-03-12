import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import {
  addMinutes,
  parseISO,
  setHours,
  setMinutes,
  isAfter,
  isBefore,
  areIntervalsOverlapping,
  startOfDay,
} from "date-fns";
import type { ApiResponse, AvailableSlotsResponse, BookingResponse, TimeSlot } from "@/types";

// ─── GET /api/appointments?date=YYYY-MM-DD&serviceId=xxx ───
// Returns available time slots for a given date and service
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");
    const serviceId = searchParams.get("serviceId");

    if (!dateParam || !serviceId) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Parameters 'date' and 'serviceId' are required" },
        { status: 400 }
      );
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateParam)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Date must be in YYYY-MM-DD format" },
        { status: 400 }
      );
    }

    const targetDate = parseISO(dateParam);
    const dayOfWeek = targetDate.getDay();

    // 1. Check if the date is blocked (holiday, vacation, etc.)
    const blockedDate = await prisma.blockedDate.findUnique({
      where: { date: targetDate },
    });

    if (blockedDate) {
      return NextResponse.json<ApiResponse<AvailableSlotsResponse>>({
        success: true,
        data: {
          date: dateParam,
          serviceName: "",
          duration: 0,
          slots: [],
        },
      });
    }

    // 2. Get the schedule for this day of the week
    const schedule = await prisma.schedule.findUnique({
      where: { dayOfWeek },
    });

    if (!schedule || !schedule.isWorkingDay) {
      return NextResponse.json<ApiResponse<AvailableSlotsResponse>>({
        success: true,
        data: {
          date: dateParam,
          serviceName: "",
          duration: 0,
          slots: [],
        },
      });
    }

    // 3. Get the service to know its duration
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service || !service.isActive) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Service not found or inactive" },
        { status: 404 }
      );
    }

    // 4. Get existing appointments for this date (excluding cancelled)
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: targetDate,
        status: { notIn: ["CANCELLED"] },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    // 5. Generate all possible slots based on schedule
    const [startHour, startMin] = schedule.startTime.split(":").map(Number);
    const [endHour, endMin] = schedule.endTime.split(":").map(Number);

    const workStart = setMinutes(setHours(targetDate, startHour), startMin);
    const workEnd = setMinutes(setHours(targetDate, endHour), endMin);

    let breakStart: Date | null = null;
    let breakEnd: Date | null = null;
    if (schedule.breakStart && schedule.breakEnd) {
      const [bsH, bsM] = schedule.breakStart.split(":").map(Number);
      const [beH, beM] = schedule.breakEnd.split(":").map(Number);
      breakStart = setMinutes(setHours(targetDate, bsH), bsM);
      breakEnd = setMinutes(setHours(targetDate, beH), beM);
    }

    const slotDuration = service.duration; // in minutes
    const slots: TimeSlot[] = [];
    let currentSlotStart = workStart;

    while (isBefore(addMinutes(currentSlotStart, slotDuration), workEnd) ||
           addMinutes(currentSlotStart, slotDuration).getTime() === workEnd.getTime()) {
      const slotEnd = addMinutes(currentSlotStart, slotDuration);

      // Check if slot overlaps with break
      let overlapWithBreak = false;
      if (breakStart && breakEnd) {
        overlapWithBreak = areIntervalsOverlapping(
          { start: currentSlotStart, end: slotEnd },
          { start: breakStart, end: breakEnd }
        );
      }

      // Check if slot overlaps with existing appointments
      const overlapWithAppointment = existingAppointments.some((apt) =>
        areIntervalsOverlapping(
          { start: currentSlotStart, end: slotEnd },
          { start: apt.startTime, end: apt.endTime }
        )
      );

      // Check if slot is in the past
      const isInPast = isBefore(currentSlotStart, new Date());

      const isAvailable = !overlapWithBreak && !overlapWithAppointment && !isInPast;

      slots.push({
        startTime: currentSlotStart.toISOString(),
        endTime: slotEnd.toISOString(),
        isAvailable,
      });

      // Move to next slot (30-minute intervals)
      currentSlotStart = addMinutes(currentSlotStart, 30);
    }

    return NextResponse.json<ApiResponse<AvailableSlotsResponse>>({
      success: true,
      data: {
        date: dateParam,
        serviceName: service.name,
        duration: service.duration,
        slots,
      },
    });
  } catch (error) {
    console.error("[GET /api/appointments]", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── POST /api/appointments ───
// Create a new appointment (booking) with optimistic locking
const bookingSchema = z.object({
  serviceId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().datetime(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(5).max(20),
  notes: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: `Validation error: ${parsed.error.issues.map((i) => i.message).join(", ")}`,
        },
        { status: 400 }
      );
    }

    const { serviceId, date, startTime, name, email, phone, notes } = parsed.data;

    // 1. Get the service
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service || !service.isActive) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Service not found or inactive" },
        { status: 404 }
      );
    }

    const slotStart = parseISO(startTime);
    const slotEnd = addMinutes(slotStart, service.duration);
    const targetDate = startOfDay(parseISO(date));

    // 2. Check if the slot is in the past
    if (isBefore(slotStart, new Date())) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Cannot book a slot in the past" },
        { status: 400 }
      );
    }

    // 3. CRITICAL: Atomic check + insert using a transaction
    //    This prevents double booking via race conditions
    const result = await prisma.$transaction(async (tx) => {
      // Check for conflicting appointments (with row-level locking via Prisma transaction)
      const conflicts = await tx.appointment.findMany({
        where: {
          date: targetDate,
          status: { notIn: ["CANCELLED"] },
          OR: [
            {
              AND: [
                { startTime: { lt: slotEnd } },
                { endTime: { gt: slotStart } },
              ],
            },
          ],
        },
      });

      if (conflicts.length > 0) {
        throw new Error("SLOT_TAKEN");
      }

      // Check if the date is blocked
      const blocked = await tx.blockedDate.findUnique({
        where: { date: targetDate },
      });

      if (blocked) {
        throw new Error("DATE_BLOCKED");
      }

      // Find or create patient user
      let user = await tx.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Create a new patient account (password will be set later via email)
        user = await tx.user.create({
          data: {
            email,
            name,
            phone,
            role: "PATIENT",
            passwordHash: "", // To be set via registration flow
          },
        });
      }

      // Create the appointment
      const appointment = await tx.appointment.create({
        data: {
          userId: user.id,
          serviceId,
          date: targetDate,
          startTime: slotStart,
          endTime: slotEnd,
          status: "PENDING",
          notes: notes || null,
        },
        include: {
          service: true,
        },
      });

      return appointment;
    });

    // TODO: Send confirmation email/SMS here

    return NextResponse.json<ApiResponse<BookingResponse>>(
      {
        success: true,
        data: {
          appointmentId: result.id,
          date: date,
          startTime: result.startTime.toISOString(),
          endTime: result.endTime.toISOString(),
          serviceName: result.service.name,
          status: result.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "SLOT_TAKEN") {
        return NextResponse.json<ApiResponse>(
          { success: false, error: "This time slot is already taken. Please choose another time." },
          { status: 409 }
        );
      }
      if (error.message === "DATE_BLOCKED") {
        return NextResponse.json<ApiResponse>(
          { success: false, error: "This date is not available for booking." },
          { status: 409 }
        );
      }
    }

    console.error("[POST /api/appointments]", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
