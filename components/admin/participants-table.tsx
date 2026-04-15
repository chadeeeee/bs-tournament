"use client"

import { Users, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"

interface Team {
  name: string
  members: string[]
}

interface Participant {
  id: string
  className: string
  teams: Team[]
  createdAt: string
}

interface ParticipantsTableProps {
  participants: Participant[]
  isLoading: boolean
}

export function ParticipantsTable({
  participants,
  isLoading,
}: ParticipantsTableProps) {
  const [search, setSearch] = useState("")

  const filteredParticipants = participants.filter(
    (p) =>
      p.className.toLowerCase().includes(search.toLowerCase()) ||
      p.teams.some(t => 
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.members.some(m => m.toLowerCase().includes(search.toLowerCase()))
      )
  )

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-foreground">Учасники турніру</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Пошук..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 w-full sm:w-64 bg-input border-border"
          />
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner className="w-8 h-8 text-primary" />
        </div>
      ) : filteredParticipants.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">
            {search ? "Нікого не знайдено" : "Ще немає учасників"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground/80">
                  #
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground/80">
                  Клас
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-foreground/80">
                  Команди та учасники
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant, index) => (
                <tr
                  key={participant.id}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-secondary/20 text-secondary px-2 py-1 rounded-md text-sm font-medium">
                      {participant.className}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-3">
                      {participant.teams?.map((team, i) => (
                        <div key={i} className="bg-muted/20 rounded-lg p-2">
                          <div className="font-medium text-primary text-sm mb-1">{team.name}</div>
                          <div className="space-y-0.5">
                            {team.members.map((member, j) => (
                              <div key={j} className="text-xs text-foreground/80 flex items-center gap-1.5">
                                <span className="text-muted-foreground">{j + 1}.</span>
                                {member}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
