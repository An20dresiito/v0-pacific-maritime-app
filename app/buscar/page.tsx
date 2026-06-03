import { Suspense } from "react"
import { SearchResultsClient } from "@/components/buscar/search-results-client"

export const metadata = {
  title: "Buscar Viajes | PacificConnect",
  description: "Encuentra y reserva tu viaje marítimo en el Pacífico colombiano",
}

export default function BuscarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      }
    >
      <SearchResultsClient />
    </Suspense>
  )
}
