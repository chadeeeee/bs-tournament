import { NextRequest, NextResponse } from "next/server"
import { addParticipant, type Team } from "@/lib/data"

interface TeamInput {
  name: string
  members: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { className, teams } = body

    if (!className || typeof className !== "string" || className.trim().length < 1) {
      return NextResponse.json(
        { error: "Введіть клас" },
        { status: 400 }
      )
    }

    if (!teams || !Array.isArray(teams) || teams.length < 1) {
      return NextResponse.json(
        { error: "Потрібно зареєструвати мінімум 1 команду" },
        { status: 400 }
      )
    }

    const validTeams: Team[] = []
    
    for (const t of teams as TeamInput[]) {
      if (!t.name?.trim()) {
        return NextResponse.json(
          { error: "Введіть назву команди" },
          { status: 400 }
        )
      }
      
      if (!t.members || !Array.isArray(t.members) || t.members.length !== 3) {
        return NextResponse.json(
          { error: "Кожна команда має містити 3 учасників" },
          { status: 400 }
        )
      }

      const validMembers = t.members.map(m => m?.trim()).filter(Boolean)
      if (validMembers.length !== 3) {
        return NextResponse.json(
          { error: "Заповніть ПІБ усіх 3 учасників команди" },
          { status: 400 }
        )
      }

      validTeams.push({
        name: t.name.trim(),
        members: validMembers
      })
    }

    if (validTeams.length < 1) {
      return NextResponse.json(
        { error: "Потрібно заповнити дані хоча б однієї команди" },
        { status: 400 }
      )
    }

    const participant = addParticipant(className.trim(), validTeams)

    return NextResponse.json(
      { message: "Успішна реєстрація", participant },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    )
  }
}
