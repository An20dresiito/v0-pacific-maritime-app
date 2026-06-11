'use client'

import { MapPin, Compass, Clock, Waves, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const PUERTOS = [
  { id: 1, nombre: 'Buenaventura', dept: 'Valle del Cauca', lat: 3.88, lng: -77.28 },
  { id: 2, nombre: 'Guapi', dept: 'Cauca', lat: 2.56, lng: -77.28 },
  { id: 3, nombre: 'Tumaco', dept: 'Nariño', lat: 1.80, lng: -78.75 },
  { id: 4, nombre: 'Nuquí', dept: 'Chocó', lat: 5.07, lng: -77.27 },
  { id: 5, nombre: 'Bahía Solano', dept: 'Chocó', lat: 6.19, lng: -77.39 },
  { id: 6, nombre: 'El Valle', dept: 'Chocó', lat: 5.90, lng: -76.95 },
]

const RUTAS_TRANSBORDO = [
  {
    id: 1,
    origen: 'Buenaventura',
    destino: 'Guapi',
    distancia: 95,
    duracion: '6-8 horas',
    escalas: ['Pianguita'],
    frecuencia: 'Diaria',
    operador: 'Transportes Pacífico',
  },
  {
    id: 2,
    origen: 'Guapi',
    destino: 'Tumaco',
    distancia: 180,
    duracion: '12-14 horas',
    escalas: ['La Bocana'],
    frecuencia: 'Lunes, Miércoles, Viernes',
    operador: 'Flota Marina Colombiana',
  },
  {
    id: 3,
    origen: 'Buenaventura',
    destino: 'Nuquí',
    distancia: 280,
    duracion: '18-20 horas',
    escalas: ['Bahía Solano', 'El Valle'],
    frecuencia: 'Martes, Jueves, Sábado',
    operador: 'ExpresoCostero',
  },
  {
    id: 4,
    origen: 'Nuquí',
    destino: 'Bahía Solano',
    distancia: 45,
    duracion: '3-4 horas',
    escalas: [],
    frecuencia: 'Diaria',
    operador: 'Transportes Chocó',
  },
  {
    id: 5,
    origen: 'Tumaco',
    destino: 'Guapi',
    distancia: 180,
    duracion: '12-14 horas',
    escalas: ['La Bocana'],
    frecuencia: 'Lunes, Miércoles, Viernes',
    operador: 'Flota Marina Colombiana',
  },
  {
    id: 6,
    origen: 'Bahía Solano',
    destino: 'El Valle',
    distancia: 65,
    duracion: '4-5 horas',
    escalas: [],
    frecuencia: 'Diaria',
    operador: 'Transportes Chocó',
  },
]

export default function RutasTransbordoPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Rutas de Transbordo</h1>
        <p className="text-slate-600">Red de conexiones marítimas entre puertos del Pacífico colombiano</p>
      </div>

      {/* Mapa conceptual de puertos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Puertos del Pacífico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PUERTOS.map((puerto) => (
              <div
                key={puerto.id}
                className="p-4 border border-slate-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer text-center"
              >
                <div className="font-semibold text-slate-900">{puerto.nombre}</div>
                <div className="text-xs text-slate-500">{puerto.dept}</div>
                <div className="text-xs text-slate-400 mt-1">({puerto.lat}°, {puerto.lng}°)</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rutas disponibles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="w-5 h-5" />
            Rutas Disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {RUTAS_TRANSBORDO.map((ruta) => (
              <div
                key={ruta.id}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {/* Ruta principal */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="font-semibold text-slate-900">{ruta.origen}</div>
                        <div className="text-xs text-slate-500">Origen</div>
                      </div>

                      <div className="flex-1 flex items-center justify-center gap-2">
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-slate-300 to-slate-300"></div>
                        <ArrowRight className="w-4 h-4 text-primary" />
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-slate-300 to-slate-300"></div>
                      </div>

                      <div className="text-center">
                        <div className="font-semibold text-slate-900">{ruta.destino}</div>
                        <div className="text-xs text-slate-500">Destino</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detalles */}
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Compass className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-600 font-medium">Distancia</div>
                      <div className="text-sm font-semibold text-slate-900">{ruta.distancia} NM</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-600 font-medium">Duración</div>
                      <div className="text-sm font-semibold text-slate-900">{ruta.duracion}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Waves className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-xs text-slate-600 font-medium">Operador</div>
                      <div className="text-sm font-semibold text-slate-900">{ruta.operador}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-600 font-medium">Frecuencia</div>
                    <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">
                      {ruta.frecuencia}
                    </Badge>
                  </div>
                </div>

                {/* Escalas */}
                {ruta.escalas.length > 0 && (
                  <div className="text-sm">
                    <span className="text-slate-600 font-medium">Escalas: </span>
                    <span className="text-slate-700">{ruta.escalas.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="text-2xl">⛵</div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Planificación de Viajes</h3>
              <p className="text-sm text-slate-600">
                Las rutas de transbordo permiten conexiones marítimas estratégicas entre los puertos del Pacífico. 
                Las duraciones y frecuencias pueden variar según condiciones climáticas y operacionales.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
