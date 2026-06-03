"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Ship,
  Clock,
  MapPin,
  Anchor,
  Wind,
  Luggage,
  Weight,
  CheckCircle,
  AlertTriangle,
  LifeBuoy,
  Compass,
  Plus,
  Minus,
  Info,
  Waves,
  Sun,
  Pill,
  Droplets,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// --- Vessel type configuration (varies seat map + luggage) ---

type VesselTypeKey = "lancha-rapida" | "ferry" | "lancha-local" | "panga"

const vesselConfig: Record<
  VesselTypeKey,
  {
    label: string
    capacity: number
    cols: number
    luggage: { bags: number; weightPerBag: number; carryOn: number; extraFee: number; cargo: boolean }
    tripLength: "corta" | "media" | "larga"
  }
> = {
  "lancha-rapida": {
    label: "Lancha Rápida",
    capacity: 28,
    cols: 4,
    luggage: { bags: 1, weightPerBag: 15, carryOn: 5, extraFee: 25000, cargo: false },
    tripLength: "media",
  },
  ferry: {
    label: "Ferry",
    capacity: 60,
    cols: 5,
    luggage: { bags: 2, weightPerBag: 23, carryOn: 8, extraFee: 20000, cargo: true },
    tripLength: "larga",
  },
  "lancha-local": {
    label: "Lancha Local",
    capacity: 20,
    cols: 4,
    luggage: { bags: 1, weightPerBag: 12, carryOn: 4, extraFee: 15000, cargo: false },
    tripLength: "corta",
  },
  panga: {
    label: "Panga",
    capacity: 12,
    cols: 3,
    luggage: { bags: 1, weightPerBag: 10, carryOn: 3, extraFee: 12000, cargo: false },
    tripLength: "corta",
  },
}

function normalizeType(raw: string): VesselTypeKey {
  const t = raw.toLowerCase()
  if (t.includes("ferry")) return "ferry"
  if (t.includes("local")) return "lancha-local"
  if (t.includes("panga")) return "panga"
  return "lancha-rapida"
}

// --- Travel content (varies by trip length + vessel) ---

const recommendationsByLength: Record<string, string[]> = {
  corta: [
    "Llega al muelle 30 minutos antes de la salida.",
    "Lleva ropa ligera y un cortavientos por la brisa marina.",
    "Aplica protector solar resistente al agua antes de zarpar.",
    "Mantén tu documento de identidad a la mano.",
  ],
  media: [
    "Preséntate en el muelle al menos 45 minutos antes.",
    "Usa ropa cómoda y lleva una muda extra en bolsa impermeable.",
    "Hidrátate bien y lleva agua y snacks para el trayecto.",
    "Si te mareas con facilidad, toma tu pastilla 30 min antes.",
    "Protege tus equipos electrónicos en fundas resistentes al agua.",
  ],
  larga: [
    "Llega al muelle con 1 hora de anticipación para el registro.",
    "Lleva ropa de cambio, abrigo ligero y bloqueador solar.",
    "Empaca agua suficiente, snacks y tus medicamentos personales.",
    "Toma medicación para el mareo antes de embarcar si lo necesitas.",
    "Descansa bien la noche anterior; es una travesía extensa.",
    "Guarda tus documentos y dinero en una bolsa sellada e impermeable.",
  ],
}

const precautionsBase: string[] = [
  "Usa el chaleco salvavidas durante todo el trayecto.",
  "Sigue siempre las instrucciones del capitán y la tripulación.",
  "No te pongas de pie ni cambies de asiento con la embarcación en movimiento.",
  "Identifica la ubicación de los chalecos y salidas de emergencia al abordar.",
]

const precautionsByLength: Record<string, string[]> = {
  corta: ["Sujeta bien tus pertenencias durante el oleaje cercano a la bahía."],
  media: [
    "Mantén las manos y brazos dentro de la embarcación.",
    "Evita consumir alcohol antes y durante la travesía.",
  ],
  larga: [
    "Reporta cualquier malestar a la tripulación de inmediato.",
    "No te expongas al sol por períodos prolongados en cubierta.",
    "Respeta los puntos de parada y los tiempos de descanso indicados.",
  ],
}

