"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AuthMode = "login" | "register"

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [provider, setProvider] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const isLogin = mode === "login"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulación de autenticación (requiere backend para producción)
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
      setTimeout(() => router.push("/"), 1500)
    }, 1500)
  }

  const handleProvider = (name: string) => {
    setProvider(name)
    // Simulación de OAuth (requiere configuración de backend para producción)
    setTimeout(() => {
      setProvider(null)
      setSuccess(true)
      setTimeout(() => router.push("/"), 1500)
    }, 1500)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-8">
        <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-secondary" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          {isLogin ? "Sesión iniciada" : "Cuenta creada"}
        </h2>
        <p className="text-sm text-muted-foreground">Redirigiendo al inicio...</p>
      </div>
    )
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

      {/* Social Providers */}
      <div className="space-y-3 mb-6">
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 gap-3 font-medium bg-transparent"
          onClick={() => handleProvider("google")}
          disabled={!!provider || isLoading}
        >
          {provider === "google" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          Continuar con Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 gap-3 font-medium bg-transparent"
          onClick={() => handleProvider("facebook")}
          disabled={!!provider || isLoading}
        >
          {provider === "facebook" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <FacebookIcon />
          )}
          Continuar con Facebook
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground uppercase tracking-wide">o con tu correo</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-1.5">
            <Label htmlFor="name">Nombre completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="pl-10 h-11"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="pl-10 h-11"
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
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
              className="pl-10 pr-10 h-11"
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
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          disabled={isLoading || !!provider}
        >
          {isLoading ? (
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

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"
      />
    </svg>
  )
}
