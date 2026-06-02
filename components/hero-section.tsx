"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, Users, ChevronDown, Ship } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState("1")

  const destinations = [
    "Buenaventura",
    "Nuquí",
    "Bahía Solano",
    "Tumaco",
    "Guapi",
    "Ladrilleros",
    "Juanchaco",
    "El Valle",
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Ship className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Temporada de Ballenas: Julio - Noviembre
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
            Descubre el Pacífico
            <span className="block text-accent">Colombiano</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 text-pretty">
            Navega por las aguas más biodiversas del planeta. Ballenas jorobadas, 
            playas vírgenes y la cultura ancestral del litoral te esperan.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">12+</div>
              <div className="text-sm text-white/70">Destinos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm text-white/70">Viajeros</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-sm text-white/70">Satisfacción</div>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 max-w-5xl mx-auto border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Origin */}
            <div className="relative">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                Origen
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-input border border-border rounded-lg text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Seleccionar</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Destination */}
            <div className="relative">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                Destino
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-input border border-border rounded-lg text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Seleccionar</option>
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                Fecha de Viaje
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Passengers */}
            <div className="relative">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                Pasajeros
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-input border border-border rounded-lg text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Pasajero" : "Pasajeros"}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold gap-2">
                <Search className="w-5 h-5" />
                Buscar
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Rutas populares:</span>
            <button className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors">
              Buenaventura → Nuquí
            </button>
            <button className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors">
              Buenaventura → Bahía Solano
            </button>
            <button className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors">
              Tour Avistamiento Ballenas
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
