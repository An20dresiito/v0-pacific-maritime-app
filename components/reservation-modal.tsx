'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SeatSelectorSpeedboat } from '@/components/seat-selector-speedboat'
import { CabinSelectorFerry } from '@/components/cabin-selector-ferry'
import { DigitalTicket } from '@/components/digital-ticket'
import { MapPin, Ship, Calendar, Users } from 'lucide-react'

interface ReservationModalProps {
  open: boolean
  onClose: () => void
  destination: {
    id: string
    name: string
    operator: string
    vesselType: 'Lancha' | 'Ferry'
    time: string
    date: string
    from: string
    to: string
  }
  userName: string
}

export function ReservationModal({
  open,
  onClose,
  destination,
  userName,
}: ReservationModalProps) {
  const [step, setStep] = useState<'seat-selection' | 'ticket'>('seat-selection')
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)

  const handleSeatSelected = (seat: string) => {
    setSelectedSeat(seat)
  }

  const handleConfirm = () => {
    if (selectedSeat) {
      setStep('ticket')
    }
  }

  const handleTicketClose = () => {
    setStep('seat-selection')
    setSelectedSeat(null)
    onClose()
  }

  const bookingCode = `PC${Math.random().toString(36).substring(2, 11).toUpperCase()}`

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 'seat-selection' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Reserva tu Cupo</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Resumen de la Ruta */}
              <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Ruta</p>
                    <p className="font-bold text-foreground">
                      {destination.from} → {destination.to}
                    </p>
                  </div>
                  <Ship className="w-6 h-6 text-primary" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Operador</p>
                    <p className="font-semibold text-foreground">{destination.operator}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tipo</p>
                    <p className="font-semibold text-foreground">{destination.vesselType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Hora</p>
                    <p className="font-semibold text-foreground">{destination.time}</p>
                  </div>
                </div>
              </div>

              {/* Selector según tipo de embarcación */}
              {destination.vesselType === 'Lancha' ? (
                <SeatSelectorSpeedboat onSeatSelect={handleSeatSelected} />
              ) : (
                <CabinSelectorFerry onCabinSelect={handleSeatSelected} />
              )}

              {/* Botones de Acción */}
              <div className="flex gap-3 pt-6">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!selectedSeat}
                  className="flex-1"
                >
                  Confirmar Reserva
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Tu Boleta de Pasaje</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <DigitalTicket
                passengerName={userName}
                route={`${destination.from} - ${destination.to}`}
                departure={destination.from}
                arrival={destination.to}
                date={destination.date}
                operator={destination.operator}
                vesselType={destination.vesselType}
                seatNumber={selectedSeat || 'N/A'}
                bookingCode={bookingCode}
                onClose={handleTicketClose}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
