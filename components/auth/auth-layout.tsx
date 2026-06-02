import { Anchor, ShieldCheck, Ship, MapPin } from "lucide-react"

const highlights = [
  { icon: Ship, text: "Embarcaciones verificadas y seguras" },
  { icon: MapPin, text: "Rutas en Chocó, Valle, Cauca y Nariño" },
  { icon: ShieldCheck, text: "Reserva tu cupo con total confianza" },
]

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex">
      {/* Visual Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1200&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Anchor className="w-6 h-6" />
            <span className="text-lg font-bold">PacificConnect</span>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight text-balance mb-4">
              Conectando el Pacífico colombiano por vía marítima
            </h2>
            <p className="text-primary-foreground/80 text-pretty mb-8 max-w-md">
              Únete a la plataforma que une comunidades, viajeros y operadores en una sola red de transporte marítimo.
            </p>

            <ul className="space-y-4">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-primary-foreground/60">Estamos Unidos · Pacífico Colombiano</p>
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </main>
  )
}
