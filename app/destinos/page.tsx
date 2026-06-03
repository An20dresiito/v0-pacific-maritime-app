import { Metadata } from "next"
import { DestinationsSection } from "@/components/destinations-section"

export const metadata: Metadata = {
  title: "Destinos | PacificConnect",
  description: "Descubre los destinos del Pacífico colombiano: Buenaventura, Nuquí, Guapi, Tumaco, Bahía Solano, Ladrilleros, La Bocana y más.",
}

export default function DestinosPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Destinos del Pacífico
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Explora las playas, manglares y comunidades del Pacífico colombiano
          </p>
        </div>
      </section>

      <DestinationsSection />
    </>
  )
}
