"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Ship, Route, Calendar, Users, Plus, Loader as Loader2, Building2, BadgeCheck, Settings, Eye, CreditCard as Edit, Trash2, MapPin, Clock, DollarSign, CircleAlert as AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { crearEmbarcacion, crearViaje } from "@/lib/actions/empresas"
import { useRouter } from "next/navigation"

type Embarcacion = {
  id: string
  nombre: string
  tipo: string
  capacidad: number
  velocidad: string | null
  motor: string | null
  certificada: boolean
  activa: boolean
}

type Viaje = {
  id: string
  origen: string
  destino: string
  fecha: string
  hora_salida: string
  hora_llegada: string
  nombre_embarcacion: string
  precio: number
  cupos_disponibles: number
  cupos_totales: number
  paradas: string[]
}

type Reserva = {
  id: string
  codigo: string
  asientos: number
  precio_total: number
  estado: string
  created_at: string
  viajes: {
    origen: string
    destino: string
    fecha: string
    hora_salida: string
    nombre_embarcacion: string
  } | null
  perfiles: {
    nombre_completo: string
    telefono: string | null
  } | null
}

type Empresa = {
  id: string
  nit: string
  nombre: string
  representante: string
  email: string
  telefono: string | null
  descripcion: string | null
  logo_url: string | null
  verificada: boolean
  activa: boolean
}

const TIPOS_EMBARCACION = [
  { value: "lancha-rapida", label: "Lancha Rápida" },
  { value: "ferry", label: "Ferry" },
  { value: "lancha-local", label: "Lancha Local" },
  { value: "panga", label: "Panga" },
]

const PUERTOS = [
  "Buenaventura",
  "Guapi",
  "Tumaco",
  "Nuquí",
  "Bahía Solano",
  "El Valle",
  "Ladrilleros",
  "La Bocana",
  "Pianguita",
  "Isla Gorgona",
  "La Tola",
  "Mosquera",
  "Iscuandé",
  "López de Micay",
  "Juradó",
  "Pizarro",
]

