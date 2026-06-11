'use client'

import { Star, Users, Ship, MapPin, PhoneOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const OPERADORES_VERIFICADOS = [
  {
    id: 1,
    nombre: 'Transportes Pacífico',
    verificado: true,
    calificacion: 4.8,
    resenas: 124,
    embarcaciones: 8,
    logo: '🚢',
    descripcion: 'Líder en transporte marítimo con 15 años de experiencia en la costa pacífica.',
    rutas: ['Buenaventura-Guapi', 'Guapi-Tumaco'],
    contacto: '+57 2 123 4567',
  },
  {
    id: 2,
    nombre: 'Flota Marina Colombiana',
    verificado: true,
    calificacion: 4.6,
    resenas: 98,
    embarcaciones: 6,
    logo: '⛴️',
    descripcion: 'Especialistas en rutas de mediana y larga distancia con servicio de carga.',
    rutas: ['Guapi-Tumaco', 'Tumaco-Guapi'],
    contacto: '+57 2 234 5678',
  },
  {
    id: 3,
    nombre: 'ExpresoCostero',
    verificado: true,
    calificacion: 4.5,
    resenas: 87,
    embarcaciones: 5,
    logo: '⛵',
    descripcion: 'Servicio rápido y eficiente para pasajeros entre los principales puertos.',
    rutas: ['Buenaventura-Nuquí', 'Nuquí-Bahía Solano'],
    contacto: '+57 2 345 6789',
  },
  {
    id: 4,
    nombre: 'Transportes Chocó',
    verificado: true,
    calificacion: 4.4,
    resenas: 76,
    embarcaciones: 4,
    logo: '🚤',
    descripcion: 'Conexiones rápidas entre los puertos del Chocó con tarifas competitivas.',
    rutas: ['Bahía Solano-El Valle', 'Nuquí-El Valle'],
    contacto: '+57 2 456 7890',
  },
  {
    id: 5,
    nombre: 'Marina Pacífico Sur',
    verificado: true,
    calificacion: 4.3,
    resenas: 65,
    embarcaciones: 3,
    logo: '🛳️',
    descripcion: 'Especialista en rutas hacia Nariño con modernos equipos de navegación.',
    rutas: ['Tumaco-Guapi'],
    contacto: '+57 2 567 8901',
  },
  {
    id: 6,
    nombre: 'Cruceros del Pacífico',
    verificado: true,
    calificacion: 4.7,
    resenas: 156,
    embarcaciones: 10,
    logo: '⛴️',
    descripcion: 'Servicio premium con comodidades para pasajeros en viajes de crucero.',
    rutas: ['Buenaventura-Nuquí', 'Guapi-Tumaco'],
    contacto: '+57 2 678 9012',
  },
]

export default function OperadoresPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Operadores Verificados</h1>
        <p className="text-slate-600">Agencias marítimas certificadas y confiables del Pacífico</p>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Directorio de Operadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPERADORES_VERIFICADOS.map((operador) => (
              <div
                key={operador.id}
                className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-4 flex items-center justify-between">
                  <div className="text-4xl">{operador.logo}</div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Verificado
                  </Badge>
                </div>

                {/* Contenido */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{operador.nombre}</h3>

                  {/* Calificación */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(operador.calificacion)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {operador.calificacion}
                    </span>
                    <span className="text-xs text-slate-500">({operador.resenas} reseñas)</span>
                  </div>

                  {/* Descripción */}
                  <p className="text-sm text-slate-600 mb-4">{operador.descripcion}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                      <Ship className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="text-xs text-slate-600">Embarcaciones</div>
                        <div className="font-semibold text-blue-900">{operador.embarcaciones}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="text-xs text-slate-600">Rutas</div>
                        <div className="font-semibold text-purple-900">{operador.rutas.length}</div>
                      </div>
                    </div>
                  </div>

                  {/* Rutas */}
                  <div className="mb-4">
                    <div className="text-xs text-slate-600 font-medium mb-2">Rutas principales:</div>
                    <div className="space-y-1">
                      {operador.rutas.map((ruta, idx) => (
                        <div key={idx} className="text-xs text-slate-700 flex items-center gap-1">
                          <span className="text-blue-600">→</span> {ruta}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contacto */}
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg mb-4">
                    <PhoneOff className="w-4 h-4 text-slate-600" />
                    <div className="text-sm font-mono text-slate-900">{operador.contacto}</div>
                  </div>

                  {/* Botones */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="text-sm">
                      Ver detalles
                    </Button>
                    <Button className="text-sm bg-primary hover:bg-primary/90">
                      Contactar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Información */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="text-2xl">✓</div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Operadores Certificados</h3>
              <p className="text-sm text-slate-600">
                Todos los operadores listados cumplen con normativas de seguridad marítima, 
                certificaciones internacionales y estándares de servicio al cliente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
