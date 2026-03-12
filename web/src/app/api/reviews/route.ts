import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import type { ApiResponse } from "@/types";

// ─── GET /api/reviews ───
// Returns approved, visible reviews
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        isApproved: true,
        isVisible: true,
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    const mapped = reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      text: r.text,
      userName: r.user.name,
      createdAt: r.createdAt.toISOString(),
    }));

    return NextResponse.json<ApiResponse>({
      success: true,
      data: mapped,
    });
  } catch (error) {
    console.error("[GET /api/reviews]", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── POST /api/reviews ───
// Submit a new review (requires authentication in production)
const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  text: z.string().min(10).max(1000),
  userId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: `Validation error: ${parsed.error.issues.map((i) => i.message).join(", ")}` },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId: parsed.data.userId,
        rating: parsed.data.rating,
        text: parsed.data.text,
        isApproved: false, // Requires admin moderation
      },
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: { id: review.id, message: "Review submitted for moderation" },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/reviews]", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
