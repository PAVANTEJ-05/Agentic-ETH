import { NextRequest, NextResponse } from "next/server";
import { getRoomById } from "@/db/mongodb";

// For App Router, the file should be in app/api/rooms/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Remove the await from params.id - params is already available
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    const room = await getRoomById(id);
    
    // Add a check for if room is not found
    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}