import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Error de Autenticación | PacificConnect",
  description: "Ha ocurrido un error durante el proceso de autenticación.",
}

export default function AuthErrorPage() {
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

        {/* Error Icon */}
        <div className="w-20 h-20 rounded-full bg-destructive/15 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">
          Error de autenticación
        </h1>
        
        <p className="text-muted-foreground mb-6 text-pretty">
          Ha ocurrido un error durante el proceso de autenticación. 
          Esto puede deberse a un enlace expirado o inválido.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/iniciar-sesion">
              <RefreshCw className="w-4 h-4 mr-2" />
              Intentar de nuevo
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="w-full">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
