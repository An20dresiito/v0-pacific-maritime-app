"use client"

import Link from "next/link"
import { Ship, Clock, Users, ShieldCheck, ArrowRight, Anchor, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const routes = [
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
  },
]

export function RoutesSection() {
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
                  <Button variant="outline" className="flex-1">
                    Ver Horarios
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Reservar Cupo
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
    </section>
  )
}
