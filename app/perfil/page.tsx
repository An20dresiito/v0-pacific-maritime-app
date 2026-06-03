import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { getProfile } from "@/lib/actions/auth"
import { ProfileClient } from "@/components/perfil/profile-client"

export const metadata: Metadata = {
  title: "Mi Perfil | PacificConnect",
  description: "Administra tu perfil de viajero en PacificConnect",
}

export default async function PerfilPage() {
  const data = await getProfile()

  if (!data) {
    redirect("/iniciar-sesion")
  }

  return <ProfileClient user={data.user} profile={data.profile} />
}
