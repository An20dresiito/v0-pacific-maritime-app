import { Metadata } from "next"
import { RoutesSection } from "@/components/routes-section"

export const metadata: Metadata = {
  title: "Rutas Marítimas | PacificConnect",
  description: "Explora todas las rutas marítimas del Pacífico colombiano. Conexiones entre Buenaventura, Nuquí, Guapi, Tumaco y más destinos.",
}

export default function RutasPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Rutas Marítimas
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Conectamos los 4 departamentos del Pacífico colombiano con rutas seguras y verificadas
          </p>
        </div>
      </section>

      <RoutesSection />
    </>
  )
}
