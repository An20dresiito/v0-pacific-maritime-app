"use client"

import { Ship, Clock, Users, Wifi, Coffee, ShieldCheck, ArrowRight, Anchor } from "lucide-react"
import { Button } from "@/components/ui/button"

const routes = [
  {
    id: 1,
    name: "Ruta del Pacífico Norte",
    from: "Buenaventura",
    to: "Nuquí",
    stops: ["Juanchaco", "Ladrilleros", "Bahía Málaga"],
    duration: "8-10 horas",
    frequency: "Martes y Viernes",
    price: "Desde $180.000",
    vessel: "Lancha Rápida",
    capacity: "25 pasajeros",
    amenities: ["Chaleco salvavidas", "Seguro de viaje", "Refrigerio"],
    popular: true,
  },
  {
    id: 2,
    name: "Ruta Bahía Solano Express",
    from: "Buenaventura",
    to: "Bahía Solano",
    stops: ["Nuquí", "El Valle"],
    duration: "12-14 horas",
    frequency: "Lunes y Jueves",
    price: "Desde $220.000",
    vessel: "Ferry Cómodo",
    capacity: "60 pasajeros",
    amenities: ["Chaleco salvavidas", "WiFi", "Cafetería", "Seguro de viaje"],
    popular: true,
  },
  {
    id: 3,
    name: "Costa Sur Express",
    from: "Buenaventura",
    to: "Tumaco",
    stops: ["Guapi", "El Charco"],
    duration: "5-6 horas",
    frequency: "Miércoles y Sábado",
    price: "Desde $95.000",
    vessel: "Lancha Rápida",
    capacity: "30 pasajeros",
    amenities: ["Chaleco salvavidas", "Seguro de viaje"],
    popular: false,
  },
  {
    id: 4,
    name: "Tour Playas Cercanas",
    from: "Buenaventura",
    to: "Ladrilleros",
    stops: ["Juanchaco"],
    duration: "1-2 horas",
    frequency: "Diario",
    price: "Desde $45.000",
    vessel: "Lancha Local",
    capacity: "20 pasajeros",
    amenities: ["Chaleco salvavidas"],
    popular: false,
  },
]

const amenityIcons: Record<string, React.ElementType> = {
  "Chaleco salvavidas": ShieldCheck,
  "WiFi": Wifi,
  "Cafetería": Coffee,
  "Seguro de viaje": ShieldCheck,
  "Refrigerio": Coffee,
}

export function RoutesSection() {
  return (
    <section id="rutas" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Conexiones Marítimas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Nuestras Rutas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Navega con seguridad y comodidad por el Pacífico colombiano. 
            Embarcaciones certificadas y tripulación experta en cada viaje.
          </p>
        </div>

        {/* Route Map Illustration */}
        <div className="relative bg-secondary/10 rounded-3xl p-8 mb-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 800 300" className="w-full h-full">
              <path
                d="M100,150 Q200,50 300,150 T500,150 T700,150"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,10"
                className="text-primary"
              />
            </svg>
          </div>
          
          <div className="relative flex flex-wrap justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Anchor className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">4+</div>
                <div className="text-sm text-muted-foreground">Rutas Activas</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <Ship className="w-8 h-8 text-secondary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">12+</div>
                <div className="text-sm text-muted-foreground">Embarcaciones</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Pasajeros/año</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Seguridad</div>
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
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                      {route.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-primary">{route.from}</span>
                      <ArrowRight className="w-4 h-4" />
                      <span className="font-medium text-secondary">{route.to}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{route.price}</div>
                    <div className="text-xs text-muted-foreground">por persona</div>
                  </div>
                </div>

                {/* Stops */}
                <div className="mb-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Paradas
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 py-4 border-y border-border">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Duración</div>
                    <div className="text-sm font-medium text-foreground">{route.duration}</div>
                  </div>
                  <div className="text-center">
                    <Ship className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Embarcación</div>
                    <div className="text-sm font-medium text-foreground">{route.vessel}</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Capacidad</div>
                    <div className="text-sm font-medium text-foreground">{route.capacity}</div>
                  </div>
                  <div className="text-center">
                    <Anchor className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Frecuencia</div>
                    <div className="text-sm font-medium text-foreground">{route.frequency}</div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {route.amenities.map((amenity, idx) => {
                    const Icon = amenityIcons[amenity] || ShieldCheck
                    return (
                      <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon className="w-3 h-3" />
                        <span>{amenity}</span>
                      </div>
                    )
                  })}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Ver Horarios
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Reservar
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
