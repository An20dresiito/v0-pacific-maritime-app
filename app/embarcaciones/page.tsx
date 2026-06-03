"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Ship,
  Users,
  Clock,
  ArrowLeft,
  Shield,
  Fuel,
  Gauge,
  CheckCircle,
  MapPin,
  ChevronDown,
  X,
  Star,
  Anchor,
  Wind,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// --- Data ---

const routeOptions = [
  { id: "all", label: "Todas las rutas" },
  { id: "choco", label: "Buenaventura → Nuquí" },
  { id: "cauca", label: "Buenaventura → Guapi" },
  { id: "narino", label: "Buenaventura → Tumaco" },
  { id: "local", label: "Ruta Local Valle" },
  { id: "bocana", label: "Buenaventura → La Bocana" },
  { id: "pianguita", label: "Buenaventura → Pianguita" },
]

const vesselTypes = [
  { id: "all", label: "Todos los tipos" },
  { id: "lancha-rapida", label: "Lancha Rápida" },
  { id: "ferry", label: "Ferry" },
  { id: "lancha-local", label: "Lancha Local" },
  { id: "panga", label: "Panga" },
]

const vessels = [
  {
    id: 1,
    name: "Lancha Veloz Pacífico",
    type: "lancha-rapida",
    typeName: "Lancha Rápida",
    capacity: 25,
    speed: "45 km/h",
    engine: "Yamaha 250 HP x2",
    fuelType: "Gasolina",
    year: 2021,
    operator: "Transportes Mar del Pacífico",
    rating: 4.8,
    reviews: 134,
    price: "180.000",
    routes: ["choco", "cauca"],
    routeNames: ["Buenaventura → Nuquí", "Buenaventura → Guapi"],
    features: ["Chalecos salvavidas", "Sistema GPS", "Radio VHF", "Canopy", "Seguro de viaje"],
    certified: true,
    available: true,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop",
    description:
      "Embarcación de alta velocidad con diseño hidrodinámico ideal para travesías largas. Cuenta con asientos acolchados y protección contra lluvia.",
    nextDeparture: "Mar 04 Jun — 06:00 AM",
  },
  {
    id: 2,
    name: "Ferry Bahía Grande",
    type: "ferry",
    typeName: "Ferry",
    capacity: 60,
    speed: "22 km/h",
    engine: "Cummins Marine 500 HP",
    fuelType: "ACPM",
    year: 2019,
    operator: "Navipacifico S.A.S",
    rating: 4.6,
    reviews: 289,
    price: "220.000",
    routes: ["narino"],
    routeNames: ["Buenaventura → Tumaco"],
    features: ["Cafetería", "Baños", "WiFi", "TV", "Chalecos salvavidas", "Seguro de viaje", "Bodega de carga"],
    certified: true,
    available: true,
    image: "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=800&auto=format&fit=crop",
    description:
      "Ferry de mayor capacidad para rutas largas hacia el sur del Pacífico. Ofrece el mayor confort con cafetería, baños y Wi-Fi a bordo.",
    nextDeparture: "Mar 04 Jun — 07:30 AM",
  },
  {
    id: 3,
    name: "Lancha Express Chocó",
    type: "lancha-rapida",
    typeName: "Lancha Rápida",
    capacity: 30,
    speed: "40 km/h",
    engine: "Yamaha 200 HP x2",
    fuelType: "Gasolina",
    year: 2022,
    operator: "Conexión Chocó",
    rating: 4.9,
    reviews: 78,
    price: "120.000",
    routes: ["cauca", "choco"],
    routeNames: ["Buenaventura → Guapi", "Buenaventura → Nuquí"],
    features: ["Chalecos salvavidas", "GPS", "Radio VHF", "Canopy reforzado"],
    certified: true,
    available: true,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
    description:
      "Embarcación nueva con tecnología moderna, amplio espacio para pasajeros y compartimento de equipaje seguro bajo cubierta.",
    nextDeparture: "Lun 03 Jun — 05:30 AM",
  },
  {
    id: 4,
    name: "Lancha Local Don Julio",
    type: "lancha-local",
    typeName: "Lancha Local",
    capacity: 20,
    speed: "30 km/h",
    engine: "Suzuki 115 HP",
    fuelType: "Gasolina",
    year: 2018,
    operator: "Flota Buenaventura",
    rating: 4.3,
    reviews: 412,
    price: "45.000",
    routes: ["local"],
    routeNames: ["Ruta Local Valle (Juanchaco / Ladrilleros)"],
    features: ["Chalecos salvavidas", "GPS"],
    certified: true,
    available: true,
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=800&auto=format&fit=crop",
    description:
      "Embarcación tradicional de la región para rutas locales dentro de la bahía de Buenaventura y playas cercanas. Conoce el litoral con operadores locales.",
    nextDeparture: "Diario — cada 2 horas desde 06:00 AM",
  },
  {
    id: 5,
    name: "Panga La Bocana",
    type: "panga",
    typeName: "Panga",
    capacity: 12,
    speed: "25 km/h",
    engine: "Yamaha 75 HP",
    fuelType: "Gasolina",
    year: 2020,
    operator: "Turismo Bahía",
    rating: 4.5,
    reviews: 96,
    price: "25.000",
    routes: ["bocana", "pianguita"],
    routeNames: ["Buenaventura → La Bocana", "Buenaventura → Pianguita"],
    features: ["Chalecos salvavidas", "GPS"],
    certified: true,
    available: true,
    image: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?q=80&w=800&auto=format&fit=crop",
    description:
      "Pequeña embarcación ideal para rutas dentro de la bahía de Buenaventura hacia La Bocana y Pianguita. Perfecta para turismo de playa local con salidas frecuentes.",
    nextDeparture: "Diario — 07:00 AM, 10:00 AM, 01:00 PM",
  },
  {
    id: 6,
    name: "Lancha Narino Sur",
    type: "lancha-rapida",
    typeName: "Lancha Rápida",
    capacity: 28,
    speed: "42 km/h",
    engine: "Evinrude 250 HP x2",
    fuelType: "Gasolina",
    year: 2020,
    operator: "Pacífico Sur Ltda",
    rating: 4.7,
    reviews: 155,
    price: "220.000",
    routes: ["narino"],
    routeNames: ["Buenaventura → Tumaco"],
    features: ["Chalecos salvavidas", "GPS", "Radio VHF", "Canopy", "Seguro de viaje"],
    certified: true,
    available: false,
    image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=800&auto=format&fit=crop",
    description:
      "Lancha de largo alcance para la ruta más larga del Pacífico sur. Diseñada para brindar estabilidad y seguridad en travesías extendidas.",
    nextDeparture: "Mar 04 Jun — 05:00 AM",
  },
]

