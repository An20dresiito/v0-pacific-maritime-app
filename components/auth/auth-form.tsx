"use client"

import { useState, useTransition, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowLeft, Phone, Anchor, AlertCircle } from "lucide-react"
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

// Maps the field name returned by the server to the input ref that should receive focus
type FieldName = "nombre_completo" | "telefono" | "email" | "password"

export function AuthForm({ mode }: { mode: AuthMode }) {
  const isLogin = mode === "login"
  const router = useRouter()

  // --- Controlled field state ---
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [puerto, setPuerto] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [errorField, setErrorField] = useState<string | null>(null)

  // --- Refs for focus management ---
  const nombreRef = useRef<HTMLInputElement>(null)
  const telefonoRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const fieldRefs: Record<FieldName, React.RefObject<HTMLInputElement | null>> = {
    nombre_completo: nombreRef,
    telefono: telefonoRef,
    email: emailRef,
    password: passwordRef,
  }

  // Focus the errored field whenever errorField changes
  useEffect(() => {
    if (!errorField) return
    const ref = fieldRefs[errorField as FieldName]
    if (ref?.current) {
      ref.current.focus()
    }
  }, [errorField])

  function handleSubmit(formData: FormData) {
    setError(null)
    setErrorField(null)

    if (!isLogin) {
      formData.set("nombre_completo", nombre)
      formData.set("telefono", telefono)
      formData.set("puerto_frecuente", puerto)
    }
    formData.set("email", email)
    formData.set("password", password)

    startTransition(async () => {
      const result = isLogin ? await signIn(formData) : await signUp(formData)

      // Si no hay error, la Server Action hace redirect. 
      // Pero si por alguna razón no lo hace, forzamos la navegación del lado cliente.
      if (!result?.error) {
        router.push("/perfil")
        return
      }

      const field = (result as { error: string; field?: string | null }).field ?? null

      setError(result.error)
      setErrorField(field)

      // Clear ONLY the field with the error
      if (field === "password") {
        setPassword("")
      } else if (field === "email") {
        setEmail("")
      } else if (field === "telefono") {
        setTelefono("")
      } else if (field === "nombre_completo") {
        setNombre("")
      }
      // puerto_frecuente is a Select — keep value so user just re-confirms, don't clear
    })
  }

  const hasFieldError = (field: string) => errorField === field

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
        <div className="flex items-start gap-2 p-3 mb-5 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form action={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            {/* Nombre completo */}
            <div className="space-y-1.5">
              <Label htmlFor="nombre_completo">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={nombreRef}
                  id="nombre_completo"
                  name="nombre_completo"
                  type="text"
                  placeholder="Tu nombre completo"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={`pl-10 h-11 ${hasFieldError("nombre_completo") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                  disabled={isPending}
                  aria-invalid={hasFieldError("nombre_completo")}
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-1.5">
              <Label htmlFor="telefono">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={telefonoRef}
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="3001234567"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className={`pl-10 h-11 ${hasFieldError("telefono") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                  disabled={isPending}
                  aria-invalid={hasFieldError("telefono")}
                />
              </div>
              <p className="text-xs text-muted-foreground">Formato: 10 dígitos (ej: 3001234567)</p>
            </div>

            {/* Puerto */}
            <div className="space-y-1.5">
              <Label htmlFor="puerto_frecuente">Puerto de origen frecuente</Label>
              <div className="relative">
                <Anchor className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Select
                  value={puerto}
                  onValueChange={setPuerto}
                  required
                  disabled={isPending}
                >
                  <SelectTrigger
                    className={`pl-10 h-11 ${hasFieldError("puerto_frecuente") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                    aria-invalid={hasFieldError("puerto_frecuente")}
                  >
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

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 h-11 ${hasFieldError("email") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
              disabled={isPending}
              aria-invalid={hasFieldError("email")}
            />
          </div>
        </div>

        {/* Contraseña */}
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
              ref={passwordRef}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 pr-10 h-11 ${hasFieldError("password") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
              disabled={isPending}
              aria-invalid={hasFieldError("password")}
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
