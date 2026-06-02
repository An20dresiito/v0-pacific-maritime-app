import type { Metadata } from "next"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Iniciar Sesión | PacificConnect",
  description: "Inicia sesión en PacificConnect para reservar tus viajes marítimos por el Pacífico colombiano.",
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm mode="login" />
    </AuthLayout>
  )
}
