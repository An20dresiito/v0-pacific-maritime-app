"use client"

import { useState, useTransition, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Building2, Mail, Lock, User, Eye, EyeOff, Loader as Loader2, ArrowLeft, Phone, FileText, CircleAlert as AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { registrarEmpresa } from "@/lib/actions/empresas"

type FieldName = "nit" | "nombre" | "representante" | "email" | "telefono" | "password"

export function EmpresaRegistrationForm() {
  const router = useRouter()

  const [nit, setNit] = useState("")
  const [nombre, setNombre] = useState("")
  const [representante, setRepresentante] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [errorField, setErrorField] = useState<string | null>(null)

  const nitRef = useRef<HTMLInputElement>(null)
  const nombreRef = useRef<HTMLInputElement>(null)
  const representanteRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const telefonoRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const fieldRefs: Record<FieldName, React.RefObject<HTMLInputElement | null>> = {
    nit: nitRef,
    nombre: nombreRef,
    representante: representanteRef,
    email: emailRef,
    telefono: telefonoRef,
    password: passwordRef,
  }

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

    formData.set("nit", nit)
    formData.set("nombre", nombre)
    formData.set("representante", representante)
    formData.set("email", email)
    formData.set("telefono", telefono)
    formData.set("descripcion", descripcion)
    formData.set("password", password)

    startTransition(async () => {
      const result = await registrarEmpresa(formData)

      if (!result?.error) {
        router.push("/registro-exitoso?tipo=empresa")
        return
      }

      const field = result.field ?? null

      setError(result.error)
      setErrorField(field)

      if (field === "password") {
        setPassword("")
      } else if (field === "email") {
        setEmail("")
      } else if (field === "nit") {
        setNit("")
      }
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
        <h1 className="text-2xl font-bold text-foreground">Registrar Empresa</h1>
        <p className="text-sm text-muted-foreground mt-1 text-pretty">
          Conecta tu flota con viajeros del Pacífico colombiano
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
        {/* NIT */}
        <div className="space-y-1.5">
          <Label htmlFor="nit">NIT (sin dígito de verificación)</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={nitRef}
              id="nit"
              name="nit"
              type="text"
              placeholder="900123456-1"
              required
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              className={`pl-10 h-11 ${hasFieldError("nit") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
              disabled={isPending}
              aria-invalid={hasFieldError("nit")}
            />
          </div>
          <p className="text-xs text-muted-foreground">Formato: número de identificación tributaria</p>
        </div>

        {/* Nombre de la empresa */}
        <div className="space-y-1.5">
          <Label htmlFor="nombre">Nombre de la empresa</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={nombreRef}
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Transportes del Pacífico S.A.S."
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={`pl-10 h-11 ${hasFieldError("nombre") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
              disabled={isPending}
              aria-invalid={hasFieldError("nombre")}
            />
          </div>
        </div>

        {/* Representante legal */}
        <div className="space-y-1.5">
          <Label htmlFor="representante">Representante legal</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={representanteRef}
              id="representante"
              name="representante"
              type="text"
              placeholder="Nombre completo del representante"
              required
              value={representante}
              onChange={(e) => setRepresentante(e.target.value)}
              className={`pl-10 h-11 ${hasFieldError("representante") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
              disabled={isPending}
              aria-invalid={hasFieldError("representante")}
            />
          </div>
        </div>

        {/* Correo electrónico */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Correo electrónico de la empresa</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              placeholder="contacto@empresa.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 h-11 ${hasFieldError("email") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
              disabled={isPending}
              aria-invalid={hasFieldError("email")}
            />
          </div>
        </div>

        {/* Teléfono */}
        <div className="space-y-1.5">
          <Label htmlFor="telefono">Teléfono de contacto (opcional)</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={telefonoRef}
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="3001234567"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className={`pl-10 h-11 ${hasFieldError("telefono") ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
              disabled={isPending}
              aria-invalid={hasFieldError("telefono")}
            />
          </div>
          <p className="text-xs text-muted-foreground">10 dígitos (ej: 3001234567)</p>
        </div>

        {/* Descripción */}
        <div className="space-y-1.5">
          <Label htmlFor="descripcion">Descripción de la empresa (opcional)</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Textarea
              id="descripcion"
              name="descripcion"
              placeholder="Describe brevemente tu empresa y los servicios que ofreces..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className={`pl-10 min-h-[80px] resize-none ${hasFieldError("descripcion") ? "border-destructive" : ""}`}
              disabled={isPending}
              rows={3}
            />
          </div>
        </div>

        {/* Contraseña */}
        <div className="space-y-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={passwordRef}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Crea una contraseña segura"
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
          <p className="text-xs text-muted-foreground">
            Mínimo 8 caracteres, una mayúscula, una minúscula y un número
          </p>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Registrando empresa...
            </>
          ) : (
            "Registrar Empresa"
          )}
        </Button>
      </form>

      {/* Link to login */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/iniciar-sesion" className="text-primary font-medium hover:underline">
          Inicia sesión
        </Link>
      </p>

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
    </div>
  )
}
