import { Suspense } from "react"
import type { Metadata } from "next"
import { ReservaClient } from "@/components/reserva/reserva-client"

export const metadata: Metadata = {
  title: "Reserva tu Cupo | PacificConnect",
  description:
    "Elige tus asientos, revisa políticas de equipaje, recomendaciones y guías de viaje marítimo para tu travesía por el Pacífico colombiano.",
}

export default function ReservaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ReservaClient />
    </Suspense>
  )
}
