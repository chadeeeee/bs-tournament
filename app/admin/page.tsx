"use client"

import { useState, useEffect } from "react"
import { ParticipantsTable } from "@/components/admin/participants-table"
import { Shield } from "lucide-react"

interface Team {
  name: string
  members: string
}

interface Participant {
  id: string
  className: string
  teams: Team[]
  createdAt: string
}

export default function AdminPage() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchParticipants = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/participants")
      if (res.ok) {
        const data = await res.json()
        setParticipants(data)
      }
    } catch (error) {
      console.error("Failed to fetch participants:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchParticipants()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">Адмін панель</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ParticipantsTable
          participants={participants}
          isLoading={isLoading}
        />
      </div>
    </main>
  )
}
