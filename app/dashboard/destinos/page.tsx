'use client'

import { useState } from 'react'
import { MapPin, Waves, Users, TrendingUp, Ship, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ReservationModal } from '@/components/reservation-modal'
import { useAuth } from '@/lib/auth-context'

const DESTINOS = [
  {
    id: 1,
    nombre: 'Buenaventura',
    departamento: 'Valle del Cauca',
    emoji: '⚓',
    poblacion: '470,000 hab.',
    descripcion: 'Puerto más importante del Pacífico colombiano. Centro comercial y de servicios.',
    atractivos: ['Malecón', 'Centro histórico', 'Playas cercanas'],
    rutasDisponibles: 3,
    operadores: 4,
  },
  {
    id: 2,
    nombre: 'Guapi',
    departamento: 'Cauca',
    emoji: '🏝️',
    poblacion: '25,000 hab.',
    descripcion: 'Pueblo encantador entre la selva y el mar. Parada común en rutas costeras.',
    atractivos: ['Playas vírgenes', 'Biodiversidad', 'Cultura local'],
    rutasDisponibles: 2,
    operadores: 3,
  },
  {
    id: 3,
    nombre: 'Tumaco',
    departamento: 'Nariño',
    emoji: '🌊',
    poblacion: '200,000 hab.',
    descripcion: 'Importante puerto en la frontera con Ecuador. Acceso a mercados internacionales.',
    atractivos: ['Mercado de pescado', 'Islas cercanas', 'Gastronomía'],
    rutasDisponibles: 2,
    operadores: 3,
  },
  {
    id: 4,
    nombre: 'Nuquí',
    departamento: 'Chocó',
    emoji: '🐋',
    poblacion: '8,000 hab.',
    descripcion: 'Destino eco-turístico con avistamiento de ballenas jorobadas y biodiversidad única.',
    atractivos: ['Ballenas jorobadas', 'Selva tropical', 'Playas vírgenes'],
    rutasDisponibles: 2,
    operadores: 2,
  },
  {
    id: 5,
    nombre: 'Bahía Solano',
    departamento: 'Chocó',
    emoji: '🌴',
    poblacion: '4,500 hab.',
    descripcion: 'Pequeño pueblo con playas paradisíacas. Punto de partida para aventuras marinas.',
    atractivos: ['Playas privadas', 'Snorkel', 'Avistamiento marino'],
    rutasDisponibles: 1,
    operadores: 1,
  },
  {
    id: 6,
    nombre: 'El Valle',
    departamento: 'Chocó',
    emoji: '🏞️',
    poblacion: '3,000 hab.',
    descripcion: 'Pueblo costero con ambiente tranquilo. Ideal para descanso y naturaleza.',
    atractivos: ['Playas tranquilas', 'Cascadas', 'Naturaleza'],
    rutasDisponibles: 1,
    operadores: 1,
  },
]

