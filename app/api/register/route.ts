import { NextRequest, NextResponse } from "next/server"
import { addParticipant, getParticipants, type Team } from "@/lib/data"

interface TeamInput {
  name: string
  members: string[]
}

// Клас має бути у форматі 5-11-(А-В якщо 5-9, А-Б якщо 10-11)
function isValidClassName(className: string): boolean {
  const match = className.match(/^([5-9]|10|11)-([А-В])$/i)
  if (!match) return false
  const num = parseInt(match[1], 10)
  const letter = match[2].toUpperCase()
  if (num >= 5 && num <= 9) return letter === 'А' || letter === 'Б' || letter === 'В'
  if (num === 10 || num === 11) return letter === 'А' || letter === 'Б'
  return false
}

function getClientIp(req: NextRequest): string | null {
  // Next.js edge API route: x-forwarded-for is standard
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  // fallback (not always available)
  return req.ip || null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { className, teams } = body;

    if (!className || typeof className !== "string" || className.trim().length < 1) {
      return NextResponse.json(
        { error: "Введіть клас" },
        { status: 400 }
      );
    }
    if (!isValidClassName(className.trim())) {
      return NextResponse.json(
        { error: "Неправильний формат класу" },
        { status: 400 }
      );
    }


    // Перевірка на клас (заборонити дублікати)
    const classExists = getParticipants().some(p => p.className?.trim().toLowerCase() === className.trim().toLowerCase());
    if (classExists) {
      return NextResponse.json(
        { error: "Цей клас вже зареєстрований. Можна зареєструвати лише один раз." },
        { status: 429 }
      );
    }

    // Перевірка на IP
    const ip = getClientIp(request);
    if (ip) {
      const exists = getParticipants().some(p => (p as any).ip === ip);
      if (exists) {
        return NextResponse.json(
          { error: "Ви вже подали заявку з цього пристрою/IP." },
          { status: 429 }
        );
      }
    }

    if (!teams || !Array.isArray(teams) || teams.length < 1) {
      return NextResponse.json(
        { error: "Потрібно зареєструвати мінімум 1 команду" },
        { status: 400 }
      );
    }

    const validTeams: Team[] = [];

    for (const t of teams as TeamInput[]) {
      if (!t.name?.trim()) {
        return NextResponse.json(
          { error: "Введіть назву команди" },
          { status: 400 }
        );
      }

      if (!t.members || !Array.isArray(t.members) || t.members.length !== 3) {
        return NextResponse.json(
          { error: "Кожна команда має містити 3 учасників" },
          { status: 400 }
        );
      }

      const validMembers = t.members.map(m => m?.trim()).filter(Boolean);
      if (validMembers.length !== 3) {
        return NextResponse.json(
          { error: "Заповніть ПІБ усіх 3 учасників команди" },
          { status: 400 }
        );
      }

      validTeams.push({
        name: t.name.trim(),
        members: validMembers
      });
    }

    if (validTeams.length < 1) {
      return NextResponse.json(
        { error: "Потрібно заповнити дані хоча б однієї команди" },
        { status: 400 }
      );
    }

    // Додаємо ip до об'єкта (тимчасово через any, бо структура Participant не містить ip)
    const participant = addParticipant(className.trim(), validTeams);
    if (ip) (participant as any).ip = ip;

    return NextResponse.json(
      { message: "Успішна реєстрація", participant },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    );
  }
}