export function EmpresaDashboardClient({
  empresa,
  embarcaciones,
  viajes,
  reservas,
}: {
  empresa: Empresa
  embarcaciones: Embarcacion[]
  viajes: Viaje[]
  reservas: Reserva[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Vessel form state
  const [vesselDialogOpen, setVesselDialogOpen] = useState(false)
  const [vesselNombre, setVesselNombre] = useState("")
  const [vesselTipo, setVesselTipo] = useState("")
  const [vesselCapacidad, setVesselCapacidad] = useState("")
  const [vesselVelocidad, setVesselVelocidad] = useState("")
  const [vesselMotor, setVesselMotor] = useState("")

  // Trip form state
  const [tripDialogOpen, setTripDialogOpen] = useState(false)
  const [tripOrigen, setTripOrigen] = useState("")
  const [tripDestino, setTripDestino] = useState("")
  const [tripFecha, setTripFecha] = useState("")
  const [tripHoraSalida, setTripHoraSalida] = useState("")
  const [tripHoraLlegada, setTripHoraLlegada] = useState("")
  const [tripEmbarcacion, setTripEmbarcacion] = useState("")
  const [tripPrecio, setTripPrecio] = useState("")
  const [tripCupos, setTripCupos] = useState("")
  const [tripParadas, setTripParadas] = useState("")

  async function handleCreateVessel() {
    setError(null)
    setSuccess(null)

    if (!vesselNombre || !vesselTipo || !vesselCapacidad) {
      setError("Por favor completa todos los campos obligatorios")
      return
    }

    const formData = new FormData()
    formData.set("nombre", vesselNombre)
    formData.set("tipo", vesselTipo)
    formData.set("capacidad", vesselCapacidad)
    formData.set("velocidad", vesselVelocidad)
    formData.set("motor", vesselMotor)

    startTransition(async () => {
      const result = await crearEmbarcacion(formData)
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess("Embarcación creada exitosamente")
        setVesselDialogOpen(false)
        // Reset form
        setVesselNombre("")
        setVesselTipo("")
        setVesselCapacidad("")
        setVesselVelocidad("")
        setVesselMotor("")
        router.refresh()
      }
    })
  }

  async function handleCreateTrip() {
    setError(null)
    setSuccess(null)

    if (!tripOrigen || !tripDestino || !tripFecha || !tripHoraSalida || !tripHoraLlegada || !tripEmbarcacion || !tripPrecio || !tripCupos) {
      setError("Por favor completa todos los campos obligatorios")
      return
    }

    const formData = new FormData()
    formData.set("origen", tripOrigen)
    formData.set("destino", tripDestino)
    formData.set("fecha", tripFecha)
    formData.set("hora_salida", tripHoraSalida)
    formData.set("hora_llegada", tripHoraLlegada)
    formData.set("embarcacion_id", tripEmbarcacion)
    formData.set("precio", tripPrecio)
    formData.set("cupos_totales", tripCupos)
    formData.set("paradas", tripParadas)

    startTransition(async () => {
      const result = await crearViaje(formData)
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess("Viaje creado exitosamente")
        setTripDialogOpen(false)
        // Reset form
        setTripOrigen("")
        setTripDestino("")
        setTripFecha("")
        setTripHoraSalida("")
        setTripHoraLlegada("")
        setTripEmbarcacion("")
        setTripPrecio("")
        setTripCupos("")
        setTripParadas("")
        router.refresh()
      }
    })
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">{empresa.nombre}</h1>
                {empresa.verificada && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    <BadgeCheck className="w-3 h-3 mr-1" />
                    Verificada
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">NIT: {empresa.nit}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/perfil">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Ship className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{embarcaciones.length}</p>
                  <p className="text-xs text-muted-foreground">Embarcaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Route className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{viajes.length}</p>
                  <p className="text-xs text-muted-foreground">Viajes activos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{reservas.length}</p>
                  <p className="text-xs text-muted-foreground">Reservas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(reservas.reduce((sum, r) => sum + (r.precio_total || 0), 0))}
                  </p>
                  <p className="text-xs text-muted-foreground">Ingresos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-green-100 border border-green-200 rounded-lg text-sm text-green-700">
            <BadgeCheck className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="embarcaciones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="embarcaciones" className="gap-2">
              <Ship className="w-4 h-4" />
              Embarcaciones
            </TabsTrigger>
            <TabsTrigger value="viajes" className="gap-2">
              <Route className="w-4 h-4" />
              Viajes
            </TabsTrigger>
            <TabsTrigger value="reservas" className="gap-2">
              <Users className="w-4 h-4" />
              Reservas
            </TabsTrigger>
          </TabsList>

          {/* Embarcaciones Tab */}
          <TabsContent value="embarcaciones">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Embarcaciones</CardTitle>
                  <CardDescription>Gestiona tu flota de embarcaciones</CardDescription>
                </div>
                <Dialog open={vesselDialogOpen} onOpenChange={setVesselDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva Embarcación
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registrar Embarcación</DialogTitle>
                      <DialogDescription>
                        Añade una nueva embarcación a tu flota
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="vessel-nombre">Nombre</Label>
                        <Input
                          id="vessel-nombre"
                          placeholder="Mi Lancha"
                          value={vesselNombre}
                          onChange={(e) => setVesselNombre(e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="vessel-tipo">Tipo</Label>
                        <Select value={vesselTipo} onValueChange={setVesselTipo}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIPOS_EMBARCACION.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="vessel-capacidad">Capacidad (pasajeros)</Label>
                        <Input
                          id="vessel-capacidad"
                          type="number"
                          placeholder="20"
                          value={vesselCapacidad}
                          onChange={(e) => setVesselCapacidad(e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="vessel-velocidad">Velocidad (opcional)</Label>
                        <Input
                          id="vessel-velocidad"
                          placeholder="25 nudos"
                          value={vesselVelocidad}
                          onChange={(e) => setVesselVelocidad(e.target.value)}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="vessel-motor">Motor (opcional)</Label>
                        <Input
                          id="vessel-motor"
                          placeholder="Yamaha 200HP"
                          value={vesselMotor}
                          onChange={(e) => setVesselMotor(e.target.value)}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setVesselDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateVessel} disabled={isPending}>
                        {isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creando...
                          </>
                        ) : (
                          "Crear Embarcación"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {embarcaciones.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Ship className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No tienes embarcaciones registradas</p>
                    <p className="text-sm">Registra tu primera embarcación para empezar</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {embarcaciones.map((emb) => (
                      <div
                        key={emb.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Ship className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{emb.nombre}</p>
                            <p className="text-sm text-muted-foreground">
                              {TIPOS_EMBARCACION.find((t) => t.value === emb.tipo)?.label} · {emb.capacidad} pasajeros
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {emb.certificada && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <BadgeCheck className="w-3 h-3 mr-1" />
                              Certificada
                            </Badge>
                          )}
                          <Badge variant="secondary">
                            <Users className="w-3 h-3 mr-1" />
                            {emb.capacidad}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Viajes Tab */}
          <TabsContent value="viajes">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Viajes</CardTitle>
                  <CardDescription>Gestiona los viajes programados</CardDescription>
                </div>
                <Dialog open={tripDialogOpen} onOpenChange={setTripDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" disabled={embarcaciones.length === 0}>
                      <Plus className="w-4 h-4 mr-2" />
                      Nuevo Viaje
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Programar Viaje</DialogTitle>
                      <DialogDescription>Crea un nuevo viaje en tu ruta</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="trip-origen">Origen</Label>
                          <Select value={tripOrigen} onValueChange={setTripOrigen}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona origen" />
                            </SelectTrigger>
                            <SelectContent>
                              {PUERTOS.map((p) => (
                                <SelectItem key={p} value={p}>
                                  {p}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="trip-destino">Destino</Label>
                          <Select value={tripDestino} onValueChange={setTripDestino}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona destino" />
                            </SelectTrigger>
                            <SelectContent>
                              {PUERTOS.filter((p) => p !== tripOrigen).map((p) => (
                                <SelectItem key={p} value={p}>
                                  {p}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="trip-fecha">Fecha</Label>
                        <Input
                          id="trip-fecha"
                          type="date"
                          value={tripFecha}
                          onChange={(e) => setTripFecha(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="trip-salida">Hora salida</Label>
                          <Input
                            id="trip-salida"
                            type="time"
                            value={tripHoraSalida}
                            onChange={(e) => setTripHoraSalida(e.target.value)}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="trip-llegada">Hora llegada</Label>
                          <Input
                            id="trip-llegada"
                            type="time"
                            value={tripHoraLlegada}
                            onChange={(e) => setTripHoraLlegada(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="trip-embarcacion">Embarcación</Label>
                        <Select value={tripEmbarcacion} onValueChange={setTripEmbarcacion}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona embarcación" />
                          </SelectTrigger>
                          <SelectContent>
                            {embarcaciones.map((emb) => (
                              <SelectItem key={emb.id} value={emb.id}>
                                {emb.nombre} ({emb.capacidad} pasajeros)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="trip-precio">Precio por pasaje (COP)</Label>
                          <Input
                            id="trip-precio"
                            type="number"
                            placeholder="50000"
                            value={tripPrecio}
                            onChange={(e) => setTripPrecio(e.target.value)}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="trip-cupos">Cupos totales</Label>
                          <Input
                            id="trip-cupos"
                            type="number"
                            placeholder="20"
                            value={tripCupos}
                            onChange={(e) => setTripCupos(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="trip-paradas">Paradas intermedias (opcional)</Label>
                        <Input
                          id="trip-paradas"
                          placeholder="Separadas por coma: Guapi, Isla Gorgona"
                          value={tripParadas}
                          onChange={(e) => setTripParadas(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Lista de puertos intermedios separados por coma
                        </p>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setTripDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreateTrip} disabled={isPending}>
                        {isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creando...
                          </>
                        ) : (
                          "Crear Viaje"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {viajes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Route className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No tienes viajes programados</p>
                    <p className="text-sm">Crea tu primer viaje para empezar a recibir reservas</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {viajes.map((viaje) => (
                      <div
                        key={viaje.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                            <Route className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">
                                {viaje.origen} → {viaje.destino}
                              </p>
                              {viaje.paradas.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  +{viaje.paradas.length} paradas
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(viaje.fecha)} · {viaje.hora_salida} - {viaje.hora_llegada}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(viaje.precio)}</p>
                            <p className="text-sm text-muted-foreground">
                              {viaje.cupos_disponibles}/{viaje.cupos_totales} cupos
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/viajes/${viaje.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reservas Tab */}
          <TabsContent value="reservas">
            <Card>
              <CardHeader>
                <CardTitle>Reservas</CardTitle>
                <CardDescription>Reservas recibidas en tus viajes</CardDescription>
              </CardHeader>
              <CardContent>
                {reservas.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No tienes reservas aún</p>
                    <p className="text-sm">Las reservas aparecerán aquí cuando los pasajeros reserven tus viajes</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reservas.map((reserva) => (
                      <div
                        key={reserva.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {reserva.perfiles?.nombre_completo || "Pasajero"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {reserva.viajes?.origen} → {reserva.viajes?.destino} · {reserva.viajes && formatDate(reserva.viajes.fecha)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(reserva.precio_total)}</p>
                            <p className="text-sm text-muted-foreground">
                              {reserva.asientos} asiento{reserva.asientos > 1 ? "s" : ""}
                            </p>
                          </div>
                          <Badge
                            variant={
                              reserva.estado === "confirmada"
                                ? "default"
                                : reserva.estado === "completada"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {reserva.estado}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
