"use client"

import { useEffect, useState } from "react"
import { RegistrationForm } from "@/components/registration-form"
import { SuccessModal } from "@/components/success-modal"
import { AnnouncementModal } from "@/components/announcement-modal"
import { Zap, Trophy, Star, Swords } from "lucide-react"

export default function HomePage() {
  const [showModal, setShowModal] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(false)

  useEffect(() => {
    // Show announcement after a brief delay
    const timer = setTimeout(() => setShowAnnouncement(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-secondary/40 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-accent/30 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Star className="absolute top-[15%] left-[10%] w-8 h-8 text-primary/40 animate-float" />
        <Zap className="absolute top-[25%] right-[15%] w-10 h-10 text-accent/40 animate-float-delay-1" />
        <Trophy className="absolute bottom-[30%] left-[8%] w-12 h-12 text-primary/30 animate-float-delay-2" />
        <Swords className="absolute bottom-[20%] right-[12%] w-9 h-9 text-secondary/40 animate-float-delay-3" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl" />
            <img src="/bs-logo.png" alt="logo" width={200} height={200} />
          </div>
          
          {/* <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-balance">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              ЧЕМПІОНАТ ПО BRAWL STARS
            </span>
          </h1> */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground/90 mt-2 tracking-wide">
            ЧЕМПІОНАТ ПО BRAWL STARS
          </h2>
          {/* <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Покажи свої навички та стань чемпіоном серед найкращих гравців!
          </p> */}
        </div>

        {/* Registration Card */}
        <div className="w-full max-w-md">
          <div className="relative">
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-30" />
            
            <div className="relative bg-card/80 backdrop-blur-xl border-2 border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">Реєстрація</h3>
              </div>
              
              <RegistrationForm onSuccess={() => setShowModal(true)} />
            </div>
          </div>
        </div>

        </div>

      {/* Success Modal */}
      <SuccessModal open={showModal} onClose={() => setShowModal(false)} />
      
      {/* Starting Announcement Modal */}
      <AnnouncementModal open={showAnnouncement} onClose={() => setShowAnnouncement(false)} />
    </main>
  )
}
