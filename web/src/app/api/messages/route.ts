import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import type { ApiResponse } from "@/types";

// ─── GET /api/messages ───
// Returns all messages (admin only in production)
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("[GET /api/messages]", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── POST /api/messages ───
// Submit a question to the doctor
const messageSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional(),
  phone: z.string().min(5).max(20).optional(),
  text: z.string().min(5).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = messageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: `Validation error: ${parsed.error.issues.map((i) => i.message).join(", ")}`,
        },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: parsed.data,
    });

    // TODO: Send notification to admin (email/telegram)

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { id: message.id, message: "Your question has been sent" },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/messages]", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
