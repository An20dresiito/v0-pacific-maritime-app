import type { Metadata } from "next"
import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Crear Cuenta | PacificConnect",
  description: "Regístrate en PacificConnect y empieza a navegar el Pacífico colombiano con embarcaciones verificadas.",
}

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthForm mode="register" />
    </AuthLayout>
  )
}
