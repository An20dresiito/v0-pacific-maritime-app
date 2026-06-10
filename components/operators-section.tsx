"use client"

import Link from "next/link"
import { Ship, Star, Shield, Users, CircleCheck as CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const operators = [
  {
    id: "op-1",
    slug: "transportes-del-pacifico",
    name: "Transportes del Pacífico",
    logo: "TP",
    rating: 4.9,
    reviews: 342,
    routes: 8,
    vessels: 12,
    verified: true,
    description: "Líder en transporte marítimo con más de 15 años de experiencia conectando el Pacífico.",
    specialties: ["Rutas largas", "Grupos grandes", "Carga"],
  },
  {
    id: "op-2",
    slug: "lanchas-buenaventura",
    name: "Lanchas Buenaventura",
    logo: "LB",
    rating: 4.8,
    reviews: 256,
    routes: 5,
    vessels: 8,
    verified: true,
    description: "Especialistas en rutas costeras y transporte rápido entre comunidades del Valle.",
    specialties: ["Rutas cortas", "Alta frecuencia", "Turismo"],
  },
  {
    id: "op-3",
    slug: "navegantes-del-choco",
    name: "Navegantes del Chocó",
    logo: "NC",
    rating: 4.7,
    reviews: 189,
    routes: 6,
    vessels: 10,
    verified: true,
    description: "Expertos en navegación hacia destinos del Chocó, incluyendo avistamiento de ballenas.",
    specialties: ["Ecoturismo", "Ballenas", "Naturaleza"],
  },
  {
    id: "op-4",
    slug: "costa-sur-express",
    name: "Costa Sur Express",
    logo: "CS",
    rating: 4.6,
    reviews: 145,
    routes: 4,
    vessels: 6,
    verified: true,
    description: "Conexión directa con las comunidades de Cauca y Nariño por vía marítima.",
    specialties: ["Nariño", "Cauca", "Comunidades"],
  },
]

export function OperatorsSection() {
  return (
    <section id="operadores" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            <Ship className="w-4 h-4" />
            Operadores
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Operadores Verificados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Trabajamos con los mejores operadores de transporte marítimo de la región, 
            todos verificados y comprometidos con la seguridad.
          </p>
        </div>

        {/* Operators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {operators.map((operator) => (
            <article
              key={operator.id}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">{operator.logo}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {operator.name}
                    </h3>
                    {operator.verified && (
                      <Shield className="w-4 h-4 text-secondary flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="text-sm font-medium text-foreground">{operator.rating}</span>
                      <span className="text-xs text-muted-foreground">({operator.reviews})</span>
                    </div>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-sm text-muted-foreground">{operator.routes} rutas</span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-sm text-muted-foreground">{operator.vessels} embarcaciones</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {operator.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {operator.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/operadores/${operator.id}`}>Ver Perfil</Link>
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                      <Link href={`/buscar?operador=${encodeURIComponent(operator.name)}`}>Ver Rutas</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA for Operators */}
        <div className="mt-12 bg-card rounded-2xl border border-border p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            ¿Eres operador de transporte marítimo?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Únete a PACIFICCONNECT para gestionar tus reservas, organizar pasajeros
            y mejorar la eficiencia de tu servicio.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
            <Link href="/registro-empresa">
              Registrar mi Empresa
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
