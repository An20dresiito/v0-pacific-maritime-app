'use client'

import { useState } from 'react'
import { PUERTOS, generarViajes } from '@/lib/rutas-data'
import { SearchBar } from '@/components/search-bar'
import { MapaPacifico } from '@/components/mapa-pacifico'
import { ViajeCard } from '@/components/viaje-card'
import { ReservationModal } from '@/components/reservation-modal'
import { useAuth } from '@/lib/auth-context'
import { Card } from '@/components/ui/card'
import { AlertCircle, MapPin } from 'lucide-react'

export default function DestinosPage() {
  const { user } = useAuth()
  const [selectedRoute, setSelectedRoute] = useState<{ origen: string; destino: string } | null>(null)
  const [viajes, setViajes] = useState<any[]>([])
  const [selectedViaje, setSelectedViaje] = useState<any>(null)
  const [isReservationOpen, setIsReservationOpen] = useState(false)

  const handleSearch = (origenId: string, destinoId: string) => {
    const origen = PUERTOS.find((p) => p.id === origenId)
    const destino = PUERTOS.find((p) => p.id === destinoId)

    if (origen && destino) {
      setSelectedRoute({ origen: origenId, destino: destinoId })
      const nuevosViajes = generarViajes(origen, destino, 5)
      setViajes(nuevosViajes)
    }
  }

  const handleClear = () => {
    setSelectedRoute(null)
    setViajes([])
  }

  const handleReserveClick = (viaje: any) => {
    const origen = PUERTOS.find((p) => p.id === selectedRoute?.origen)
    const destino = PUERTOS.find((p) => p.id === selectedRoute?.destino)

    if (origen && destino) {
      setSelectedViaje({
        ...viaje,
        from: origen.nombre,
        to: destino.nombre,
        operador: viaje.operador,
        vesselType: viaje.tipoEmbarcacion === 'Lancha' ? 'Lancha' : 'Ferry',
      })
      setIsReservationOpen(true)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
          <MapPin className="w-8 h-8 text-primary" />
          Buscador de Rutas Marítimas
        </h1>
        <p className="text-slate-600">
          Encuentra las mejores rutas entre los puertos principales del Pacífico colombiano
        </p>
      </div>

      {/* Buscador */}
      <SearchBar onSearch={handleSearch} onClear={handleClear} />

      {/* Mapa */}
      <MapaPacifico selectedRoute={selectedRoute || undefined} />

      {/* Resultados */}
      {selectedRoute && (
        <div className="space-y-4">
          <Card className="p-4 bg-blue-50 border-blue-300 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Búsqueda completada</h3>
              <p className="text-sm text-blue-800">
                Se encontraron {viajes.length} viajes disponibles. {' '}
                {viajes.length > 0
                  ? viajes[0].tipoRuta === 'Directa'
                    ? 'Esta es una ruta directa sin escalas.'
                    : 'Esta ruta incluye escalas en puertos intermedios.'
                  : ''}
              </p>
            </div>
          </Card>

          {viajes.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Viajes disponibles: {viajes[0].origen} → {viajes[0].destino}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {viajes.map((viaje) => (
                  <ViajeCard
                    key={viaje.id}
                    viaje={viaje}
                    onReserve={handleReserveClick}
                  />
                ))}
              </div>
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-slate-600">No hay viajes disponibles para esta ruta en este momento.</p>
            </Card>
          )}
        </div>
      )}

      {!selectedRoute && (
        <Card className="p-8 text-center bg-slate-50">
          <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 text-lg">
            Selecciona un puerto de origen y destino para ver las rutas disponibles
          </p>
        </Card>
      )}

      {/* Modal de Reserva */}
      {selectedViaje && (
        <ReservationModal
          open={isReservationOpen}
          onClose={() => {
            setIsReservationOpen(false)
            setSelectedViaje(null)
          }}
          destination={selectedViaje}
          userName={user?.nombre_completo || 'Viajero'}
        />
      )}
    </div>
  )
}
