"use client"

import Link from "next/link"
import {
  Building2,
  BadgeCheck,
  Ship,
  Route,
  Calendar,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  Mail,
  Star,
  ArrowLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Embarcacion = {
  id: string
  nombre: string
  tipo: string
  capacidad: number
  certificada: boolean
}

type Viaje = {
  id: string
  origen: string
  destino: string
  fecha: string
  hora_salida: string
  hora_llegada: string
  nombre_embarcacion: string
  tipo_embarcacion: string
  precio: number
  cupos_disponibles: number
  cupos_totales: number
  paradas: string[]
}

type Empresa = {
  id: string
  nit: string
  nombre: string
  representante: string
  email: string
  telefono: string | null
  descripcion: string | null
  logo_url: string | null
  verificada: boolean
}

const TIPOS_EMBARCACION: Record<string, string> = {
  "lancha-rapida": "Lancha Rápida",
  ferry: "Ferry",
  "lancha-local": "Lancha Local",
  panga: "Panga",
}

export function OperatorDetailClient({
  empresa,
  embarcaciones,
  viajes,
  stats,
}: {
  empresa: Empresa
  embarcaciones: Embarcacion[]
  viajes: Viaje[]
  stats: {
    totalReservas: number
    totalIngresos: number
  }
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-CO", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  }

  const formatTime = (time: string) => {
    return time.slice(0, 5)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/operadores"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a operadores
          </Link>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo */}
            <div className="w-20 h-20 bg-primary-foreground/15 rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-10 h-10" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{empresa.nombre}</h1>
                {empresa.verificada && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    <BadgeCheck className="w-3 h-3 mr-1" />
                    Verificada
                  </Badge>
                )}
              </div>

              <p className="text-primary-foreground/80 text-sm mb-4">
                Representante: {empresa.representante} · NIT: {empresa.nit}
              </p>

              {/* Stats badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Ship className="w-4 h-4 opacity-80" />
                  <span>{embarcaciones.length} embarcaciones</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Route className="w-4 h-4 opacity-80" />
                  <span>{viajes.length} rutas activas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 opacity-80" />
                  <span>{stats.totalReservas} reservas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {empresa.descripcion && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sobre la empresa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{empresa.descripcion}</p>
                </CardContent>
              </Card>
            )}

            {/* Rutas/Viajes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Route className="w-5 h-5 text-primary" />
                  Rutas Disponibles
                </CardTitle>
                <CardDescription>
                  Viajes programados por {empresa.nombre}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {viajes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Route className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p>No hay rutas disponibles actualmente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {viajes.map((viaje) => (
                      <Link
                        key={viaje.id}
                        href={`/buscar?viaje=${viaje.id}`}
                        className="block p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        {/* Route header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(viaje.fecha)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge
                              variant={viaje.cupos_disponibles > 5 ? "secondary" : "destructive"}
                            >
                              {viaje.cupos_disponibles} cupos
                            </Badge>
                          </div>
                        </div>

                        {/* Route path */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="font-medium">{viaje.origen}</span>
                          </div>

                          {viaje.paradas && viaje.paradas.length > 0 ? (
                            <>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              <div className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-xs">
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                <span>{viaje.paradas.length} paradas</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </>
                          ) : (
                            <>
                              <div className="flex-1 h-px bg-border mx-1" />
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </>
                          )}

                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-teal-500" />
                            <span className="font-medium">{viaje.destino}</span>
                          </div>
                        </div>

                        {/* Timeline for multi-stop routes */}
                        {viaje.paradas && viaje.paradas.length > 0 && (
                          <div className="flex items-center gap-2 mb-3 pl-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              {viaje.paradas.map((parada, idx) => (
                                <span key={idx} className="flex items-center">
                                  {idx > 0 && <ChevronRight className="w-3 h-3 mx-1" />}
                                  <span className="text-xs">{parada}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Details */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>
                              {formatTime(viaje.hora_salida)} - {formatTime(viaje.hora_llegada)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Ship className="w-4 h-4" />
                            <span>{viaje.nombre_embarcacion}</span>
                          </div>

                          <div className="font-semibold text-primary ml-auto">
                            {formatCurrency(viaje.precio)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Embarcaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Ship className="w-5 h-5 text-primary" />
                  Flota
                </CardTitle>
                <CardDescription>
                  Embarcaciones de {empresa.nombre}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {embarcaciones.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Ship className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p>No hay embarcaciones registradas</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {embarcaciones.map((emb) => (
                      <div
                        key={emb.id}
                        className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Ship className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{emb.nombre}</p>
                          <p className="text-sm text-muted-foreground">
                            {TIPOS_EMBARCACION[emb.tipo] || emb.tipo} · {emb.capacidad} pasajeros
                          </p>
                        </div>
                        {emb.certificada && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 shrink-0">
                            <BadgeCheck className="w-3 h-3 mr-1" />
                            Certificada
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Correo</p>
                    <p className="text-sm font-medium truncate">{empresa.email}</p>
                  </div>
                </div>

                {empresa.telefono && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Teléfono</p>
                      <p className="text-sm font-medium">{empresa.telefono}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick book CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Ship className="w-10 h-10 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">¿Quieres reservar?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Busca rutas disponibles con {empresa.nombre}
                </p>
                <Button className="w-full" asChild>
                  <Link href={`/buscar?operador=${encodeURIComponent(empresa.nombre)}`}>
                    Ver rutas disponibles
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Stats summary */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-primary">{stats.totalReservas}</p>
                    <p className="text-xs text-muted-foreground">Reservas totales</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-primary">
                      {embarcaciones.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Embarcaciones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
