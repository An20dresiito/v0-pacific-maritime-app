'use client'

import { useEffect, useRef } from 'react'
import { Ship, Anchor, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DigitalTicketProps {
  passengerName: string
  route: string
  departure: string
  arrival: string
  date: string
  operator: string
  vesselType: string
  seatNumber: string
  bookingCode: string
  onClose?: () => void
}

export function DigitalTicket({
  passengerName,
  route,
  departure,
  arrival,
  date,
  operator,
  vesselType,
  seatNumber,
  bookingCode,
  onClose,
}: DigitalTicketProps) {
  const ticketRef = useRef<HTMLDivElement>(null)

  // Generar código de barras numérico simulado
  const barcodeNumber = Math.random().toString().slice(2, 15) + Math.random().toString().slice(2, 15)

  return (
    <div className="space-y-6">
      {/* Animación de éxito */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25"></div>
          <div className="relative bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">¡Reserva Confirmada!</h2>
        <p className="text-muted-foreground">Tu boleta de pasaje ha sido generada correctamente</p>
      </div>

      {/* Boleta Digital (Ticket) */}
      <div
        ref={ticketRef}
        className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow-2xl overflow-hidden border-4 border-primary"
      >
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Ship className="w-6 h-6" />
              <h3 className="text-xl font-bold">PACIFICCONNECT</h3>
            </div>
            <Anchor className="w-6 h-6 opacity-50" />
          </div>
          <div className="border-t border-white/30 pt-4">
            <p className="text-sm font-semibold opacity-90">BOLETA DE PASAJE</p>
            <p className="text-2xl font-bold mt-1">{bookingCode}</p>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="p-8 space-y-6">
          {/* Información del Pasajero */}
          <div className="border-l-4 border-primary pl-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Pasajero</p>
            <p className="text-2xl font-bold text-foreground">{passengerName}</p>
          </div>

          {/* Grid de Información */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {/* Ruta */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Ruta</p>
              <p className="font-semibold text-foreground">{route}</p>
              <p className="text-xs text-muted-foreground mt-1">{departure} → {arrival}</p>
            </div>

            {/* Fecha */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Fecha</p>
              <p className="font-semibold text-foreground">{date}</p>
            </div>

            {/* Operador */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Operador</p>
              <p className="font-semibold text-foreground">{operator}</p>
            </div>

            {/* Embarcación */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Tipo</p>
              <p className="font-semibold text-foreground">{vesselType}</p>
            </div>
          </div>

          {/* Asiento/Camarote */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-2 border-primary rounded-lg p-6 text-center">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
              Ubicación Asignada
            </p>
            <p className="text-4xl font-bold text-primary">{seatNumber}</p>
          </div>

          {/* Separador */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t-2 border-dashed border-muted"></div>
            <span className="text-xs text-muted-foreground font-bold">CÓDIGOS DE SEGURIDAD</span>
            <div className="flex-1 border-t-2 border-dashed border-muted"></div>
          </div>

          {/* Códigos QR y Barcode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* QR */}
            <div className="flex flex-col items-center">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Código QR</p>
              <div className="bg-white p-4 rounded-lg border-2 border-slate-300 shadow-md">
                {/* Simulación de QR code - patrón de cuadros */}
                <div className="w-32 h-32 bg-white grid grid-cols-8 gap-0.5 p-2 border border-slate-300">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">Escanear al abordar</p>
            </div>

            {/* Barcode */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Código de Barras</p>
              <div className="bg-white p-4 rounded-lg border-2 border-slate-300 shadow-md">
                <div className="font-mono text-sm font-bold text-foreground tracking-widest">
                  {barcodeNumber}
                </div>
                <div className="flex justify-center gap-px mt-3 h-12">
                  {barcodeNumber.split('').map((digit, idx) => (
                    <div
                      key={idx}
                      className={`${parseInt(digit) % 2 === 0 ? 'w-1 bg-black' : 'w-0.5 bg-black'}`}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2 font-mono">{barcodeNumber}</p>
            </div>
          </div>

          {/* Pie */}
          <div className="border-t-2 border-slate-300 pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Boleta válida solo con documento de identidad al momento del abordaje
            </p>
            <p className="text-xs text-muted-foreground mt-2">Emitido: {new Date().toLocaleString('es-CO')}</p>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="outline"
          onClick={() => {
            if (ticketRef.current) {
              // Simulación de descarga (en producción, usar html2pdf)
              window.print()
            }
          }}
        >
          🖨️ Descargar PDF
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            navigator.share({
              title: 'Mi Boleta de Pasaje',
              text: `Boleta: ${bookingCode} - ${route}`,
            }).catch(() => alert('Copia el código: ' + bookingCode))
          }}
        >
          📤 Compartir
        </Button>
        <Button onClick={onClose}>
          ✓ Entendido
        </Button>
      </div>
    </div>
  )
}
