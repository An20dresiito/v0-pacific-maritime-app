import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Mail, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Registro Exitoso | PacificConnect",
  description: "Tu cuenta ha sido creada. Verifica tu correo para continuar.",
}

export default function RegistroExitosoPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/pacificconnect-logo.png"
            alt="PacificConnect"
            width={80}
            height={80}
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-secondary" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">
          ¡Cuenta creada exitosamente!
        </h1>
        
        <div className="bg-muted/50 rounded-xl p-6 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-semibold text-foreground mb-2">
            Verifica tu correo electrónico
          </h2>
          <p className="text-sm text-muted-foreground text-pretty">
            Te hemos enviado un enlace de confirmación a tu correo. 
            Haz clic en el enlace para activar tu cuenta y empezar a reservar 
            tus viajes por el Pacífico colombiano.
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/iniciar-sesion">
              Ir a iniciar sesión
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="w-full">
            <Link href="/">
              Volver al inicio
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6 text-pretty">
          ¿No recibiste el correo? Revisa tu carpeta de spam o{" "}
          <Link href="/registro" className="text-primary hover:underline">
            intenta registrarte de nuevo
          </Link>
        </p>
      </div>
    </div>
  )
}
