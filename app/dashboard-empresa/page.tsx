import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getEmpresaByUsuario, getEmbarcacionesByEmpresa, getViajesByEmpresa, getReservasByEmpresa } from "@/lib/actions/empresas"
import { EmpresaDashboardClient } from "@/components/dashboard/empresa-dashboard-client"

export const metadata: Metadata = {
  title: "Dashboard Empresa | PacificConnect",
  description: "Panel de control para empresas de transporte marítimo.",
}

export default async function DashboardEmpresaPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/iniciar-sesion")
  }

  const empresa = await getEmpresaByUsuario(user.id)

  if (!empresa) {
    redirect("/registro-empresa")
  }

  const embarcaciones = await getEmbarcacionesByEmpresa(empresa.id)
  const viajes = await getViajesByEmpresa(empresa.id)
  const reservas = await getReservasByEmpresa(empresa.id)

  return (
    <EmpresaDashboardClient
      empresa={empresa}
      embarcaciones={embarcaciones}
      viajes={viajes}
      reservas={reservas}
    />
  )
}
