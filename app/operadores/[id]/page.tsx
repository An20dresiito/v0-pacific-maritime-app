import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { OperatorDetailClient } from "@/components/operators/operator-detail-client"

export const metadata: Metadata = {
  title: "Operador | PacificConnect",
  description: "Detalles del operador marítimo y sus rutas disponibles.",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function OperadorDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Get empresa by ID
  const { data: empresa, error } = await supabase
    .from("empresas")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !empresa) {
    notFound()
  }

  // Get embarcaciones
  const { data: embarcaciones } = await supabase
    .from("embarcaciones")
    .select("*")
    .eq("empresa_id", empresa.id)
    .eq("activa", true)

  // Get viajes with active status
  const { data: viajes } = await supabase
    .from("viajes")
    .select("*")
    .eq("empresa_id", empresa.id)
    .eq("activo", true)
    .order("fecha", { ascending: true })

  // Get stats
  const { data: reservas } = await supabase
    .from("reservas")
    .select(`
      id,
      precio_total,
      viaje_id,
      viajes!inner(empresa_id)
    `)
    .eq("viajes.empresa_id", empresa.id)

  const totalReservas = reservas?.length || 0
  const totalIngresos = reservas?.reduce((sum, r) => sum + (r.precio_total || 0), 0) || 0

  return (
    <OperatorDetailClient
      empresa={empresa}
      embarcaciones={embarcaciones || []}
      viajes={viajes || []}
      stats={{
        totalReservas,
        totalIngresos,
      }}
    />
  )
}
