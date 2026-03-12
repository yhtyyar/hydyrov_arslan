import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { ApiResponse } from "@/types";

// ─── GET /api/portfolio ───
// Returns published portfolio items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: Record<string, unknown> = { isPublished: true };
    if (category && category !== "all") {
      where.category = category;
    }

    const items = await prisma.portfolioItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        service: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("[GET /api/portfolio]", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
