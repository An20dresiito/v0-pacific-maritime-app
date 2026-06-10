"use client"

import { useState } from "react"
import Link from "next/link"
import { Ship, Clock, Users, ShieldCheck, ArrowRight, Anchor, CheckCircle, X, Calendar, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Schedule = {
  vessel: string
  vesselType: string
  departure: string
  arrival: string
  capacity: number
  available: number
  price: string
}

type Route = {
  id: number
  name: string
  from: string
  fromDept: string
  to: string
  toDept: string
  stops: string[]
  stopTimes?: { stop: string; duration: string }[]
  duration: string
  frequency: string
  price: string
  vessel: string
  capacity: string
  features: string[]
  popular: boolean
  multiStop: boolean
  schedules: Schedule[]
}

const routes: Route[] = [
  {
    id: 1,
    name: "Ruta Chocó Express",
    from: "Buenaventura",
    fromDept: "Valle del Cauca",
    to: "Nuquí",
    toDept: "Chocó",
    stops: ["Bahía Málaga", "Ladrilleros"],
    stopTimes: [
      { stop: "Bahía Málaga", duration: "45 min" },
      { stop: "Ladrilleros", duration: "1h 30min" },
    ],
    duration: "4-5 horas",
    frequency: "Martes, Jueves, Sábado",
    price: "180.000",
    vessel: "Lancha Rápida",
    capacity: "25 pasajeros",
    features: ["Chaleco salvavidas", "Seguro de viaje", "Equipaje incluido"],
    popular: true,
    multiStop: false,
    schedules: [
      { vessel: "Veloz del Pacífico", vesselType: "Lancha Rápida", departure: "06:00", arrival: "10:30", capacity: 25, available: 12, price: "180.000" },
      { vessel: "Delfín Azul", vesselType: "Lancha Rápida", departure: "08:30", arrival: "13:00", capacity: 25, available: 8, price: "180.000" },
      { vessel: "Ballena Jorobada", vesselType: "Ferry Cómodo", departure: "11:00", arrival: "16:00", capacity: 60, available: 34, price: "150.000" },
      { vessel: "Estrella Marina", vesselType: "Lancha Rápida", departure: "14:00", arrival: "18:30", capacity: 25, available: 20, price: "180.000" },
    ],
  },
  {
    id: 2,
    name: "Ruta Costa Caucana",
    from: "Buenaventura",
    fromDept: "Valle del Cauca",
    to: "Guapi",
    toDept: "Cauca",
    stops: ["Timbiquí"],
    stopTimes: [{ stop: "Timbiquí", duration: "1h 45min" }],
    duration: "3-4 horas",
    frequency: "Lunes, Miércoles, Viernes",
    price: "120.000",
    vessel: "Lancha Rápida",
    capacity: "30 pasajeros",
    features: ["Chaleco salvavidas", "Seguro de viaje"],
    popular: true,
    multiStop: false,
    schedules: [
      { vessel: "Manglar Express", vesselType: "Lancha Rápida", departure: "05:30", arrival: "09:00", capacity: 30, available: 15, price: "120.000" },
      { vessel: "Corriente del Sur", vesselType: "Lancha Rápida", departure: "09:00", arrival: "12:30", capacity: 30, available: 22, price: "120.000" },
      { vessel: "Marea Alta", vesselType: "Lancha Local", departure: "13:30", arrival: "17:30", capacity: 20, available: 6, price: "100.000" },
    ],
  },
  {
    id: 3,
    name: "Ruta Nariño Sur",
    from: "Buenaventura",
    fromDept: "Valle del Cauca",
    to: "Tumaco",
    toDept: "Nariño",
    stops: ["Guapi", "El Charco"],
    stopTimes: [
      { stop: "Guapi", duration: "3h" },
      { stop: "El Charco", duration: "5h" },
    ],
    duration: "6-7 horas",
    frequency: "Martes, Sábado",
    price: "220.000",
    vessel: "Ferry Cómodo",
    capacity: "60 pasajeros",
    features: ["Chaleco salvavidas", "Cafetería", "Seguro de viaje", "WiFi"],
    popular: false,
    multiStop: true,
    schedules: [
      { vessel: "Pacífico Mayor", vesselType: "Ferry Cómodo", departure: "05:00", arrival: "11:30", capacity: 60, available: 41, price: "220.000" },
      { vessel: "Sol del Sur", vesselType: "Ferry Cómodo", departure: "07:30", arrival: "14:30", capacity: 60, available: 28, price: "220.000" },
      { vessel: "Tiburón del Pacífico", vesselType: "Lancha Rápida", departure: "10:00", arrival: "16:00", capacity: 30, available: 9, price: "250.000" },
    ],
  },
  {
    id: 4,
    name: "Ruta Local Valle",
    from: "Buenaventura",
    fromDept: "Valle del Cauca",
    to: "Ladrilleros",
    toDept: "Valle del Cauca",
    stops: ["Juanchaco"],
    stopTimes: [{ stop: "Juanchaco", duration: "30 min" }],
    duration: "45 min - 1 hora",
    frequency: "Diario (cada 2 horas)",
    price: "45.000",
    vessel: "Lancha Local",
    capacity: "20 pasajeros",
    features: ["Chaleco salvavidas"],
    popular: false,
    multiStop: false,
    schedules: [
      { vessel: "Olita Local", vesselType: "Lancha Local", departure: "07:00", arrival: "07:50", capacity: 20, available: 10, price: "45.000" },
      { vessel: "Brisa Marina", vesselType: "Lancha Local", departure: "09:00", arrival: "09:50", capacity: 20, available: 18, price: "45.000" },
      { vessel: "Cangrejo Veloz", vesselType: "Lancha Rápida", departure: "11:00", arrival: "11:45", capacity: 25, available: 4, price: "55.000" },
      { vessel: "Olita Local", vesselType: "Lancha Local", departure: "13:00", arrival: "13:50", capacity: 20, available: 16, price: "45.000" },
      { vessel: "Brisa Marina", vesselType: "Lancha Local", departure: "15:00", arrival: "15:50", capacity: 20, available: 12, price: "45.000" },
      { vessel: "Cangrejo Veloz", vesselType: "Lancha Rápida", departure: "17:00", arrival: "17:45", capacity: 25, available: 21, price: "55.000" },
    ],
  },
  {
    id: 5,
    name: "Ruta Isla Gorgona",
    from: "Buenaventura",
    fromDept: "Valle del Cauca",
    to: "Isla Gorgona",
    toDept: "Cauca",
    stops: ["Guapi"],
    stopTimes: [{ stop: "Guapi", duration: "3h" }],
    duration: "5.5 horas",
    frequency: "Miércoles, Viernes, Domingo",
    price: "180.000",
    vessel: "Lancha Rápida",
    capacity: "25 pasajeros",
    features: ["Chaleco salvavidas", "Seguro de viaje", "Guía turístico"],
    popular: true,
    multiStop: true,
    schedules: [
      { vessel: "Gorgona Explorer", vesselType: "Lancha Rápida", departure: "05:00", arrival: "10:30", capacity: 25, available: 10, price: "180.000" },
      { vessel: "Tortuga Marina", vesselType: "Lancha Rápida", departure: "07:00", arrival: "12:30", capacity: 20, available: 15, price: "180.000" },
    ],
  },
  {
    id: 6,
    name: "Ruta Frontera Norte",
    from: "Buenaventura",
    fromDept: "Valle del Cauca",
    to: "Juradó",
    toDept: "Chocó",
    stops: ["Nuquí", "Bahía Solano", "El Valle"],
    stopTimes: [
      { stop: "Nuquí", duration: "4h" },
      { stop: "Bahía Solano", duration: "6h" },
      { stop: "El Valle", duration: "7h" },
    ],
    duration: "8 horas",
    frequency: "Sábado",
    price: "280.000",
    vessel: "Ferry",
    capacity: "40 pasajeros",
    features: ["Chaleco salvavidas", "Alimentación", "Seguro de viaje"],
    popular: false,
    multiStop: true,
    schedules: [
      { vessel: "Norte Express", vesselType: "Ferry", departure: "04:00", arrival: "12:00", capacity: 40, available: 25, price: "280.000" },
    ],
  },
  {
    id: 7,
    name: "Ruta Pizarro Express",
    from: "Buenaventura",
    fromDept: "Valle del Cauca",
    to: "Pizarro",
    toDept: "Chocó",
    stops: ["Nuquí"],
    stopTimes: [{ stop: "Nuquí", duration: "4h" }],
    duration: "6 horas",
    frequency: "Lunes, Jueves, Sábado",
    price: "200.000",
    vessel: "Lancha Rápida",
    capacity: "25 pasajeros",
    features: ["Chaleco salvavidas", "Seguro de viaje"],
    popular: false,
    multiStop: false,
    schedules: [
      { vessel: "Pizarro Directo", vesselType: "Lancha Rápida", departure: "06:00", arrival: "12:00", capacity: 25, available: 18, price: "200.000" },
      { vessel: "Chocó Veloz", vesselType: "Lancha Rápida", departure: "09:00", arrival: "15:00", capacity: 25, available: 12, price: "200.000" },
    ],
  },
  {
    id: 8,
    name: "Ruta Cauca Profundo",
    from: "Buenaventura",
    fromDept: "Valle del Cauca",
    to: "López de Micay",
    toDept: "Nariño",
    stops: ["Guapi", "La Tola", "Mosquera"],
    stopTimes: [
      { stop: "Guapi", duration: "3h" },
      { stop: "La Tola", duration: "3.5h" },
      { stop: "Mosquera", duration: "4h" },
    ],
    duration: "4.5 horas",
    frequency: "Martes, Viernes",
    price: "150.000",
    vessel: "Lancha Rápida",
    capacity: "20 pasajeros",
    features: ["Chaleco salvavidas", "Seguro de viaje", "Equipaje incluido"],
    popular: false,
    multiStop: true,
    schedules: [
      { vessel: "Sur Profundo", vesselType: "Lancha Rápida", departure: "05:30", arrival: "10:00", capacity: 20, available: 14, price: "150.000" },
    ],
  },
  {
    id: 9,
    name: "Ruta Iscuandé Delta",
    from: "Buenaventura",
    fromDept: "Valle del Cauca",
    to: "Iscuandé",
    toDept: "Nariño",
    stops: ["El Charco", "Mosquera"],
    stopTimes: [
      { stop: "El Charco", duration: "3h" },
      { stop: "Mosquera", duration: "4h" },
    ],
    duration: "5 horas",
    frequency: "Miércoles, Sábado",
    price: "140.000",
    vessel: "Lancha Local",
    capacity: "18 pasajeros",
    features: ["Chaleco salvavidas", "Seguro de viaje"],
    popular: false,
    multiStop: true,
    schedules: [
      { vessel: "Delta Express", vesselType: "Lancha Local", departure: "06:00", arrival: "11:00", capacity: 18, available: 10, price: "140.000" },
    ],
  },
]

export function RoutesSection() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null)

  const openSchedules = (route: Route) => {
    setSelectedRoute(route)
    setSelectedSchedule(null)
  }

  const closeModal = () => {
    setSelectedRoute(null)
    setSelectedSchedule(null)
  }

  return (
    <section id="rutas" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Ship className="w-4 h-4" />
            Rutas Marítimas
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Conexiones Verificadas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Todas nuestras rutas operan con embarcaciones certificadas y tripulación experta. 
            Reserva tu cupo con anticipación y viaja seguro.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-muted/50 rounded-2xl p-6 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Anchor className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">25+</div>
                <div className="text-sm text-muted-foreground">Rutas Activas</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <Ship className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Embarcaciones</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Viajeros/año</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Verificados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {routes.map((route) => (
            <article
              key={route.id}
              className={`relative bg-card rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                route.popular ? "border-primary shadow-md" : "border-border"
              }`}
            >
              {/* Popular Badge */}
              {route.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-lg">
                  Popular
                </div>
              )}

              <div className="p-6">
                {/* Route Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {route.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">{route.from}</span>
                        <span className="text-xs text-muted-foreground">{route.fromDept}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-secondary">{route.to}</span>
                        <span className="text-xs text-muted-foreground">{route.toDept}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${route.price}</div>
                    <div className="text-xs text-muted-foreground">COP / persona</div>
                  </div>
                </div>

                {/* Stops with Timeline Visualization */}
                <div className="mb-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Paradas intermedias
                  </div>

                  {route.multiStop ? (
                    <>
                      {/* Timeline Visualization */}
                      <div className="relative flex items-center gap-0.5 overflow-x-auto py-2">
                        {/* Origin */}
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-3 h-3 rounded-full bg-primary ring-2 ring-primary/20" />
                          <span className="text-[10px] text-muted-foreground mt-1 whitespace-nowrap">
                            {route.from.split(" ")[0]}
                          </span>
                        </div>

                        {/* Route line and stops */}
                        {route.stops.map((stop, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary via-teal-400 to-teal-500 min-w-[20px]" />
                            <div className="flex flex-col items-center shrink-0">
                              <div className="w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-teal-500/20" />
                              <span className="text-[10px] text-muted-foreground mt-1 whitespace-nowrap">
                                {stop.split(" ")[0]}
                              </span>
                            </div>
                          </div>
                        ))}

                        {/* Final line to destination */}
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-teal-500 to-secondary min-w-[20px]" />

                        {/* Destination */}
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-3 h-3 rounded-full bg-secondary ring-2 ring-secondary/20" />
                          <span className="text-[10px] text-muted-foreground mt-1 whitespace-nowrap">
                            {route.to.split(" ")[0]}
                          </span>
                        </div>
                      </div>

                      {/* Stop badges with times */}
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {route.stops.map((stop, idx) => (
                          <Badge key={idx} variant="outline" className="text-[10px] font-normal">
                            <MapPin className="w-3 h-3 mr-1 text-teal-500" />
                            {stop}
                            {route.stopTimes?.[idx] && (
                              <span className="ml-1 text-muted-foreground">
                                ({route.stopTimes[idx].duration})
                              </span>
                            )}
                          </Badge>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {route.stops.map((stop, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                        >
                          {stop}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 py-4 border-y border-border">
                  <div className="text-center">
                    <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Duración</div>
                    <div className="text-sm font-medium text-foreground">{route.duration}</div>
                  </div>
                  <div className="text-center">
                    <Ship className="w-4 h-4 text-primary mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Tipo</div>
                    <div className="text-sm font-medium text-foreground">{route.vessel}</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Capacidad</div>
                    <div className="text-sm font-medium text-foreground">{route.capacity}</div>
                  </div>
                  <div className="text-center">
                    <Anchor className="w-4 h-4 text-primary mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Frecuencia</div>
                    <div className="text-sm font-medium text-foreground text-balance">{route.frequency}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {route.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-secondary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => openSchedules(route)}>
                    <Clock className="w-4 h-4 mr-2" />
                    Ver Horarios
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link
                      href={`/reserva?route=${encodeURIComponent(route.name)}&from=${encodeURIComponent(
                        route.from,
                      )}&to=${encodeURIComponent(route.to)}&type=${encodeURIComponent(
                        route.vessel,
                      )}&price=${encodeURIComponent(route.price)}`}
                    >
                      Reservar Cupo
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" size="lg" asChild>
            <Link href="/embarcaciones">
              <Ship className="w-4 h-4 mr-2" />
              Ver Embarcaciones Disponibles
            </Link>
          </Button>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/reserva">
              Reservar Cupo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Schedules Modal */}
      {selectedRoute && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Horarios de ${selectedRoute.name}`}
        >
          <div
            className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-primary text-primary-foreground p-6">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold mb-2">{selectedRoute.name}</h3>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">{selectedRoute.from}</span>
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">{selectedRoute.to}</span>
                <span className="mx-2">·</span>
                <Calendar className="w-4 h-4" />
                <span>{selectedRoute.frequency}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">
                  Selecciona tu embarcación
                </h4>
                <span className="text-xs text-muted-foreground">
                  {selectedRoute.schedules.length} salidas disponibles
                </span>
              </div>

              <div className="space-y-3">
                {selectedRoute.schedules.map((schedule, idx) => {
                  const isSelected = selectedSchedule === idx
                  const isFull = schedule.available === 0
                  return (
                    <button
                      key={idx}
                      onClick={() => !isFull && setSelectedSchedule(idx)}
                      disabled={isFull}
                      className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : isFull
                          ? "border-border bg-muted/40 opacity-60 cursor-not-allowed"
                          : "border-border hover:border-primary/50 hover:bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
                          }`}>
                            <Ship className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{schedule.vessel}</div>
                            <div className="text-xs text-muted-foreground">{schedule.vesselType}</div>
                          </div>
                        </div>

                        {/* Times */}
                        <div className="flex items-center gap-3 text-center">
                          <div>
                            <div className="text-xs text-muted-foreground">Salida</div>
                            <div className="font-bold text-foreground">{schedule.departure}</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Llegada</div>
                            <div className="font-bold text-foreground">{schedule.arrival}</div>
                          </div>
                        </div>
                      </div>

                      {/* Footer of card */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          isFull
                            ? "bg-destructive/10 text-destructive"
                            : schedule.available <= 5
                            ? "bg-accent/20 text-accent-foreground"
                            : "bg-secondary/15 text-secondary"
                        }`}>
                          {isFull ? "Agotado" : `${schedule.available} cupos disponibles`}
                        </span>
                        <span className="text-sm font-bold text-primary">${schedule.price} COP</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border p-4 bg-muted/30 flex items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                {selectedSchedule !== null ? (
                  <span>
                    Seleccionado:{" "}
                    <span className="font-semibold text-foreground">
                      {selectedRoute.schedules[selectedSchedule].vessel} · {selectedRoute.schedules[selectedSchedule].departure}
                    </span>
                  </span>
                ) : (
                  <span>Elige una embarcación para continuar</span>
                )}
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                disabled={selectedSchedule === null}
                asChild={selectedSchedule !== null}
              >
                {selectedSchedule !== null ? (
                  <Link
                    href={`/reserva?route=${encodeURIComponent(selectedRoute.name)}&from=${encodeURIComponent(
                      selectedRoute.from,
                    )}&to=${encodeURIComponent(selectedRoute.to)}&vessel=${encodeURIComponent(
                      selectedRoute.schedules[selectedSchedule].vessel,
                    )}&type=${encodeURIComponent(
                      selectedRoute.schedules[selectedSchedule].vesselType,
                    )}&departure=${encodeURIComponent(
                      selectedRoute.schedules[selectedSchedule].departure,
                    )}&arrival=${encodeURIComponent(
                      selectedRoute.schedules[selectedSchedule].arrival,
                    )}&price=${encodeURIComponent(selectedRoute.schedules[selectedSchedule].price)}`}
                  >
                    Reservar Cupo
                  </Link>
                ) : (
                  <span>Reservar Cupo</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
