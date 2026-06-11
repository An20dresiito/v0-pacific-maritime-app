'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DoorOpen, Users } from 'lucide-react'

interface CabinSelectorFerrysProps {
  onCabinSelect: (cabinId: string) => void
}

export function CabinSelectorFerry({ onCabinSelect }: CabinSelectorFerrysProps) {
  const [selectedCabin, setSelectedCabin] = useState<string | null>(null)

  // Configuración de camarotes y áreas comunes
  const cabins = [
    // Camarotes privados (Cubierta A - Lujo)
    { id: 'A101', type: 'Camarote Lujo', capacity: '2 personas', price: '450,000 COP', available: true },
    { id: 'A102', type: 'Camarote Lujo', capacity: '2 personas', price: '450,000 COP', available: true },
    { id: 'A103', type: 'Camarote Lujo', capacity: '2 personas', price: '450,000 COP', available: false },
    { id: 'A104', type: 'Camarote Lujo', capacity: '2 personas', price: '450,000 COP', available: true },
    // Camarotes Standard (Cubierta B)
    { id: 'B201', type: 'Camarote Est.', capacity: '2 personas', price: '300,000 COP', available: true },
    { id: 'B202', type: 'Camarote Est.', capacity: '2 personas', price: '300,000 COP', available: true },
    { id: 'B203', type: 'Camarote Est.', capacity: '2 personas', price: '300,000 COP', available: true },
    { id: 'B204', type: 'Camarote Est.', capacity: '2 personas', price: '300,000 COP', available: false },
    // Áreas comunes (sin costo adicional)
    { id: 'DECK-A', type: 'Área Común', capacity: 'múltiples', price: 'Incluido', available: true },
    { id: 'LOUNGE', type: 'Lounge VIP', capacity: 'múltiples', price: 'Incluido', available: true },
  ]

  const handleCabinClick = (cabinId: string) => {
    setSelectedCabin(cabinId)
    onCabinSelect(cabinId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Elige tu alojamiento en el Ferry</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Verde = disponible | Gris = ocupado | Azul = seleccionado
        </p>
      </div>

      <div className="bg-gradient-to-b from-slate-50 to-slate-100 p-8 rounded-lg border-2 border-slate-200">
        {/* Cubierta A - Lujo */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-primary">
            <DoorOpen className="w-5 h-5 text-primary" />
            <h4 className="font-bold text-primary">CUBIERTA A - Camarotes de Lujo</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cabins.slice(0, 4).map((cabin) => (
              <button
                key={cabin.id}
                onClick={() => handleCabinClick(cabin.id)}
                disabled={!cabin.available}
                className={`
                  p-3 rounded-lg font-semibold transition-all duration-200 text-center
                  ${selectedCabin === cabin.id
                    ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
                    : cabin.available
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:scale-105'
                    : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  }
                `}
              >
                <div className="text-sm font-bold">{cabin.id}</div>
                <div className="text-xs mt-1 opacity-90">{cabin.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cubierta B - Standard */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-600">
            <DoorOpen className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-blue-600">CUBIERTA B - Camarotes Standard</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cabins.slice(4, 8).map((cabin) => (
              <button
                key={cabin.id}
                onClick={() => handleCabinClick(cabin.id)}
                disabled={!cabin.available}
                className={`
                  p-3 rounded-lg font-semibold transition-all duration-200 text-center
                  ${selectedCabin === cabin.id
                    ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
                    : cabin.available
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:scale-105'
                    : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  }
                `}
              >
                <div className="text-sm font-bold">{cabin.id}</div>
                <div className="text-xs mt-1 opacity-90">{cabin.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Áreas Comunes */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-amber-600">
            <Users className="w-5 h-5 text-amber-600" />
            <h4 className="font-bold text-amber-600">Áreas Comunes</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cabins.slice(8).map((cabin) => (
              <button
                key={cabin.id}
                onClick={() => handleCabinClick(cabin.id)}
                disabled={!cabin.available}
                className={`
                  p-3 rounded-lg font-semibold transition-all duration-200 text-center
                  ${selectedCabin === cabin.id
                    ? 'bg-amber-600 text-white scale-105 shadow-lg'
                    : cabin.available
                    ? 'bg-amber-400 text-amber-900 hover:bg-amber-500 shadow-md hover:scale-105'
                    : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  }
                `}
              >
                <div className="text-sm font-bold">{cabin.id}</div>
                <div className="text-xs mt-1 opacity-90">{cabin.type}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        {selectedCabin ? (
          <div>
            <p className="text-sm font-medium text-amber-900">
              ✓ Selección confirmada: <span className="font-bold text-primary">{selectedCabin}</span>
            </p>
            <p className="text-xs text-amber-700 mt-1">
              {cabins.find(c => c.id === selectedCabin)?.type} - {cabins.find(c => c.id === selectedCabin)?.price}
            </p>
          </div>
        ) : (
          <p className="text-sm text-amber-700">Selecciona un camarote o área común para continuar</p>
        )}
      </div>
    </div>
  )
}
