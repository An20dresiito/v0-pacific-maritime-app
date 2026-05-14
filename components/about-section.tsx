"use client"

import { Shield, Users, Anchor, Target, Eye, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

const objectives = [
  {
    icon: Smartphone,
    title: "Digitalización",
    description: "Transformar el sistema de transporte marítimo tradicional con tecnología accesible.",
  },
  {
    icon: Shield,
    title: "Transparencia",
    description: "Garantizar que cada turno esté vinculado a una lancha verificada y segura.",
  },
  {
    icon: Users,
    title: "Conectividad",
    description: "Unir comunidades y fortalecer el turismo regional del Pacífico colombiano.",
  },
  {
    icon: Target,
    title: "Eficiencia",
    description: "Optimizar tiempos, asegurar cupos y mejorar la logística de viajes.",
  },
]

const audiences = [
  {
    title: "Habitantes Locales",
    description: "Personas que usan lanchas frecuentemente para movilizarse entre comunidades por motivos personales o laborales.",
    icon: Users,
  },
  {
    title: "Turistas",
    description: "Nacionales e internacionales que buscan explorar el Pacífico de forma segura y organizada.",
    icon: Eye,
  },
  {
    title: "Comerciantes",
    description: "Viajeros frecuentes que necesitan optimizar tiempos y asegurar cupos para sus actividades.",
    icon: Target,
  },
  {
    title: "Operadores",
    description: "Empresas y propietarios de lanchas que gestionan reservas y organizan pasajeros.",
    icon: Anchor,
  },
]

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Anchor className="w-4 h-4" />
            Nosotros
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Conectando el Pacífico
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-pretty">
            <strong>PACIFICCONNECT</strong> es una plataforma tecnológica que centraliza la oferta 
            de transporte marítimo en el Pacífico colombiano, uniendo Chocó, Nariño, Cauca y 
            Valle del Cauca por vía marítima.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-card rounded-3xl border border-border p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Nuestra Misión
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">
                Ofrecer a locales y turistas un mecanismo confiable y ágil para asegurar 
                su cupo en embarcaciones desde su lugar de origen, garantizando que cada 
                turno esté vinculado a una lancha verificada y segura, fortaleciendo la 
                confianza en el transporte local.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-secondary" />
                  <span>100% Verificado</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-secondary" />
                  <span>+50K Viajeros</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop"
                  alt="Pacífico colombiano"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm opacity-90">Departamentos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Nuestros Objetivos
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((objective, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <objective.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {objective.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audiences */}
        <div>
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            ¿Para Quién es PACIFICCONNECT?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((audience, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                  <audience.icon className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {audience.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Conoce Más Sobre Nosotros
          </Button>
        </div>
      </div>
    </section>
  )
}
