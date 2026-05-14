"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, MapPin, Calendar, Users, ChevronDown, Shield, Clock, Anchor, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"

const departments = [
  { id: "choco", name: "Chocó", ports: ["Nuquí", "Bahía Solano", "Juradó", "Pizarro"] },
  { id: "valle", name: "Valle del Cauca", ports: ["Buenaventura", "Ladrilleros", "La Bocana", "Pianguita"] },
  { id: "cauca", name: "Cauca", ports: ["Guapi", "Timbiquí", "López de Micay"] },
  { id: "narino", name: "Nariño", ports: ["Tumaco", "El Charco", "La Tola", "Mosquera"] },
]

const stats = [
  { value: "4", label: "Departamentos", icon: MapPin },
  { value: "25+", label: "Rutas Activas", icon: Anchor },
  { value: "100%", label: "Verificados", icon: Shield },
  { value: "24/7", label: "Disponibilidad", icon: Clock },
]

const popularRoutes = [
  { from: "Buenaventura", to: "Nuquí", duration: "4h" },
  { from: "Buenaventura", to: "Guapi", duration: "3h" },
  { from: "Tumaco", to: "El Charco", duration: "2h" },
]

export function HeroSection() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState("1")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          {/* Logo Badge */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3">
              <Image
                src="/logo.png"
                alt="PacificConnect Logo"
                width={80}
                height={80}
                className="w-20 h-20 brightness-0 invert"
              />
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Waves className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">
              Estamos Unidos
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
            Tu viaje seguro por el
            <span className="block text-primary">Pacífico</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 text-pretty">
            Plataforma digital que conecta <strong>Chocó, Valle del Cauca, Cauca y Nariño</strong> por vía marítima. 
            Reserva tu cupo en embarcaciones verificadas y seguras desde cualquier lugar.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
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
                  <option value="">Seleccionar puerto</option>
                  {departments.map((dept) => (
                    <optgroup key={dept.id} label={dept.name}>
                      {dept.ports.map((port) => (
                        <option key={port} value={port}>{port}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
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
                  <option value="">Seleccionar puerto</option>
                  {departments.map((dept) => (
                    <optgroup key={dept.id} label={dept.name}>
                      {dept.ports.map((port) => (
                        <option key={port} value={port} disabled={port === origin}>{port}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                Fecha de Viaje
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                  <option value="10+">Grupo (+10)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
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
            {popularRoutes.map((route, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setOrigin(route.from)
                  setDestination(route.to)
                }}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors"
              >
                {route.from} → {route.to} ({route.duration})
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Embarcaciones Verificadas</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>Disponibilidad en Tiempo Real</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>+50,000 Viajeros</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
