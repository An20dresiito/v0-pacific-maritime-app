'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Seat } from 'lucide-react'

interface SeatSelectorSpeedboatProps {
  onSeatSelect: (seatNumber: string) => void
}

export function SeatSelectorSpeedboat({ onSeatSelect }: SeatSelectorSpeedboatProps) {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)

  // Configuración típica de una lancha rápida: 20 asientos en filas
  const seats = Array.from({ length: 20 }, (_, i) => ({
    number: i + 1,
    taken: Math.random() > 0.6, // 40% de ocupación simulada
  }))

  const handleSeatClick = (seatNumber: number) => {
    const seatStr = `A${seatNumber}`
    setSelectedSeat(seatStr)
    onSeatSelect(seatStr)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Selecciona tu asiento en la lancha</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Verde = disponible | Gris = ocupado | Azul = seleccionado
        </p>
      </div>

      <div className="bg-gradient-to-b from-slate-100 to-slate-50 p-8 rounded-lg border-2 border-slate-300">
        {/* Proa (frente) de la lancha */}
        <div className="text-center mb-8 font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
          ⬆️ Proa (Frente de la Lancha)
        </div>

        <div className="space-y-3">
          {/* Renderizar asientos en filas de 4 */}
          {Array.from({ length: 5 }, (_, row) => (
            <div key={row} className="flex justify-center gap-4">
              {seats.slice(row * 4, row * 4 + 4).map((seat) => (
                <button
                  key={seat.number}
                  onClick={() => handleSeatClick(seat.number)}
                  disabled={seat.taken}
                  className={`
                    w-14 h-14 rounded-md font-bold transition-all duration-200
                    flex items-center justify-center text-sm
                    ${selectedSeat === `A${seat.number}`
                      ? 'bg-primary text-primary-foreground scale-110 shadow-lg'
                      : seat.taken
                      ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                      : 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:scale-105'
                    }
                  `}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Popa (atrás) */}
        <div className="text-center mt-8 font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
          ⬇️ Popa (Trasera de la Lancha)
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        {selectedSeat ? (
          <p className="text-sm font-medium text-blue-900">
            ✓ Asiento seleccionado: <span className="font-bold text-primary">{selectedSeat}</span>
          </p>
        ) : (
          <p className="text-sm text-blue-700">Selecciona un asiento para continuar</p>
        )}
      </div>
    </div>
  )
}