const maritimeGuides: { icon: typeof Compass; title: string; text: string }[] = [
  {
    icon: LifeBuoy,
    title: "Seguridad primero",
    text: "Antes de zarpar, la tripulación hará una breve charla de seguridad. Presta atención a la ubicación de chalecos y aros salvavidas.",
  },
  {
    icon: Waves,
    title: "El oleaje del Pacífico",
    text: "El mar puede agitarse al salir de la bahía. Es normal sentir el vaivén; respira profundo y mira al horizonte si sientes mareo.",
  },
  {
    icon: Sun,
    title: "Clima tropical húmedo",
    text: "El Pacífico colombiano es lluvioso todo el año. Lleva impermeable y protege tus cosas; el sol también puede ser intenso entre lluvias.",
  },
  {
    icon: Pill,
    title: "Prevenir el mareo",
    text: "Si eres propenso al mareo, toma tu medicamento 30 minutos antes. Evita leer durante el trayecto y mantén la vista en un punto fijo.",
  },
  {
    icon: Droplets,
    title: "Hidratación y alimentación",
    text: "Lleva agua y snacks ligeros. Evita comidas pesadas justo antes de viajar para sentirte mejor durante la navegación.",
  },
  {
    icon: Phone,
    title: "Conectividad limitada",
    text: "En alta mar y zonas remotas la señal es escasa. Descarga mapas o información importante antes de salir y avisa a tus contactos.",
  },
]

const sailorMessages: string[] = [
  "¡Buen viento y buena mar, marinero! Tu travesía por el Pacífico está por comenzar.",
  "Iza velas y suelta amarras: el océano te espera con los brazos abiertos.",
  "Que la brújula te guíe y las olas te acompañen. ¡A navegar se ha dicho!",
  "Marea a favor y rumbo firme: hoy el Pacífico es tuyo.",
  "Donde el río se encuentra con el mar, comienza tu aventura. ¡Leva el ancla!",
  "Capitán de tu propio viaje: que la mar esté serena y el horizonte despejado.",
]

// --- Seat generation ---

type Seat = { id: string; col: number; occupied: boolean }

function generateSeats(capacity: number, cols: number): Seat[] {
  const letters = ["A", "B", "C", "D", "E", "F"]
  const seats: Seat[] = []
  let count = 0
  let row = 1
  while (count < capacity) {
    for (let c = 0; c < cols; c++) {
      if (count >= capacity) break
      const occupied = (count * 13 + 7) % 4 === 0
      seats.push({ id: `${row}${letters[c]}`, col: c, occupied })
      count++
    }
    row++
  }
  return seats
}

function formatCOP(n: number) {
  return n.toLocaleString("es-CO")
}

function parsePrice(raw: string): number {
  const digits = raw.replace(/[^\d]/g, "")
  return digits ? Number.parseInt(digits, 10) : 0
}

// --- Main client component ---

