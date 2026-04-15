"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { GraduationCap, Users, Plus, X, UserCircle } from "lucide-react"

interface TeamMember {
  fullName: string
}

interface Team {
  name: string
  members: TeamMember[]
}

interface RegistrationFormProps {
  onSuccess: () => void
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [className, setClassName] = useState("")
  const [teams, setTeams] = useState<Team[]>([
    { name: "", members: [{ fullName: "" }, { fullName: "" }, { fullName: "" }] }
  ])
  const [showTeams, setShowTeams] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleClassChange = (value: string) => {
    setClassName(value)
    if (value.trim().length > 0 && !showTeams) {
      setShowTeams(true)
    }
  }

  const addTeam = () => {
    if (teams.length < 2) {
      setTeams([...teams, { name: "", members: [{ fullName: "" }, { fullName: "" }, { fullName: "" }] }])
    }
  }

  const removeTeam = (index: number) => {
    if (teams.length > 1) {
      setTeams(teams.filter((_, i) => i !== index))
    }
  }

  const updateTeamName = (index: number, value: string) => {
    const newTeams = [...teams]
    newTeams[index].name = value
    setTeams(newTeams)
  }

  const updateMember = (teamIndex: number, memberIndex: number, value: string) => {
    const newTeams = [...teams]
    newTeams[teamIndex].members[memberIndex].fullName = value
    setTeams(newTeams)
  }

  const isTeamValid = (team: Team) => {
    return team.name.trim() && team.members.every(m => m.fullName.trim())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!className.trim()) {
      setError("Введіть клас")
      return
    }

    const validTeams = teams.filter(isTeamValid)
    if (validTeams.length < 1) {
      setError("Потрібно зареєструвати мінімум 1 команду з усіма заповненими ПІБ учасників")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          className: className.trim(),
          teams: validTeams.map(t => ({
            name: t.name.trim(),
            members: t.members.map(m => m.fullName.trim())
          }))
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Помилка реєстрації")
      }

      setClassName("")
      setTeams([{ name: "", members: [{ fullName: "" }, { fullName: "" }, { fullName: "" }] }])
      setShowTeams(false)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Щось пішло не так")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Class Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Клас
        </label>
        <Input
          type="text"
          placeholder="9-А"
          value={className}
          onChange={(e) => handleClassChange(e.target.value)}
          className="h-12 bg-input border-border focus:border-primary focus:ring-primary/30 placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Teams Section - appears when class is entered */}
      <div 
        className={`space-y-4 overflow-hidden transition-all duration-500 ease-out ${
          showTeams ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Команди
          </label>
          <span className="text-xs text-muted-foreground">
            Мінімум 1, максимум 2 команди
          </span>
        </div>

        <div className="text-xs text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2">
          Кожна команда має 3 учасників. Заповніть ПІБ кожного гравця.
        </div>

        {teams.map((team, teamIndex) => (
          <div 
            key={teamIndex}
            className="relative bg-muted/30 border border-border/50 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300"
          >
            {teams.length > 1 && (
              <button
                type="button"
                onClick={() => removeTeam(teamIndex)}
                className="absolute top-2 right-2 p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            <div className="text-xs font-semibold text-primary uppercase tracking-wider">
              Команда {teamIndex + 1}
            </div>
            
            <Input
              type="text"
              placeholder="Назва команди"
              value={team.name}
              onChange={(e) => updateTeamName(teamIndex, e.target.value)}
              className="h-10 bg-input border-border focus:border-primary focus:ring-primary/30 placeholder:text-muted-foreground/50"
            />

            <div className="space-y-2">
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <UserCircle className="w-3.5 h-3.5" />
                Учасники команди (ПІБ)
              </div>
              
              {team.members.map((member, memberIndex) => (
                <Input
                  key={memberIndex}
                  type="text"
                  placeholder={`Гравець ${memberIndex + 1} - Прізвище Ім'я По батькові`}
                  value={member.fullName}
                  onChange={(e) => updateMember(teamIndex, memberIndex, e.target.value)}
                  className="h-10 bg-input border-border focus:border-primary focus:ring-primary/30 placeholder:text-muted-foreground/50"
                />
              ))}
            </div>
          </div>
        ))}

        {teams.length < 2 && (
          <button
            type="button"
            onClick={addTeam}
            className="w-full h-10 flex items-center justify-center gap-2 border-2 border-dashed border-border hover:border-primary/50 rounded-xl text-muted-foreground hover:text-primary transition-colors"
          >
            <Plus className="w-4 h-4" />
            Додати ще команду
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2 animate-in fade-in duration-200">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground font-black text-lg uppercase tracking-wider rounded-xl border-b-4 border-primary/60 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner className="w-5 h-5" />
            Реєстрація...
          </span>
        ) : (
          "Зареєструватися"
        )}
      </button>
    </form>
  )
}
