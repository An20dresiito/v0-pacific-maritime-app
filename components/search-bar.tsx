'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PUERTOS } from '@/lib/rutas-data'

interface SearchBarProps {
  onSearch: (origen: string, destino: string) => void
  onClear: () => void
}

export function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')

  const handleSearch = () => {
    if (origen && destino && origen !== destino) {
      onSearch(origen, destino)
    }
  }

  const handleClear = () => {
    setOrigen('')
    setDestino('')
    onClear()
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-slate-50 border-blue-200">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-slate-900">Buscar Rutas Marítimas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Origen */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Puerto de Origen</label>
            <Select value={origen} onValueChange={setOrigen}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona puerto de salida" />
              </SelectTrigger>
              <SelectContent>
                {PUERTOS.map((puerto) => (
                  <SelectItem key={puerto.id} value={puerto.id}>
                    {puerto.nombre} - {puerto.departamento}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Destino */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Puerto de Destino</label>
            <Select value={destino} onValueChange={setDestino}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona puerto destino" />
              </SelectTrigger>
              <SelectContent>
                {PUERTOS.filter((p) => p.id !== origen).map((puerto) => (
                  <SelectItem key={puerto.id} value={puerto.id}>
                    {puerto.nombre} - {puerto.departamento}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSearch}
            disabled={!origen || !destino || origen === destino}
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Buscar Rutas
          </Button>
          {origen && (
            <Button
              onClick={handleClear}
              variant="outline"
              className="flex-1"
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
