"use client"

import { useState } from "react"
import { MapPin, Clock, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const destinations = [
  {
    id: 1,
    name: "Nuquí",
    description: "Paraíso virgen con playas de arena negra, selva tropical y avistamiento de ballenas jorobadas.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop",
    duration: "8-12 horas desde Buenaventura",
    rating: 4.9,
    reviews: 234,
    price: "Desde $180.000",
    tags: ["Ballenas", "Playas", "Naturaleza"],
  },
  {
    id: 2,
    name: "Bahía Solano",
    description: "Biodiversidad marina incomparable, pesca deportiva y encuentros con tortugas marinas.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
    duration: "10-14 horas desde Buenaventura",
    rating: 4.8,
    reviews: 189,
    price: "Desde $220.000",
    tags: ["Tortugas", "Pesca", "Buceo"],
  },
  {
    id: 3,
    name: "Ladrilleros",
    description: "Playa tradicional del Pacífico con piscinas naturales y la mejor gastronomía local.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    duration: "1-2 horas desde Buenaventura",
    rating: 4.7,
    reviews: 412,
    price: "Desde $45.000",
    tags: ["Gastronomía", "Familiar", "Cerca"],
  },
  {
    id: 4,
    name: "El Valle",
    description: "Cascadas escondidas, senderos ecológicos y la playa de Almejal para surfear.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop",
    duration: "45 min desde Bahía Solano",
    rating: 4.9,
    reviews: 156,
    price: "Desde $35.000",
    tags: ["Surf", "Cascadas", "Trekking"],
  },
  {
    id: 5,
    name: "Guapi",
    description: "Río navegable, cultura afrodescendiente y los mejores cantos del Pacífico.",
    image: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=2067&auto=format&fit=crop",
    duration: "5-6 horas desde Buenaventura",
    rating: 4.6,
    reviews: 98,
    price: "Desde $120.000",
    tags: ["Cultura", "Música", "Río"],
  },
  {
    id: 6,
    name: "Tumaco",
    description: "Playas extensas, manglares y la joya del sur pacífico con su rica tradición marinera.",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2070&auto=format&fit=crop",
    duration: "4-5 horas desde Buenaventura",
    rating: 4.5,
    reviews: 167,
    price: "Desde $95.000",
    tags: ["Manglares", "Playas", "Tradición"],
  },
]

export function DestinationsSection() {
  const [activeTag, setActiveTag] = useState("Todos")
  
  const allTags = ["Todos", ...new Set(destinations.flatMap(d => d.tags))]
  
  const filteredDestinations = activeTag === "Todos" 
    ? destinations 
    : destinations.filter(d => d.tags.includes(activeTag))

  return (
    <section id="destinos" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Explora el Pacífico
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Destinos Inolvidables
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Desde playas vírgenes hasta selvas tropicales, cada rincón del Pacífico 
            colombiano te ofrece una experiencia única e irrepetible.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <article
              key={destination.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {destination.price}
                </div>
                
                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {destination.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-foreground">
                      {destination.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({destination.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full group/btn">
                  Ver Detalles
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Ver Todos los Destinos
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
