'use client'

import { Ship, Clock, Users, MapPin, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ViajeCardProps {
  viaje: {
    id: string
    origen: string
    destino: string
    distancia: number
    tipoRuta: 'Directa' | 'Con Escala'
    tipoEmbarcacion: string
    operador: string
    hora: string
    duracion: string
    precio: number
    capacidad: number
    disponibles: number
    fecha: string
  }
  onReserve: (viaje: any) => void
}

export function ViajeCard({ viaje, onReserve }: ViajeCardProps) {
  const occupancy = ((viaje.capacidad - viaje.disponibles) / viaje.capacidad) * 100

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow border-slate-200">
      <div className="space-y-4">
        {/* Header con origen/destino */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-bold text-slate-900">{viaje.origen}</span>
            </div>
            <p className="text-xs text-slate-600 ml-6">{viaje.fecha}</p>
          </div>

          <div className="text-center px-4">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="h-px bg-slate-400 flex-1"></div>
              <Ship className="w-4 h-4 text-slate-500" />
              <div className="h-px bg-slate-400 flex-1"></div>
            </div>
            <p className="text-xs font-semibold text-slate-700">{viaje.distancia} km</p>
          </div>

          <div className="flex-1 text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              <span className="font-bold text-slate-900">{viaje.destino}</span>
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xs text-slate-600 mr-6">{viaje.duracion}</p>
          </div>
        </div>

        {/* Detalles del viaje */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          {/* Tipo de embarcación */}
          <div className="bg-blue-50 p-2 rounded">
            <p className="text-xs text-slate-600 font-semibold">Embarcación</p>
            <Badge variant="outline" className="mt-1 text-xs">
              {viaje.tipoEmbarcacion}
            </Badge>
          </div>

          {/* Tipo de ruta */}
          <div className="bg-green-50 p-2 rounded">
            <p className="text-xs text-slate-600 font-semibold">Ruta</p>
            <Badge
              className={`mt-1 text-xs ${
                viaje.tipoRuta === 'Directa'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              {viaje.tipoRuta}
            </Badge>
          </div>

          {/* Operador */}
          <div className="bg-slate-50 p-2 rounded">
            <p className="text-xs text-slate-600 font-semibold">Operador</p>
            <p className="text-xs font-semibold text-slate-900 mt-1 truncate">{viaje.operador}</p>
          </div>

          {/* Hora de salida */}
          <div className="bg-slate-50 p-2 rounded">
            <p className="text-xs text-slate-600 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Salida
            </p>
            <p className="text-xs font-semibold text-slate-900 mt-1">{viaje.hora}</p>
          </div>
        </div>

        {/* Disponibilidad */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-700">
                {viaje.disponibles} cupos disponibles de {viaje.capacidad}
              </span>
            </div>
            {viaje.disponibles < 5 && (
              <Badge className="bg-red-600 text-white text-xs">Pocas disponibles</Badge>
            )}
          </div>

          {/* Barra de ocupación */}
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                occupancy > 75 ? 'bg-red-600' : occupancy > 50 ? 'bg-amber-600' : 'bg-green-600'
              }`}
              style={{ width: `${occupancy}%` }}
            ></div>
          </div>
        </div>

        {/* Precio y botón */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-slate-600">Desde</p>
              <p className="text-lg font-bold text-primary">${viaje.precio.toLocaleString()}</p>
            </div>
          </div>

          <Button
            onClick={() => onReserve(viaje)}
            disabled={viaje.disponibles === 0}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Reservar
          </Button>
        </div>
      </div>
    </Card>
  )
}
