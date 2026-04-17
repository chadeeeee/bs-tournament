"use client"

import { useEffect, useState } from "react"
import { Sparkles, Megaphone, X, Calendar, MapPin, Users, Dice5 } from "lucide-react"

interface AnnouncementModalProps {
  open: boolean
  onClose: () => void
}

export function AnnouncementModal({ open, onClose }: AnnouncementModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (open) {
      setIsVisible(true)
      const timer = requestAnimationFrame(() => {
        setIsAnimating(true)
      })
      return () => cancelAnimationFrame(timer)
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-background/90 backdrop-blur-md transition-opacity duration-500 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-lg transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${
          isAnimating 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-90 translate-y-8"
        }`}
      >
        {/* Multi-layered Glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#FFCC00] via-[#FF8800] to-[#FF4400] rounded-[2.5rem] blur-xl opacity-50 animate-pulse" />
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-[2.5rem] blur opacity-75" />
        
        <div className="relative bg-[#1a1a1a] border-4 border-[#FFCC00] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50">
          {/* Header Image/Gradient Area */}
          <div className="h-32 bg-gradient-to-b from-[#FFCC00]/20 to-transparent relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent scale-150 rotate-45" />
            </div>
            
            <div className="relative transform hover:scale-110 transition-transform duration-500">
               <div className="absolute -inset-4 bg-primary/30 rounded-full blur-xl animate-pulse" />
               <Megaphone className="w-16 h-16 text-[#FFCC00] drop-shadow-[0_0_15px_rgba(255,204,0,0.5)]" />
            </div>
          </div>

          <div className="px-6 pb-8 pt-2 text-center">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight tracking-tighter uppercase italic">
              <span className="block text-[#FFCC00] drop-shadow-md">🔥 Чемпіонат з 🔥</span>
              <span className="text-white drop-shadow-[0_2px_0_rgba(0,0,0,1)]">Brawl Stars</span>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-lg md:text-xl font-bold text-white/90 leading-relaxed">
                <Sparkles className="inline-block w-5 h-5 text-[#FFCC00] mr-2 mb-1" />
                Для 5–11 класів!
              </p>
              
              <p className="text-sm md:text-base text-gray-300 font-medium max-w-md mx-auto leading-relaxed">
                Готуйся до напружених баталій та покажи, на що здатна твоя команда!
              </p>

              <div className="grid grid-cols-1 gap-3 mt-6">
                 <div className="flex items-center gap-3 bg-black/40 border border-[#FFCC00]/20 p-3 rounded-xl hover:bg-black/60 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#FFCC00]/10 flex items-center justify-center border border-[#FFCC00]/30">
                       <Users className="w-6 h-6 text-[#FFCC00]" />
                    </div>
                    <div className="text-left">
                       <p className="text-xs text-gray-400 uppercase font-black">Формат</p>
                       <p className="text-sm font-bold text-white uppercase italic">3 на 3 (Командна робота)</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-3 bg-black/40 border border-[#FFCC00]/20 p-3 rounded-xl hover:bg-black/60 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#FFCC00]/10 flex items-center justify-center border border-[#FFCC00]/30">
                       <Dice5 className="w-6 h-6 text-[#FFCC00]" />
                    </div>
                    <div className="text-left">
                       <p className="text-xs text-gray-400 uppercase font-black">Режими</p>
                       <p className="text-sm font-bold text-white uppercase italic">Обираються рандомно</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-3 bg-black/40 border border-[#FFCC00]/20 p-3 rounded-xl hover:bg-black/60 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#FFCC00]/10 flex items-center justify-center border border-[#FFCC00]/30">
                       <Calendar className="w-6 h-6 text-[#FFCC00]" />
                    </div>
                    <div className="text-left">
                       <p className="text-xs text-gray-400 uppercase font-black">Дата</p>
                       <p className="text-sm font-bold text-white uppercase italic">Середа, 22 квітня</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-3 bg-black/40 border border-[#FFCC00]/20 p-3 rounded-xl hover:bg-black/60 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#FFCC00]/10 flex items-center justify-center border border-[#FFCC00]/30">
                       <MapPin className="w-6 h-6 text-[#FFCC00]" />
                    </div>
                    <div className="text-left">
                       <p className="text-xs text-gray-400 uppercase font-black">Місце</p>
                       <p className="text-sm font-bold text-white uppercase italic">Аудиторія 310</p>
                    </div>
                 </div>
              </div>
            </div>

            <p className="text-xs md:text-sm text-gray-400 font-bold mb-6 italic uppercase tracking-wider">
              Збирай команду, продумуй стратегію та вступай у боротьбу за перемогу!
            </p>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="group relative w-full overflow-hidden rounded-2xl p-[2px] focus:outline-none transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(255,204,0,0.3)] active:translate-y-0"
            >
              <div className="relative flex h-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#FFCC00] to-[#FF8800] px-8 text-black font-black uppercase tracking-tighter text-xl border-b-4 border-[#CCA300] transition-all">
                ЗРОЗУМІЛО!
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