export default function DestinosPage() {
  const { user } = useAuth()
  const [selectedDestination, setSelectedDestination] = useState<any>(null)
  const [isReservationOpen, setIsReservationOpen] = useState(false)

  // Rutas disponibles en destinos (simuladas)
  const RUTAS_POR_DESTINO: Record<number, Array<{
    id: string
    operator: string
    vesselType: 'Lancha' | 'Ferry'
    time: string
    date: string
  }>> = {
    1: [
      { id: 'R1', operator: 'Transportes Pacifico', vesselType: 'Lancha', time: '08:00', date: '2026-06-15' },
      { id: 'R2', operator: 'Ferry del Pacífico', vesselType: 'Ferry', time: '14:00', date: '2026-06-15' },
      { id: 'R3', operator: 'Lanchas Rápidas', vesselType: 'Lancha', time: '18:00', date: '2026-06-15' },
    ],
    2: [
      { id: 'R4', operator: 'Transportes Pacifico', vesselType: 'Lancha', time: '09:00', date: '2026-06-16' },
      { id: 'R5', operator: 'Ferry del Pacífico', vesselType: 'Ferry', time: '15:00', date: '2026-06-16' },
    ],
    3: [
      { id: 'R6', operator: 'Lanchas Rápidas', vesselType: 'Lancha', time: '07:00', date: '2026-06-17' },
      { id: 'R7', operator: 'Ferry del Pacífico', vesselType: 'Ferry', time: '13:00', date: '2026-06-17' },
    ],
    4: [
      { id: 'R8', operator: 'Transportes Pacifico', vesselType: 'Lancha', time: '08:30', date: '2026-06-18' },
      { id: 'R9', operator: 'Ferry del Pacífico', vesselType: 'Ferry', time: '14:30', date: '2026-06-18' },
    ],
    5: [
      { id: 'R10', operator: 'Lanchas Rápidas', vesselType: 'Lancha', time: '06:00', date: '2026-06-19' },
    ],
    6: [
      { id: 'R11', operator: 'Transportes Pacifico', vesselType: 'Ferry', time: '12:00', date: '2026-06-20' },
    ],
  }

  const handleReserve = (destination: typeof DESTINOS[0], ruta: any) => {
    setSelectedDestination({
      ...destination,
      from: destination.nombre,
      to: destination.nombre, // En el caso de destinos, es el mismo puerto (simplificado)
      ...ruta,
    })
    setIsReservationOpen(true)
  }
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Destinos del Pacífico</h1>
        <p className="text-slate-600">Explora los principales puertos y localidades del Pacífico colombiano</p>
      </div>

      {/* Grid de destinos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DESTINOS.map((destino) => (
          <Card key={destino.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            {/* Header con emoji */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 flex items-start justify-between">
              <div className="text-5xl">{destino.emoji}</div>
              <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                {destino.departamento}
              </Badge>
            </div>

            <CardContent className="pt-4">
              {/* Nombre y población */}
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{destino.nombre}</h3>
              <p className="text-sm text-slate-500 mb-3">{destino.poblacion}</p>

              {/* Descripción */}
              <p className="text-sm text-slate-600 mb-4">{destino.descripcion}</p>

              {/* Atractivos */}
              <div className="mb-4">
                <div className="text-xs text-slate-600 font-semibold mb-2">Atractivos:</div>
                <div className="flex flex-wrap gap-2">
                  {destino.atractivos.map((atractivo, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {atractivo}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                  <Waves className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="text-xs text-slate-600">Rutas</div>
                    <div className="font-semibold text-purple-900">{destino.rutasDisponibles}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                  <Users className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="text-xs text-slate-600">Operadores</div>
                    <div className="font-semibold text-green-900">{destino.operadores}</div>
                  </div>
                </div>
              </div>

              {/* Botón */}
              <Button className="w-full bg-primary hover:bg-primary/90 text-white" onClick={() => setSelectedDestination(destino)}>
                Ver Rutas Disponibles
              </Button>

              {/* Rutas disponibles en este destino */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Ship className="w-4 h-4" />
                  Rutas disponibles
                </h4>
                <div className="space-y-2">
                  {(RUTAS_POR_DESTINO[destino.id] || []).map((ruta) => (
                    <div
                      key={ruta.id}
                      className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-border hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-1 flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">{ruta.time}</span>
                        </div>
                        <Badge variant="outline">{ruta.vesselType}</Badge>
                        <span className="text-sm text-muted-foreground">{ruta.operator}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleReserve(destino, ruta)}
                        className="ml-2"
                      >
                        Reservar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Reserva */}
      {selectedDestination && (
        <ReservationModal
          open={isReservationOpen}
          onClose={() => {
            setIsReservationOpen(false)
            setSelectedDestination(null)
          }}
          destination={selectedDestination}
          userName={user?.nombre_completo || 'Viajero'}
        />
      )}
    </div>
  )
}
