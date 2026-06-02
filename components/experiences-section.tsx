"use client"

import { Fish, Waves, TreePalm, Camera, Users, Compass, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const experiences = [
  {
    id: 1,
    title: "Avistamiento de Ballenas",
    description: "Vive la magia de ver ballenas jorobadas en su hábitat natural. De julio a noviembre, estas majestuosas criaturas llegan al Pacífico colombiano.",
    icon: Fish,
    image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=2070&auto=format&fit=crop",
    features: ["Guías expertos", "Binoculares incluidos", "Charla educativa"],
    price: "Desde $250.000",
    duration: "4-6 horas",
    highlighted: true,
  },
  {
    id: 2,
    title: "Tour de Manglares",
    description: "Navega por los ecosistemas de manglar más biodiversos, hogar de aves exóticas, cangrejos y vida marina única.",
    icon: TreePalm,
    image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?q=80&w=2070&auto=format&fit=crop",
    features: ["Kayak incluido", "Guía local", "Refrigerio"],
    price: "Desde $85.000",
    duration: "3-4 horas",
    highlighted: false,
  },
  {
    id: 3,
    title: "Buceo y Snorkel",
    description: "Descubre los arrecifes y la vida submarina del Pacífico. Tortugas marinas, peces tropicales y corales te esperan.",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
    features: ["Equipo completo", "Instructor certificado", "Fotos submarinas"],
    price: "Desde $180.000",
    duration: "5-6 horas",
    highlighted: false,
  },
  {
    id: 4,
    title: "Fotografía de Naturaleza",
    description: "Tour especializado para capturar la belleza del Pacífico. Amaneceres, fauna silvestre y paisajes únicos.",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2070&auto=format&fit=crop",
    features: ["Tips profesionales", "Mejores spots", "Grupo reducido"],
    price: "Desde $120.000",
    duration: "6-8 horas",
    highlighted: false,
  },
  {
    id: 5,
    title: "Experiencia Cultural",
    description: "Conoce las comunidades afrocolombianas, su música, gastronomía y tradiciones ancestrales del Pacífico.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop",
    features: ["Almuerzo típico", "Música en vivo", "Artesanías"],
    price: "Desde $95.000",
    duration: "Todo el día",
    highlighted: false,
  },
  {
    id: 6,
    title: "Expedición Selvática",
    description: "Adéntrate en la selva del Chocó biogeográfico, una de las regiones más biodiversas del planeta.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop",
    features: ["Guía nativo", "Avistamiento de aves", "Cascadas"],
    price: "Desde $150.000",
    duration: "8-10 horas",
    highlighted: false,
  },
]

export function ExperiencesSection() {
  return (
    <section id="experiencias" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Vive la Aventura
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Experiencias Únicas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Más que un viaje, una transformación. Cada experiencia está diseñada para 
            conectarte con la naturaleza y la cultura del Pacífico.
          </p>
        </div>

        {/* Featured Experience */}
        <div className="mb-12">
          {experiences.filter(e => e.highlighted).map((exp) => (
            <div 
              key={exp.id}
              className="relative rounded-3xl overflow-hidden bg-card border border-border"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-auto lg:min-h-[400px]">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/20 lg:bg-gradient-to-l lg:from-transparent lg:to-card/30" />
                  
                  {/* Season Badge */}
                  <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                    Temporada Activa
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <exp.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {exp.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {exp.title}
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {exp.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-foreground">
                        <Check className="w-5 h-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">{exp.price}</span>
                      <span className="text-muted-foreground text-sm ml-2">por persona</span>
                    </div>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Reservar Ahora
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.filter(e => !e.highlighted).map((exp) => (
            <article
              key={exp.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                
                {/* Icon */}
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <exp.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Duration */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {exp.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                  {exp.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-lg font-bold text-primary">{exp.price}</span>
                  <Button variant="ghost" size="sm" className="gap-1 text-primary">
                    Ver más
                    <ArrowRight className="w-4 h-4" />
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
