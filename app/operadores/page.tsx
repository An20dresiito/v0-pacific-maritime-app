import { Metadata } from "next"
import { OperatorsSection } from "@/components/operators-section"

export const metadata: Metadata = {
  title: "Operadores Marítimos | PacificConnect",
  description: "Conoce las agencias marítimas verificadas que operan en el Pacífico colombiano. Transporte seguro y confiable.",
}

export default function OperadoresPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Operadores Marítimos
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Agencias verificadas y certificadas para tu seguridad en el mar
          </p>
        </div>
      </section>

      <OperatorsSection />
    </>
  )
}
