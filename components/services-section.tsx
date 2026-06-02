"use client"

import { 
  Smartphone, 
  Shield, 
  Clock, 
  Users, 
  Luggage, 
  Globe,
  CreditCard,
  Bell
} from "lucide-react"

const services = [
  {
    icon: Smartphone,
    title: "Reserva Digital",
    description: "Asegura tu cupo desde cualquier lugar sin necesidad de desplazarte físicamente al muelle.",
  },
  {
    icon: Clock,
    title: "Tiempo Real",
    description: "Consulta disponibilidad, horarios y estado de las embarcaciones en tiempo real.",
  },
  {
    icon: Shield,
    title: "Embarcaciones Verificadas",
    description: "Todas las lanchas están verificadas y cumplen con los estándares de seguridad marítima.",
  },
  {
    icon: Users,
    title: "Gestión de Pasajeros",
    description: "Organiza grupos, familias o viajes individuales con facilidad desde la plataforma.",
  },
  {
    icon: Luggage,
    title: "Control de Equipaje",
    description: "Gestiona tu equipaje y carga con anticipación para un embarque más eficiente.",
  },
  {
    icon: Globe,
    title: "Multilenguaje",
    description: "Interfaz disponible en español, inglés, francés y portugués para turistas internacionales.",
  },
  {
    icon: CreditCard,
    title: "Pago Seguro",
    description: "Múltiples métodos de pago con transacciones seguras y confirmación inmediata.",
  },
  {
    icon: Bell,
    title: "Notificaciones",
    description: "Recibe alertas sobre cambios en horarios, condiciones climáticas y tu reserva.",
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            <Smartphone className="w-4 h-4" />
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Tecnología al Servicio del Viajero
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            PACIFICCONNECT digitaliza y optimiza el sistema de transporte marítimo 
            para ofrecer una experiencia moderna, segura y accesible.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
