"use client"

import { Award, Leaf, Heart, Shield, Users, Anchor } from "lucide-react"
import { Button } from "@/components/ui/button"

const values = [
  {
    icon: Leaf,
    title: "Sostenibilidad",
    description: "Comprometidos con la conservación del ecosistema marino y las comunidades locales.",
  },
  {
    icon: Shield,
    title: "Seguridad",
    description: "Embarcaciones certificadas, tripulación capacitada y protocolos estrictos en cada viaje.",
  },
  {
    icon: Heart,
    title: "Pasión",
    description: "Amamos el Pacífico colombiano y queremos compartir su magia contigo.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description: "Trabajamos de la mano con las comunidades costeras para un turismo responsable.",
  },
]

const certifications = [
  { name: "RNT Certificado", icon: Award },
  { name: "Turismo Sostenible", icon: Leaf },
  { name: "Seguridad Marítima", icon: Shield },
]

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop"
                    alt="Ballena jorobada"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop"
                    alt="Playa del Pacífico"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1545579133-99bb5ab189bd?q=80&w=800&auto=format&fit=crop"
                    alt="Manglares"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=800&auto=format&fit=crop"
                    alt="Comunidad local"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <Anchor className="w-10 h-10" />
                <div>
                  <div className="text-3xl font-bold">10+</div>
                  <div className="text-sm opacity-90">Años de experiencia</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Nuestra Historia
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Navegando con Propósito
            </h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nacimos en Buenaventura con un sueño: conectar a los viajeros con la magia 
              inexplorada del Pacífico colombiano. Lo que comenzó como una pequeña lancha 
              familiar, hoy es la red de transporte marítimo turístico más confiable de la región.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Creemos en un turismo que beneficia a todos: viajeros que descubren paraísos, 
              comunidades que prosperan y un océano que seguimos protegiendo. Cada viaje 
              con nosotros es una inversión en el futuro del Pacífico.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((value) => (
                <div key={value.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {value.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-4 mb-8">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2"
                >
                  <cert.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{cert.name}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Conoce Nuestra Historia Completa
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
