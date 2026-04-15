// In-memory data store (simulates database)
// Note: Data will reset on server restart

export interface Team {
  name: string
  members: string[] // Array of 3 full names (PIB)
}

export interface Participant {
  id: string
  className: string
  teams: Team[]
  present: boolean
  createdAt: string
}

// Global store
const participants: Participant[] = []

export function getParticipants(): Participant[] {
  return [...participants]
}

export function addParticipant(className: string, teams: Team[]): Participant {
  const participant: Participant = {
    id: crypto.randomUUID(),
    className,
    teams,
    present: false,
    createdAt: new Date().toISOString(),
  }
  participants.push(participant)
  return participant
}

export function updateParticipantPresence(id: string, present: boolean): Participant | null {
  const participant = participants.find((p) => p.id === id)
  if (participant) {
    participant.present = present
    return participant
  }
  return null
}
