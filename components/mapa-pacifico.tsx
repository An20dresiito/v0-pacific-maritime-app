'use client'

import { PUERTOS } from '@/lib/rutas-data'
import { Card } from '@/components/ui/card'

interface MapProps {
  selectedRoute?: {
    origen: string
    destino: string
  }
}

export function MapaPacifico({ selectedRoute }: MapProps) {
  const puertoOrigen = selectedRoute ? PUERTOS.find((p) => p.id === selectedRoute.origen) : null
  const puertoDestino = selectedRoute ? PUERTOS.find((p) => p.id === selectedRoute.destino) : null

  return (
    <Card className="p-4 bg-white border-blue-200">
      <div className="space-y-2 mb-4">
        <h3 className="text-lg font-bold text-slate-900">Mapa del Litoral Pacífico Colombiano</h3>
        <p className="text-sm text-slate-600">
          {selectedRoute
            ? `Ruta: ${puertoOrigen?.nombre} → ${puertoDestino?.nombre}`
            : 'Selecciona una ruta para visualizar el trazado'}
        </p>
      </div>

      <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg p-4 overflow-auto">
        <svg
          viewBox="0 0 600 550"
          className="w-full h-auto border border-blue-300 rounded"
          style={{ minHeight: '400px' }}
        >
          {/* Fondo oceánico */}
          <defs>
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeab8" />
              <stop offset="100%" stopColor="#c7d9a8" />
            </linearGradient>
          </defs>

          {/* Océano */}
          <rect width="600" height="550" fill="url(#oceanGradient)" />

          {/* Tierra (Costa colombiana) */}
          <path
            d="M 550 0 L 600 0 L 600 550 L 550 550 Z"
            fill="url(#landGradient)"
            stroke="#94a3b8"
            strokeWidth="1"
          />

          {/* Departamentos - Etiquetas */}
          <text x="430" y="100" fontSize="11" fontWeight="bold" fill="#475569" textAnchor="middle">
            CHOCÓ
          </text>
          <text x="470" y="220" fontSize="11" fontWeight="bold" fill="#475569" textAnchor="middle">
            CAUCA
          </text>
          <text x="510" y="280" fontSize="11" fontWeight="bold" fill="#475569" textAnchor="middle">
            VALLE
          </text>
          <text x="490" y="440" fontSize="11" fontWeight="bold" fill="#475569" textAnchor="middle">
            NARIÑO
          </text>

          {/* Rutas entre puertos - líneas de conexión */}
          {selectedRoute && puertoOrigen && puertoDestino && (
            <>
              {/* Línea de ruta */}
              <line
                x1={puertoOrigen.coordX}
                y1={puertoOrigen.coordY}
                x2={puertoDestino.coordX}
                y2={puertoDestino.coordY}
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.8"
              />
              {/* Flecha direccional */}
              <circle
                cx={(puertoOrigen.coordX + puertoDestino.coordX) / 2}
                cy={(puertoOrigen.coordY + puertoDestino.coordY) / 2}
                r="4"
                fill="#dc2626"
              />
            </>
          )}

          {/* Puertos - Nodos */}
          {PUERTOS.map((puerto) => {
            const isOrigen = selectedRoute?.origen === puerto.id
            const isDestino = selectedRoute?.destino === puerto.id
            const isSelected = isOrigen || isDestino

            return (
              <g key={puerto.id}>
                {/* Círculo de puerto */}
                <circle
                  cx={puerto.coordX}
                  cy={puerto.coordY}
                  r={isSelected ? 10 : 6}
                  fill={isOrigen ? '#059669' : isDestino ? '#2563eb' : '#0f766e'}
                  stroke={isSelected ? '#ffffff' : '#f5f5f5'}
                  strokeWidth="2"
                  opacity="0.9"
                  className="transition-all"
                />

                {/* Etiqueta del puerto */}
                <text
                  x={puerto.coordX}
                  y={puerto.coordY - 18}
                  fontSize="10"
                  fontWeight="bold"
                  fill="#1e293b"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {puerto.nombre}
                </text>

                {/* Departamento */}
                <text
                  x={puerto.coordX}
                  y={puerto.coordY + 24}
                  fontSize="8"
                  fill="#64748b"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {puerto.departamento}
                </text>
              </g>
            )
          })}

          {/* Leyenda */}
          <g>
            <rect x="10" y="480" width="150" height="60" fill="white" stroke="#cbd5e1" strokeWidth="1" rx="4" />
            <text x="20" y="498" fontSize="10" fontWeight="bold" fill="#1e293b">
              Leyenda
            </text>
            <circle cx="20" cy="515" r="3" fill="#059669" />
            <text x="30" y="518" fontSize="9" fill="#475569">
              Origen
            </text>
            <circle cx="80" cy="515" r="3" fill="#2563eb" />
            <text x="90" y="518" fontSize="9" fill="#475569">
              Destino
            </text>
            <circle cx="140" cy="515" r="3" fill="#0f766e" />
            <text x="150" y="518" fontSize="9" fill="#475569">
              Puertos
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-slate-600">
          <strong>Nota:</strong> El mapa muestra los 7 puertos principales del Pacífico colombiano en los
          departamentos de Chocó, Cauca, Valle del Cauca y Nariño. Los puertos en verde oscuro son los
          disponibles; verdes cuando es origen y azules cuando es destino.
        </p>
      </div>
    </Card>
  )
}