export function ReservaClient() {
  const params = useSearchParams()

  const routeName = params.get("route") || "Ruta del Pacífico"
  const from = params.get("from") || "Buenaventura"
  const to = params.get("to") || "Destino Pacífico"
  const vesselName = params.get("vessel") || "Embarcación PacificConnect"
  const typeRaw = params.get("type") || "Lancha Rápida"
  const departure = params.get("departure") || "06:00"
  const arrival = params.get("arrival") || "—"
  const priceRaw = params.get("price") || "180.000"

  const typeKey = normalizeType(typeRaw)
  const config = vesselConfig[typeKey]
  const pricePerSeat = parsePrice(priceRaw)

  const seats = useMemo(() => generateSeats(config.capacity, config.cols), [config])

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [checkedBags, setCheckedBags] = useState(0)

  // Deterministic sailor message based on route name
  const sailorMessage =
    sailorMessages[(routeName.length + vesselName.length) % sailorMessages.length]

  const toggleSeat = (seat: Seat) => {
    if (seat.occupied) return
    setSelectedSeats((prev) =>
      prev.includes(seat.id) ? prev.filter((s) => s !== seat.id) : [...prev, seat.id],
    )
  }

  const passengers = selectedSeats.length
  const includedBags = passengers * config.luggage.bags
  const extraBags = Math.max(0, checkedBags - includedBags)
  const luggageExtraCost = extraBags * config.luggage.extraFee
  const seatsCost = passengers * pricePerSeat
  const total = seatsCost + luggageExtraCost

  const recommendations = [...recommendationsByLength[config.tripLength]]
  const precautions = [...precautionsBase, ...precautionsByLength[config.tripLength]]

  const aisleIndex = Math.floor(config.cols / 2)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Inicio
            </Link>
            <span>/</span>
            <Link href="/embarcaciones" className="hover:text-primary transition-colors">
              Embarcaciones
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Reserva</span>
          </div>

          {/* Trip summary banner */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Badge className="bg-primary-foreground/20 text-primary-foreground mb-2 text-xs">
                  {config.label}
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{routeName}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-primary-foreground/90">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {from} <ArrowRight className="w-3.5 h-3.5" /> {to}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ship className="w-4 h-4" />
                    {vesselName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {departure} {arrival !== "—" && `→ ${arrival}`}
                  </span>
                </div>
              </div>
              <div className="text-left md:text-right shrink-0">
                <div className="text-3xl font-bold">${formatCOP(pricePerSeat)}</div>
                <div className="text-sm text-primary-foreground/80">COP / persona</div>
              </div>
            </div>
          </div>

          {/* Sailor motivational message */}
          <div className="relative overflow-hidden bg-accent/15 border border-accent/30 rounded-2xl p-5 mb-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center shrink-0">
              <Anchor className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-serif font-semibold text-foreground text-balance">
                {sailorMessage}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5" />
                Mensaje de la tripulación de PacificConnect
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: seat map + content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Seat selection */}
              <section className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xl font-bold text-foreground">Elige tus asientos</h2>
                  <span className="text-sm text-muted-foreground">{config.capacity} asientos</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Selecciona libremente cualquier asiento disponible. Puedes elegir tantos como necesites.
                </p>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mb-6 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md border-2 border-border bg-card" />
                    Disponible
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-primary" />
                    Seleccionado
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-muted-foreground/30" />
                    Ocupado
                  </div>
                </div>

                {/* Bow / front indicator */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Compass className="w-4 h-4 text-primary" />
                    Proa (frente de la embarcación)
                  </div>

                  <div className="flex flex-col gap-2">
                    {(() => {
                      const rows: Seat[][] = []
                      for (let i = 0; i < seats.length; i += config.cols) {
                        rows.push(seats.slice(i, i + config.cols))
                      }
                      return rows.map((rowSeats, rIdx) => (
                        <div key={rIdx} className="flex items-center gap-2">
                          {rowSeats.map((seat, cIdx) => (
                            <div key={seat.id} className="flex items-center">
                              {cIdx === aisleIndex && <div className="w-5" aria-hidden />}
                              <button
                                onClick={() => toggleSeat(seat)}
                                disabled={seat.occupied}
                                aria-label={`Asiento ${seat.id}${seat.occupied ? " ocupado" : ""}`}
                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md text-xs font-semibold transition-all flex items-center justify-center ${
                                  seat.occupied
                                    ? "bg-muted-foreground/30 text-muted-foreground cursor-not-allowed"
                                    : selectedSeats.includes(seat.id)
                                      ? "bg-primary text-primary-foreground scale-105 shadow-md"
                                      : "border-2 border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"
                                }`}
                              >
                                {seat.id}
                              </button>
                            </div>
                          ))}
                        </div>
                      ))
                    })()}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                    <Anchor className="w-4 h-4 text-secondary" />
                    Popa (parte trasera)
                  </div>
                </div>
              </section>

              {/* Luggage */}
              <section className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-1">
                  <Luggage className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Equipaje</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Las políticas de equipaje varían según la embarcación. Esta es la asignación para tu{" "}
                  <strong className="text-foreground">{config.label}</strong>.
                </p>

                {/* Allowance grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted/50 rounded-xl p-4">
                    <Luggage className="w-5 h-5 text-primary mb-2" />
                    <div className="text-2xl font-bold text-foreground">{config.luggage.bags}</div>
                    <div className="text-xs text-muted-foreground">maleta(s) incluida(s) por pasajero</div>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <Weight className="w-5 h-5 text-primary mb-2" />
                    <div className="text-2xl font-bold text-foreground">{config.luggage.weightPerBag} kg</div>
                    <div className="text-xs text-muted-foreground">peso máx. por maleta</div>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <Info className="w-5 h-5 text-primary mb-2" />
                    <div className="text-2xl font-bold text-foreground">{config.luggage.carryOn} kg</div>
                    <div className="text-xs text-muted-foreground">equipaje de mano</div>
                  </div>
                </div>

                {config.luggage.cargo && (
                  <div className="flex items-start gap-2 bg-secondary/10 text-secondary rounded-lg px-4 py-3 mb-6 text-sm">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Esta embarcación cuenta con bodega de carga para equipaje voluminoso o mercancía.</span>
                  </div>
                )}

                {/* Bag counter */}
                <div className="border-t border-border pt-5">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <div className="font-semibold text-foreground">Maletas a documentar</div>
                      <div className="text-xs text-muted-foreground">
                        {passengers === 0
                          ? "Selecciona asientos para incluir maletas gratis"
                          : `${includedBags} incluida(s) con tus ${passengers} pasajero(s)`}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCheckedBags((b) => Math.max(0, b - 1))}
                        className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                        disabled={checkedBags === 0}
                        aria-label="Quitar maleta"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-foreground text-lg">{checkedBags}</span>
                      <button
                        onClick={() => setCheckedBags((b) => b + 1)}
                        className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        aria-label="Agregar maleta"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {extraBags > 0 && (
                    <div className="flex items-center gap-2 mt-4 bg-accent/15 text-accent-foreground rounded-lg px-4 py-3 text-sm">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>
                        {extraBags} maleta(s) adicional(es) · cargo de ${formatCOP(config.luggage.extraFee)} c/u ={" "}
                        <strong>${formatCOP(luggageExtraCost)} COP</strong>
                      </span>
                    </div>
                  )}
                </div>
              </section>

              {/* Recommendations & precautions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <section className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <h2 className="text-lg font-bold text-foreground">Recomendaciones</h2>
                  </div>
                  <ul className="space-y-3">
                    {recommendations.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-accent-foreground" />
                    <h2 className="text-lg font-bold text-foreground">Precauciones</h2>
                  </div>
                  <ul className="space-y-3">
                    {precautions.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="w-4 h-4 text-accent-foreground mt-0.5 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Maritime guides */}
              <section className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Guía de viaje marítimo</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Todo lo que necesitas saber para navegar el Pacífico colombiano con tranquilidad.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {maritimeGuides.map((g, i) => {
                    const Icon = g.icon
                    return (
                      <div key={i} className="flex items-start gap-3 bg-muted/40 rounded-xl p-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm mb-1">{g.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{g.text}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>

            {/* RIGHT: sticky summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">Resumen de tu reserva</h2>

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ruta</span>
                    <span className="font-medium text-foreground text-right">{routeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Embarcación</span>
                    <span className="font-medium text-foreground text-right">{vesselName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salida</span>
                    <span className="font-medium text-foreground">{departure}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Asientos seleccionados
                  </div>
                  {selectedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map((s) => (
                        <span
                          key={s}
                          className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Aún no has elegido asientos.</p>
                  )}
                </div>

                {/* Price breakdown */}
                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {passengers} asiento(s) × ${formatCOP(pricePerSeat)}
                    </span>
                    <span className="font-medium text-foreground">${formatCOP(seatsCost)}</span>
                  </div>
                  {luggageExtraCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Equipaje adicional</span>
                      <span className="font-medium text-foreground">${formatCOP(luggageExtraCost)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">${formatCOP(total)}</span>
                </div>
                <div className="text-xs text-muted-foreground text-right mb-4">COP</div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                  disabled={passengers === 0}
                >
                  {passengers === 0 ? "Elige un asiento" : "Confirmar reserva"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
                  <LifeBuoy className="w-3.5 h-3.5" />
                  Reserva 100% verificada y segura
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
