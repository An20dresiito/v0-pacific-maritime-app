"use client"

import { useState } from "react"
import Link from "next/link"
import { Ship, Clock, Users, ShieldCheck, ArrowRight, Anchor, CheckCircle, X, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  duration: string
  frequency: string
  price: string
  vessel: string
  capacity: string
  features: string[]
  popular: boolean
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
    duration: "4-5 horas",
    frequency: "Martes, Jueves, Sábado",
    price: "180.000",
    vessel: "Lancha Rápida",
    capacity: "25 pasajeros",
    features: ["Chaleco salvavidas", "Seguro de viaje", "Equipaje incluido"],
    popular: true,
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
    duration: "3-4 horas",
    frequency: "Lunes, Miércoles, Viernes",
    price: "120.000",
    vessel: "Lancha Rápida",
    capacity: "30 pasajeros",
    features: ["Chaleco salvavidas", "Seguro de viaje"],
    popular: true,
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
    duration: "6-7 horas",
    frequency: "Martes, Sábado",
    price: "220.000",
    vessel: "Ferry Cómodo",
    capacity: "60 pasajeros",
    features: ["Chaleco salvavidas", "Cafetería", "Seguro de viaje", "WiFi"],
    popular: false,
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
    duration: "45 min - 1 hora",
    frequency: "Diario (cada 2 horas)",
    price: "45.000",
    vessel: "Lancha Local",
    capacity: "20 pasajeros",
    features: ["Chaleco salvavidas"],
    popular: false,
    schedules: [
      { vessel: "Olita Local", vesselType: "Lancha Local", departure: "07:00", arrival: "07:50", capacity: 20, available: 10, price: "45.000" },
      { vessel: "Brisa Marina", vesselType: "Lancha Local", departure: "09:00", arrival: "09:50", capacity: 20, available: 18, price: "45.000" },
      { vessel: "Cangrejo Veloz", vesselType: "Lancha Rápida", departure: "11:00", arrival: "11:45", capacity: 25, available: 4, price: "55.000" },
      { vessel: "Olita Local", vesselType: "Lancha Local", departure: "13:00", arrival: "13:50", capacity: 20, available: 16, price: "45.000" },
      { vessel: "Brisa Marina", vesselType: "Lancha Local", departure: "15:00", arrival: "15:50", capacity: 20, available: 12, price: "45.000" },
      { vessel: "Cangrejo Veloz", vesselType: "Lancha Rápida", departure: "17:00", arrival: "17:45", capacity: 25, available: 21, price: "55.000" },
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

                {/* Stops */}
                <div className="mb-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Paradas intermedias
                  </div>
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
                    <Link href="/embarcaciones">Reservar Cupo</Link>
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
            <Link href="/embarcaciones">
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
                  <Link href="/embarcaciones">Reservar Cupo</Link>
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
