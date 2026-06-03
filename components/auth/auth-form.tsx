"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle, Phone, Anchor, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { signIn, signUp } from "@/lib/actions/auth"

type AuthMode = "login" | "register"

const PUERTOS = [
  { value: "Buenaventura", label: "Buenaventura" },
  { value: "Guapi", label: "Guapi" },
  { value: "Tumaco", label: "Tumaco" },
  { value: "Nuquí", label: "Nuquí" },
  { value: "Bahía Solano", label: "Bahía Solano" },
  { value: "El Valle", label: "El Valle" },
  { value: "Ladrilleros", label: "Ladrilleros" },
  { value: "La Bocana", label: "La Bocana" },
  { value: "Pianguita", label: "Pianguita" },
]

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [puerto, setPuerto] = useState("")

  const isLogin = mode === "login"

  async function handleSubmit(formData: FormData) {
    setError(null)
    
    if (!isLogin && puerto) {
      formData.set("puerto_frecuente", puerto)
    }

    startTransition(async () => {
      const result = isLogin ? await signIn(formData) : await signUp(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="w-full">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al inicio
      </Link>

      {/* Logo */}
      <div className="flex flex-col items-center text-center mb-8">
        <Image
          src="/images/pacificconnect-logo.png"
          alt="PacificConnect"
          width={72}
          height={72}
          className="w-16 h-16 object-contain mb-3"
        />
        <h1 className="text-2xl font-bold text-foreground">
          {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1 text-pretty">
          {isLogin
            ? "Inicia sesión para reservar tus viajes por el Pacífico"
            : "Regístrate y empieza a navegar el Pacífico colombiano"}
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 p-3 mb-6 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Email Form */}
      <form action={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="nombre_completo">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="nombre_completo"
                  name="nombre_completo"
                  type="text"
                  placeholder="Tu nombre completo"
                  required
                  className="pl-10 h-11"
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="telefono">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="3001234567"
                  required
                  className="pl-10 h-11"
                  disabled={isPending}
                />
              </div>
              <p className="text-xs text-muted-foreground">Formato: 10 dígitos (ej: 3001234567)</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="puerto_frecuente">Puerto de origen frecuente</Label>
              <div className="relative">
                <Anchor className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select value={puerto} onValueChange={setPuerto} required disabled={isPending}>
                  <SelectTrigger className="pl-10 h-11">
                    <SelectValue placeholder="Selecciona tu puerto" />
                  </SelectTrigger>
                  <SelectContent>
                    {PUERTOS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              required
              className="pl-10 h-11"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            {isLogin && (
              <Link href="#" className="text-xs text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={8}
              className="pl-10 pr-10 h-11"
              disabled={isPending}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {!isLogin && (
            <p className="text-xs text-muted-foreground">
              Mínimo 8 caracteres, una mayúscula, una minúscula y un número
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {isLogin ? "Iniciando sesión..." : "Creando cuenta..."}
            </>
          ) : isLogin ? (
            "Iniciar sesión"
          ) : (
            "Crear cuenta"
          )}
        </Button>
      </form>

      {/* Switch mode */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
        <Link
          href={isLogin ? "/registro" : "/iniciar-sesion"}
          className="text-primary font-medium hover:underline"
        >
          {isLogin ? "Regístrate" : "Inicia sesión"}
        </Link>
      </p>

      {!isLogin && (
        <p className="text-center text-xs text-muted-foreground mt-4 text-pretty">
          Al registrarte aceptas nuestros{" "}
          <Link href="#" className="underline hover:text-foreground">
            Términos
          </Link>{" "}
          y{" "}
          <Link href="#" className="underline hover:text-foreground">
            Política de Privacidad
          </Link>
        </p>
      )}
    </div>
  )
}
