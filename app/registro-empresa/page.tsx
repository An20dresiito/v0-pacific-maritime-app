import type { Metadata } from "next"
import { AuthLayout } from "@/components/auth/auth-layout"
import { EmpresaRegistrationForm } from "@/components/auth/empresa-form"

export const metadata: Metadata = {
  title: "Registrar Empresa | PacificConnect",
  description: "Registra tu empresa de transporte marítimo en PacificConnect y conecta con viajeros del Pacífico colombiano.",
}

export default function RegistroEmpresaPage() {
  return (
    <AuthLayout>
      <EmpresaRegistrationForm />
    </AuthLayout>
  )
}
