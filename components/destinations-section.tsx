"use client"

import { useState } from "react"
import { MapPin, Clock, ArrowRight, Filter, Anchor } from "lucide-react"
import { Button } from "@/components/ui/button"

type Department = "todos" | "choco" | "valle" | "cauca" | "narino"

interface Destination {
  id: string
  name: string
  department: Department
  departmentName: string
  description: string
  travelTime: string
  fromPort: string
  highlights: string[]
  image: string
}

const destinations: Destination[] = [
  {
    id: "nuqui",
    name: "Nuquí",
    department: "choco",
    departmentName: "Chocó",
    description: "Paraíso del avistamiento de ballenas y playas vírgenes en la costa chocoana.",
    travelTime: "4h desde Buenaventura",
    fromPort: "Buenaventura",
    highlights: ["Ballenas", "Playas", "Termales"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "bahia-solano",
    name: "Bahía Solano",
    department: "choco",
    departmentName: "Chocó",
    description: "Biodiversidad marina incomparable y encuentros con tortugas marinas.",
    travelTime: "5h desde Buenaventura",
    fromPort: "Buenaventura",
    highlights: ["Tortugas", "Buceo", "Selva"],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "buenaventura",
    name: "Buenaventura",
    department: "valle",
    departmentName: "Valle del Cauca",
    description: "Principal puerto del Pacífico, punto de conexión para todas las rutas.",
    travelTime: "Hub Central",
    fromPort: "Puerto Principal",
    highlights: ["Puerto", "Conexiones", "Comercio"],
    image: "https://images.unsplash.com/photo-1494791368093-85217fbbf8de?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "ladrilleros",
    name: "Ladrilleros",
    department: "valle",
    departmentName: "Valle del Cauca",
    description: "Playas tradicionales con piscinas naturales y gastronomía local.",
    travelTime: "45min desde Buenaventura",
    fromPort: "Buenaventura",
    highlights: ["Gastronomía", "Familiar", "Playas"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "guapi",
    name: "Guapi",
    department: "cauca",
    departmentName: "Cauca",
    description: "Cuna de la música del Pacífico y tradiciones ancestrales.",
    travelTime: "3h desde Buenaventura",
    fromPort: "Buenaventura",
    highlights: ["Música", "Cultura", "Ríos"],
    image: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "timbiqui",
    name: "Timbiquí",
    department: "cauca",
    departmentName: "Cauca",
    description: "Riqueza cultural y natural en el corazón del Pacífico caucano.",
    travelTime: "4h desde Buenaventura",
    fromPort: "Buenaventura",
    highlights: ["Cultura", "Naturaleza", "Comunidades"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "tumaco",
    name: "Tumaco",
    department: "narino",
    departmentName: "Nariño",
    description: "La Perla del Pacífico con playas extensas y rica tradición marinera.",
    travelTime: "6h desde Buenaventura",
    fromPort: "Buenaventura",
    highlights: ["Playas", "Manglares", "Gastronomía"],
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "el-charco",
    name: "El Charco",
    department: "narino",
    departmentName: "Nariño",
    description: "Comunidad pesquera con acceso a ecosistemas de manglar únicos.",
    travelTime: "5h desde Buenaventura",
    fromPort: "Buenaventura",
    highlights: ["Pesca", "Manglares", "Tradiciones"],
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop",
  },
]

const departmentFilters: { id: Department; name: string }[] = [
  { id: "todos", name: "Todos" },
  { id: "choco", name: "Chocó" },
  { id: "valle", name: "Valle del Cauca" },
  { id: "cauca", name: "Cauca" },
  { id: "narino", name: "Nariño" },
]

export function DestinationsSection() {
  const [activeFilter, setActiveFilter] = useState<Department>("todos")
  
  const filteredDestinations = activeFilter === "todos" 
    ? destinations 
    : destinations.filter(d => d.department === activeFilter)

  return (
    <section id="destinos" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Destinos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Explora el Pacífico Colombiano
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Cuatro departamentos conectados por mar. Descubre comunidades, playas vírgenes 
            y la biodiversidad más rica del planeta.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          <Filter className="w-4 h-4 text-muted-foreground mr-2" />
          {departmentFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <article
              key={destination.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                
                {/* Department Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-md bg-white/90 text-xs font-medium text-foreground">
                    {destination.departmentName}
                  </span>
                </div>
                
                {/* Title on image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/80 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{destination.travelTime}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {destination.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button variant="ghost" size="sm" className="w-full justify-between text-primary hover:text-primary hover:bg-primary/5">
                  <span>Ver rutas disponibles</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Anchor className="w-4 h-4 mr-2" />
            Ver Todas las Rutas
          </Button>
        </div>
      </div>
    </section>
  )
}
