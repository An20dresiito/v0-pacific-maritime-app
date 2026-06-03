"use client"

import { useState, useTransition, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  User, Mail, Phone, Anchor, MapPin, Calendar, Edit2, 
  Save, X, Loader2, CheckCircle, Ship, Waves, LogOut,
  AlertCircle, ArrowLeft, Ticket, Clock, QrCode, AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateProfile, signOut } from "@/lib/actions/auth"
import { getMisReservas, cancelarReserva } from "@/lib/actions/reservas"
import type { User as SupabaseUser } from "@supabase/supabase-js"

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

interface Profile {
  id: string
  nombre_completo: string | null
  telefono: string | null
  puerto_frecuente: string | null
  avatar_url: string | null
  creado_en: string
  updated_at: string
}

interface Reserva {
  id: string
  codigo: string
  asientos: number
  asientos_seleccionados: string[] | null
  precio_total: number
  estado: string
  created_at: string
  viaje: {
    origen: string
    destino: string
    fecha: string
    hora_salida: string
    hora_llegada: string
    nombre_embarcacion: string
    tipo_embarcacion: string
  }
}

interface ProfileClientProps {
  user: SupabaseUser
  profile: Profile | null
}

export function ProfileClient({ user, profile }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState<"perfil" | "viajes">("perfil")
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [puerto, setPuerto] = useState(profile?.puerto_frecuente || "")
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [loadingReservas, setLoadingReservas] = useState(false)

  const memberSince = user.created_at 
    ? new Date(user.created_at).toLocaleDateString("es-CO", { 
        year: "numeric", 
        month: "long" 
      })
    : "Desconocido"

  // Load reservas when tab changes
  useEffect(() => {
    if (activeTab === "viajes" && reservas.length === 0) {
      loadReservas()
    }
  }, [activeTab])

  async function loadReservas() {
    setLoadingReservas(true)
    const result = await getMisReservas()
    if (result.reservas) {
      setReservas(result.reservas as Reserva[])
    }
    setLoadingReservas(false)
  }

  async function handleCancelar(reservaId: string) {
    if (!confirm("¿Estás seguro de que deseas cancelar esta reserva?")) return
    
    startTransition(async () => {
      const result = await cancelarReserva(reservaId)
      if (result.error) {
        alert(result.error)
      } else {
        loadReservas()
      }
    })
  }

  async function handleUpdate(formData: FormData) {
    setError(null)
    setSuccess(false)
    
    if (puerto) {
      formData.set("puerto_frecuente", puerto)
    }

    startTransition(async () => {
      const result = await updateProfile(formData)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setSuccess(true)
        setIsEditing(false)
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }

  async function handleSignOut() {
    startTransition(async () => {
      await signOut()
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/pacificconnect-logo.png"
              alt="PacificConnect"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
            <span className="font-bold text-primary hidden sm:block">PacificConnect</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/reserva">
                <Ship className="w-4 h-4 mr-2" />
                Reservar
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSignOut}
              disabled={isPending}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-2 p-3 mb-6 bg-secondary/10 border border-secondary/20 rounded-lg text-sm text-secondary">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Perfil actualizado correctamente</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 mb-6 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Cover */}
              <div className="h-24 bg-gradient-to-r from-primary to-secondary relative">
                <Waves className="absolute bottom-2 right-4 w-16 h-16 text-white/20" />
              </div>
              
              {/* Avatar & Name */}
              <div className="px-6 pb-6">
                <div className="relative -mt-12 mb-4">
                  <div className="w-24 h-24 rounded-full bg-card border-4 border-card flex items-center justify-center overflow-hidden">
                    {profile?.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt={profile.nombre_completo || "Avatar"}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                    )}
                  </div>
                </div>

                <h1 className="text-xl font-bold text-foreground mb-1">
                  {profile?.nombre_completo || "Viajero"}
                </h1>
                <p className="text-sm text-muted-foreground mb-4">{user.email}</p>

                {/* Quick Stats */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Puerto frecuente</p>
                      <p className="font-medium text-foreground">
                        {profile?.puerto_origen || "No definido"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Miembro desde</p>
                      <p className="font-medium text-foreground">{memberSince}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspirational Message */}
            <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-xl">
              <p className="text-sm text-foreground italic text-center">
                &ldquo;El mar no te pide permiso para enamorarte&rdquo;
              </p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                - Sabiduría del Pacífico
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Información personal</h2>
                  <p className="text-sm text-muted-foreground">
                    Actualiza tus datos de viajero
                  </p>
                </div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false)
                      setError(null)
                      setPuerto(profile?.puerto_origen || "")
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                )}
              </div>

              <form action={handleUpdate} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Nombre */}
                  <div className="space-y-2">
                    <Label htmlFor="nombre_completo" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Nombre completo
                    </Label>
                    {isEditing ? (
                      <Input
                        id="nombre_completo"
                        name="nombre_completo"
                        defaultValue={profile?.nombre_completo || ""}
                        placeholder="Tu nombre completo"
                        required
                        disabled={isPending}
                        className="h-11"
                      />
                    ) : (
                      <p className="h-11 px-3 flex items-center text-foreground bg-muted/50 rounded-lg">
                        {profile?.nombre_completo || "No definido"}
                      </p>
                    )}
                  </div>

                  {/* Correo (solo lectura) */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Correo electrónico
                    </Label>
                    <p className="h-11 px-3 flex items-center text-muted-foreground bg-muted/50 rounded-lg">
                      {user.email}
                    </p>
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Teléfono
                    </Label>
                    {isEditing ? (
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        defaultValue={profile?.telefono || ""}
                        placeholder="3001234567"
                        required
                        disabled={isPending}
                        className="h-11"
                      />
                    ) : (
                      <p className="h-11 px-3 flex items-center text-foreground bg-muted/50 rounded-lg">
                        {profile?.telefono || "No definido"}
                      </p>
                    )}
                  </div>

                  {/* Puerto de origen */}
                  <div className="space-y-2">
                    <Label htmlFor="puerto_origen" className="flex items-center gap-2">
                      <Anchor className="w-4 h-4 text-muted-foreground" />
                      Puerto de origen frecuente
                    </Label>
                    {isEditing ? (
                      <Select 
                        value={puerto} 
                        onValueChange={setPuerto} 
                        required 
                        disabled={isPending}
                      >
                        <SelectTrigger className="h-11">
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
                    ) : (
                      <p className="h-11 px-3 flex items-center text-foreground bg-muted/50 rounded-lg">
                        {profile?.puerto_origen || "No definido"}
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-4 border-t border-border">
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Guardar cambios
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link 
                href="/reserva"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Ship className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Nueva reserva</p>
                  <p className="text-sm text-muted-foreground">Reserva tu próximo viaje</p>
                </div>
              </Link>

              <Link 
                href="/#rutas"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-secondary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Explorar rutas</p>
                  <p className="text-sm text-muted-foreground">Descubre nuevos destinos</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