// --- Sub-components ---

function VesselCard({
  vessel,
  onSelect,
}: {
  vessel: (typeof vessels)[0]
  onSelect: (v: (typeof vessels)[0]) => void
}) {
  return (
    <article
      className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
        vessel.available ? "border-border" : "border-border opacity-70"
      }`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={vessel.image}
          alt={vessel.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground text-xs font-semibold">
            {vessel.typeName}
          </Badge>
          {vessel.certified && (
            <Badge className="bg-secondary text-secondary-foreground text-xs font-semibold">
              <Shield className="w-3 h-3 mr-1" />
              Certificado
            </Badge>
          )}
        </div>
        {!vessel.available && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-black/70 text-white text-sm font-semibold px-4 py-2 rounded-full">
              Sin disponibilidad
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 text-white text-sm font-medium">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{vessel.rating}</span>
            <span className="text-white/70 text-xs">({vessel.reviews} reseñas)</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight">{vessel.name}</h3>
            <p className="text-sm text-muted-foreground">{vessel.operator}</p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <div className="text-xl font-bold text-primary">${vessel.price}</div>
            <div className="text-xs text-muted-foreground">COP / persona</div>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 my-4 py-4 border-y border-border">
          <div className="flex flex-col items-center text-center gap-1">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Capacidad</span>
            <span className="text-sm font-semibold text-foreground">{vessel.capacity} pax</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Velocidad</span>
            <span className="text-sm font-semibold text-foreground">{vessel.speed}</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <Fuel className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Motor</span>
            <span className="text-sm font-semibold text-foreground text-center leading-tight">{vessel.engine.split(" ").slice(0, 2).join(" ")}</span>
          </div>
        </div>

        {/* Routes */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Rutas disponibles</p>
          <div className="flex flex-col gap-1">
            {vessel.routeNames.map((r, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-foreground">
                <MapPin className="w-3 h-3 text-secondary shrink-0" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {vessel.features.slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-secondary shrink-0" />
              <span>{f}</span>
            </div>
          ))}
          {vessel.features.length > 4 && (
            <span className="text-xs text-primary font-medium">+{vessel.features.length - 4} más</span>
          )}
        </div>

        {/* Next departure */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 mb-4">
          <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Próxima salida: <strong className="text-foreground">{vessel.nextDeparture}</strong></span>
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 text-sm"
            onClick={() => onSelect(vessel)}
          >
            Ver detalle
          </Button>
          <Button
            className="flex-1 text-sm bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!vessel.available}
            asChild={vessel.available}
          >
            {vessel.available ? (
              <Link
                href={`/reserva?route=${encodeURIComponent(vessel.routeNames[0])}&vessel=${encodeURIComponent(
                  vessel.name,
                )}&type=${encodeURIComponent(vessel.typeName)}&price=${encodeURIComponent(vessel.price)}`}
              >
                Reservar cupo
              </Link>
            ) : (
              <span>No disponible</span>
            )}
          </Button>
        </div>
      </div>
    </article>
  )
}

function VesselModal({
  vessel,
  onClose,
}: {
  vessel: (typeof vessels)[0]
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-t-3xl sm:rounded-2xl shadow-2xl mx-0 sm:mx-4">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        {/* Image */}
        <div className="relative h-64">
          <Image
            src={vessel.image}
            alt={vessel.name}
            fill
            className="object-cover rounded-t-3xl sm:rounded-t-2xl"
            sizes="672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl sm:rounded-t-2xl" />
          <div className="absolute bottom-4 left-5">
            <Badge className="bg-primary text-primary-foreground mb-2 text-xs font-semibold">
              {vessel.typeName}
            </Badge>
            <h2 className="text-2xl font-bold text-white">{vessel.name}</h2>
            <p className="text-white/80 text-sm">{vessel.operator}</p>
          </div>
        </div>

        <div className="p-6">
          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{vessel.description}</p>

          {/* Full specs */}
          <h3 className="font-bold text-foreground mb-3">Especificaciones técnicas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              { icon: Users, label: "Capacidad", value: `${vessel.capacity} pasajeros` },
              { icon: Gauge, label: "Velocidad", value: vessel.speed },
              { icon: Wind, label: "Motor", value: vessel.engine },
              { icon: Fuel, label: "Combustible", value: vessel.fuelType },
              { icon: Anchor, label: "Año", value: vessel.year.toString() },
              { icon: Star, label: "Calificación", value: `${vessel.rating} (${vessel.reviews})` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-muted/50 rounded-xl p-3 flex items-center gap-3">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="text-sm font-semibold text-foreground">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* All features */}
          <h3 className="font-bold text-foreground mb-3">Equipamiento y servicios</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {vessel.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Routes */}
          <h3 className="font-bold text-foreground mb-3">Rutas que opera</h3>
          <div className="flex flex-col gap-2 mb-6">
            {vessel.routeNames.map((r, i) => (
              <div key={i} className="flex items-center gap-2 bg-primary/5 rounded-lg px-4 py-2 text-sm font-medium text-primary">
                <MapPin className="w-4 h-4 shrink-0" />
                {r}
              </div>
            ))}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <span className="text-2xl font-bold text-primary">${vessel.price}</span>
              <span className="text-muted-foreground text-sm ml-1">COP / persona</span>
            </div>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!vessel.available}
              asChild={vessel.available}
            >
              {vessel.available ? (
                <Link
                  href={`/reserva?route=${encodeURIComponent(vessel.routeNames[0])}&vessel=${encodeURIComponent(
                    vessel.name,
                  )}&type=${encodeURIComponent(vessel.typeName)}&price=${encodeURIComponent(vessel.price)}`}
                >
                  Reservar este cupo
                </Link>
              ) : (
                <span>Sin disponibilidad</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Main Page ---

export default function EmbarcacionesPage() {
  const [selectedRoute, setSelectedRoute] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedVessel, setSelectedVessel] = useState<(typeof vessels)[0] | null>(null)
  const [routeOpen, setRouteOpen] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)

  const filtered = vessels.filter((v) => {
    const matchRoute = selectedRoute === "all" || v.routes.includes(selectedRoute)
    const matchType = selectedType === "all" || v.type === selectedType
    return matchRoute && matchType
  })

  const counts = {
    total: vessels.length,
    available: vessels.filter((v) => v.available).length,
  }

  return (
    <>
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back + breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Inicio
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Embarcaciones</span>
          </div>

          {/* Page header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Ship className="w-4 h-4" />
              Flota Verificada
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
              Elige tu Embarcación
            </h1>
            <p className="text-muted-foreground max-w-2xl text-pretty">
              Todas las embarcaciones de la flota PacificConnect están certificadas por la 
              Dirección General Marítima (DIMAR) y operadas por capitanes con licencia vigente. 
              Selecciona la que mejor se adapte a tu ruta y necesidades.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ship className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">{counts.total}</strong> embarcaciones registradas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">{counts.available}</strong> disponibles hoy
                </span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {/* Route filter */}
            <div className="relative">
              <button
                onClick={() => { setRouteOpen(!routeOpen); setTypeOpen(false) }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:border-primary transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary" />
                {routeOptions.find((r) => r.id === selectedRoute)?.label}
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${routeOpen ? "rotate-180" : ""}`} />
              </button>
              {routeOpen && (
                <div className="absolute top-full left-0 mt-1 z-20 bg-card border border-border rounded-xl shadow-lg min-w-56 overflow-hidden">
                  {routeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setSelectedRoute(opt.id); setRouteOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors ${
                        selectedRoute === opt.id ? "text-primary font-semibold bg-primary/5" : "text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type filter */}
            <div className="relative">
              <button
                onClick={() => { setTypeOpen(!typeOpen); setRouteOpen(false) }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border text-sm font-medium text-foreground hover:border-primary transition-colors"
              >
                <Ship className="w-4 h-4 text-primary" />
                {vesselTypes.find((t) => t.id === selectedType)?.label}
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${typeOpen ? "rotate-180" : ""}`} />
              </button>
              {typeOpen && (
                <div className="absolute top-full left-0 mt-1 z-20 bg-card border border-border rounded-xl shadow-lg min-w-44 overflow-hidden">
                  {vesselTypes.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setSelectedType(opt.id); setTypeOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors ${
                        selectedType === opt.id ? "text-primary font-semibold bg-primary/5" : "text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active filter chips */}
            {(selectedRoute !== "all" || selectedType !== "all") && (
              <button
                onClick={() => { setSelectedRoute("all"); setSelectedType("all") }}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            )}

            {/* Count */}
            <div className="ml-auto self-center text-sm text-muted-foreground">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((vessel) => (
                <VesselCard key={vessel.id} vessel={vessel} onSelect={setSelectedVessel} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Anchor className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Sin resultados</h3>
              <p className="text-muted-foreground mb-6">
                No hay embarcaciones disponibles para los filtros seleccionados.
              </p>
              <Button
                variant="outline"
                onClick={() => { setSelectedRoute("all"); setSelectedType("all") }}
              >
                Ver todas las embarcaciones
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedVessel && (
        <VesselModal vessel={selectedVessel} onClose={() => setSelectedVessel(null)} />
      )}
    </>
  )
}
