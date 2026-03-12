import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { ApiResponse } from "@/types";

// ─── GET /api/services ───
// Returns all active services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        duration: true,
        category: true,
      },
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("[GET /api/services]", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
