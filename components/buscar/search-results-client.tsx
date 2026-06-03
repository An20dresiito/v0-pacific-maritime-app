"use client"

import { useEffect, useState, useTransition } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Ship,
  Clock,
  Users,
  MapPin,
  Calendar,
  ArrowRight,
  Filter,
  ChevronDown,
  Anchor,
  Search,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { searchViajes, getOrigenes, getDestinos, type Viaje } from "@/lib/actions/viajes"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price)
}

const formatTime = (time: string) => {
  return time.slice(0, 5)
}

export function SearchResultsClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [viajes, setViajes] = useState<Viaje[]>([])
  const [origenes, setOrigenes] = useState<string[]>([])
  const [destinos, setDestinos] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Form state
  const [origen, setOrigen] = useState(searchParams.get("origen") || "todos")
  const [destino, setDestino] = useState(searchParams.get("destino") || "todos")
  const [fecha, setFecha] = useState(searchParams.get("fecha") || "")
  const [pasajeros, setPasajeros] = useState(searchParams.get("pasajeros") || "1")

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      const [origenesData, destinosData] = await Promise.all([
        getOrigenes(),
        getDestinos(origen !== "todos" ? origen : undefined),
      ])
      
      setOrigenes(origenesData)
      setDestinos(destinosData)

      const { viajes: viajesData, error: viajesError } = await searchViajes(
        origen !== "todos" ? origen : undefined,
        destino !== "todos" ? destino : undefined,
        fecha || undefined,
        parseInt(pasajeros) || 1
      )

      setViajes(viajesData)
      setError(viajesError)
      setIsLoading(false)
    }

    loadData()
  }, [origen, destino, fecha, pasajeros])

  // Update destinos when origen changes
  useEffect(() => {
    const loadDestinos = async () => {
      const destinosData = await getDestinos(origen !== "todos" ? origen : undefined)
      setDestinos(destinosData)
    }
    loadDestinos()
  }, [origen])

  const handleSearch = () => {
    startTransition(() => {
      const params = new URLSearchParams()
      if (origen !== "todos") params.set("origen", origen)
      if (destino !== "todos") params.set("destino", destino)
      if (fecha) params.set("fecha", fecha)
      if (pasajeros) params.set("pasajeros", pasajeros)
      
      router.push(`/buscar?${params.toString()}`)
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/pacificconnect-logo.png"
                alt="PacificConnect"
                width={48}
                height={48}
                className="w-12 h-12 object-contain bg-white rounded-full p-1"
              />
              <span className="text-xl font-bold">PacificConnect</span>
            </Link>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Buscar Viajes</h1>
          <p className="text-primary-foreground/80">
            Encuentra tu próximo viaje por el Pacífico colombiano
          </p>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-card border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Origen */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Origen
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={origen}
                  onChange={(e) => setOrigen(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-input border border-border rounded-lg appearance-none text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="todos">Todos los orígenes</option>
                  {origenes.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Destino */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Destino
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-input border border-border rounded-lg appearance-none text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="todos">Todos los destinos</option>
                  {destinos.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Fecha */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Fecha
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Pasajeros */}
            <div className="w-full lg:w-32">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Pasajeros
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={pasajeros}
                  onChange={(e) => setPasajeros(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-input border border-border rounded-lg appearance-none text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                disabled={isPending}
                className="w-full lg:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                {isPending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Buscar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
            <p className="text-muted-foreground">Buscando viajes disponibles...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <p className="text-destructive font-medium mb-2">Error al buscar viajes</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        ) : viajes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Ship className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No hay viajes disponibles
            </h2>
            <p className="text-muted-foreground text-center max-w-md">
              No encontramos viajes que coincidan con tu búsqueda. Intenta cambiar los filtros o selecciona otra fecha.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{viajes.length}</span>{" "}
                viaje{viajes.length !== 1 ? "s" : ""} encontrado{viajes.length !== 1 ? "s" : ""}
              </p>
              <Badge variant="outline" className="gap-1">
                <Filter className="w-3 h-3" />
                Ordenados por hora de salida
              </Badge>
            </div>

            <div className="space-y-4">
              {viajes.map((viaje) => (
                <Card
                  key={viaje.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left: Route Info */}
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary"
                          >
                            {viaje.tipo_embarcacion}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {viaje.operador}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          {/* Departure */}
                          <div className="text-center">
                            <p className="text-2xl font-bold text-foreground">
                              {formatTime(viaje.hora_salida)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {viaje.origen}
                            </p>
                          </div>

                          {/* Journey Line */}
                          <div className="flex-1 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <div className="flex-1 h-0.5 bg-border relative">
                              <Ship className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary bg-background" />
                            </div>
                            <div className="w-3 h-3 rounded-full bg-secondary" />
                          </div>

                          {/* Arrival */}
                          <div className="text-center">
                            <p className="text-2xl font-bold text-foreground">
                              {formatTime(viaje.hora_llegada)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {viaje.destino}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Anchor className="w-4 h-4" />
                            <span>{viaje.nombre_embarcacion}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(viaje.fecha).toLocaleDateString("es-CO", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Price & Book */}
                      <div className="lg:w-64 bg-muted/30 p-6 flex flex-col justify-center items-center lg:items-end border-t lg:border-t-0 lg:border-l border-border">
                        <div className="text-center lg:text-right mb-4">
                          <p className="text-sm text-muted-foreground">
                            Precio por persona
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            {formatPrice(viaje.precio)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span
                            className={`text-sm font-medium ${
                              viaje.cupos_disponibles <= 5
                                ? "text-destructive"
                                : "text-secondary"
                            }`}
                          >
                            {viaje.cupos_disponibles} cupos disponibles
                          </span>
                        </div>

                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          asChild
                        >
                          <Link
                            href={`/reserva?route=${encodeURIComponent(
                              `${viaje.origen} - ${viaje.destino}`
                            )}&from=${encodeURIComponent(
                              viaje.origen
                            )}&to=${encodeURIComponent(
                              viaje.destino
                            )}&vessel=${encodeURIComponent(
                              viaje.nombre_embarcacion
                            )}&type=${encodeURIComponent(
                              viaje.tipo_embarcacion
                            )}&departure=${encodeURIComponent(
                              formatTime(viaje.hora_salida)
                            )}&arrival=${encodeURIComponent(
                              formatTime(viaje.hora_llegada)
                            )}&price=${encodeURIComponent(viaje.precio)}`}
                          >
                            Reservar
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center">
          <Link
            href="/"
            className="text-primary hover:underline inline-flex items-center gap-2"
          >
            <Anchor className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
