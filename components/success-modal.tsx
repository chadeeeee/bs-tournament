"use client"

import { useEffect, useState } from "react"
import { Trophy, Calendar, Clock, X } from "lucide-react"

interface SuccessModalProps {
  open: boolean
  onClose: () => void
}

export function SuccessModal({ open, onClose }: SuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (open) {
      setIsVisible(true)
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  if (!isVisible) return null

  // Tournament date: next Friday at 15:00
  const tournamentDate = getNextFriday()
  const dayName = tournamentDate.toLocaleDateString("uk-UA", { weekday: "long" })
  const dateStr = tournamentDate.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-sm transition-all duration-300 ease-out ${
          isAnimating 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-40" />
        
        <div className="relative bg-card border-2 border-border rounded-2xl p-6 text-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Success Icon */}
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-3 bg-primary/20 rounded-full blur-xl" />
            <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-full">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-black text-foreground mb-2">
            Ви зареєстровані!
          </h2>
          
          <p className="text-muted-foreground mb-6">
            До зустрчі!
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full h-12 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold rounded-xl border-b-4 border-secondary/60 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1 transition-all duration-100"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  )
}

function getNextFriday(): Date {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7
  const nextFriday = new Date(today)
  nextFriday.setDate(today.getDate() + daysUntilFriday)
  nextFriday.setHours(15, 0, 0, 0)
  return nextFriday
}
