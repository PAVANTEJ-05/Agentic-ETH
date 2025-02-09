// app/api/rooms/all/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllRooms } from "@/db/mongodb";
import { IRoom } from "@/db/models/Room";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const options = {
      limit: parseInt(searchParams.get("limit") || "50"),
      skip: parseInt(searchParams.get("skip") || "0"),
      sortBy: (searchParams.get("sortBy") as keyof IRoom) || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    };

    const result = await getAllRooms(options);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching all rooms:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
