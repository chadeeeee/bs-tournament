import { NextRequest, NextResponse } from "next/server"
import { getParticipants, updateParticipantPresence } from "@/lib/data"

export async function GET() {
  try {
    const participants = await getParticipants()
    return NextResponse.json(participants)
  } catch (error) {
    console.error("Fetch participants error:", error)
    return NextResponse.json(
      { error: "Помилка отримання даних" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, present } = body

    if (!id || typeof present !== "boolean") {
      return NextResponse.json(
        { error: "Невірні дані" },
        { status: 400 }
      )
    }

    const participant = await updateParticipantPresence(id, present)

    if (!participant) {
      return NextResponse.json(
        { error: "Учасника не знайдено" },
        { status: 404 }
      )
    }

    return NextResponse.json(participant)
  } catch (error) {
    console.error("Update participant error:", error)
    return NextResponse.json(
      { error: "Помилка оновлення" },
      { status: 500 }
    )
  }
}
