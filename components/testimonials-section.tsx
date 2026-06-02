"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "María Fernanda López",
    location: "Bogotá, Colombia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "Una experiencia increíble. Ver las ballenas jorobadas fue mágico. El equipo de Pacífico Voyages hizo todo muy fácil y seguro. Definitivamente volveré.",
    trip: "Avistamiento de Ballenas - Nuquí",
    date: "Agosto 2025",
  },
  {
    id: 2,
    name: "Carlos Andrés Mejía",
    location: "Medellín, Colombia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "El viaje a Bahía Solano superó todas mis expectativas. Las playas vírgenes, la comida local y la hospitalidad de la gente. Un destino que todo colombiano debe conocer.",
    trip: "Bahía Solano Express",
    date: "Septiembre 2025",
  },
  {
    id: 3,
    name: "Ana Patricia Gómez",
    location: "Cali, Colombia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "Llevé a mi familia completa y fue perfecto. Los niños quedaron fascinados con los manglares y las tortugas. Servicio excelente y muy organizado.",
    trip: "Tour de Manglares - Ladrilleros",
    date: "Julio 2025",
  },
  {
    id: 4,
    name: "Juan Pablo Restrepo",
    location: "Barranquilla, Colombia",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "Como fotógrafo profesional, el tour de naturaleza fue exactamente lo que necesitaba. Los guías conocen los mejores spots y respetan el medio ambiente.",
    trip: "Fotografía de Naturaleza - El Valle",
    date: "Octubre 2025",
  },
  {
    id: 5,
    name: "Laura Valentina Ortiz",
    location: "Pereira, Colombia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    text: "El buceo en el Pacífico es otra cosa. Aguas cálidas, visibilidad increíble y una biodiversidad que no había visto nunca. El instructor fue muy paciente.",
    trip: "Buceo y Snorkel - Bahía Solano",
    date: "Agosto 2025",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <section className="py-20 bg-sidebar text-sidebar-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-sidebar-primary uppercase tracking-wider mb-2">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sidebar-foreground mb-4 text-balance">
            Lo Que Dicen Nuestros Viajeros
          </h2>
          <p className="text-sidebar-foreground/70 max-w-2xl mx-auto text-pretty">
            Miles de viajeros han descubierto el Pacífico colombiano con nosotros. 
            Estas son algunas de sus historias.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, idx) => (
              <article
                key={`${testimonial.id}-${idx}`}
                className={`bg-sidebar-accent rounded-2xl p-6 transition-all duration-300 ${
                  idx === 0 ? "lg:scale-100" : "lg:scale-95 lg:opacity-80"
                }`}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-sidebar-primary mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sidebar-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Trip Info */}
                <div className="text-sm text-sidebar-foreground/60 mb-4">
                  <span className="font-medium text-sidebar-primary">{testimonial.trip}</span>
                  <span className="mx-2">•</span>
                  <span>{testimonial.date}</span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-sidebar-border">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sidebar-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-sidebar-foreground/60">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-8 md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-sidebar-accent border-sidebar-border text-sidebar-accent-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-sidebar-primary"
                    : "bg-sidebar-border hover:bg-sidebar-primary/50"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-sidebar-border">
          <div className="text-center">
            <div className="text-4xl font-bold text-sidebar-primary mb-2">4.9</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <div className="text-sm text-sidebar-foreground/60">Calificación promedio</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-sidebar-primary mb-2">2,500+</div>
            <div className="text-sm text-sidebar-foreground/60">Reseñas verificadas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-sidebar-primary mb-2">98%</div>
            <div className="text-sm text-sidebar-foreground/60">Recomendarían</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-sidebar-primary mb-2">15K+</div>
            <div className="text-sm text-sidebar-foreground/60">Viajes completados</div>
          </div>
        </div>
      </div>
    </section>
  )
}
