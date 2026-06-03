import { Metadata } from "next"
import { AboutSection } from "@/components/about-section"

export const metadata: Metadata = {
  title: "Nosotros | PacificConnect",
  description: "Conoce la misión, visión y objetivos de PacificConnect. Conectando el Pacífico colombiano por vía marítima.",
}

export default function NosotrosPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Nosotros
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Estamos Unidos - Conectando comunidades del Pacífico colombiano
          </p>
        </div>
      </section>

      <AboutSection />
    </>
  )
}
