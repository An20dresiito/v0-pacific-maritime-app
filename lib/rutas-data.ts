'use client'

// Puertos del Pacífico Colombiano con coordenadas aproximadas
export const PUERTOS = [
  {
    id: 'gorgona',
    nombre: 'Gorgona',
    departamento: 'Valle del Cauca',
    coordX: 520,
    coordY: 180,
    latitud: 2.95,
    longitud: -78.18,
  },
  {
    id: 'latola',
    nombre: 'La Tola',
    departamento: 'Nariño',
    coordX: 480,
    coordY: 500,
    latitud: 1.25,
    longitud: -78.73,
  },
  {
    id: 'mosquera',
    nombre: 'Mosquera',
    departamento: 'Nariño',
    coordX: 500,
    coordY: 480,
    latitud: 1.32,
    longitud: -78.68,
  },
  {
    id: 'iscuande',
    nombre: 'Iscuandé',
    departamento: 'Nariño',
    coordX: 470,
    coordY: 510,
    latitud: 1.15,
    longitud: -78.80,
  },
  {
    id: 'lopezdemicay',
    nombre: 'López de Micay',
    departamento: 'Cauca',
    coordX: 490,
    coordY: 350,
    latitud: 2.42,
    longitud: -78.72,
  },
  {
    id: 'jurado',
    nombre: 'Juradó',
    departamento: 'Chocó',
    coordX: 420,
    coordY: 280,
    latitud: 3.17,
    longitud: -79.27,
  },
  {
    id: 'pizarro',
    nombre: 'Pizarro',
    departamento: 'Chocó',
    coordX: 400,
    coordY: 260,
    latitud: 3.28,
    longitud: -79.37,
  },
]

// Operadores disponibles
export const OPERADORES = [
  { id: 1, nombre: 'Transportes Pacífico', tipo: 'Lancha' },
  { id: 2, nombre: 'Ferry del Pacífico', tipo: 'Ferry' },
  { id: 3, nombre: 'Lanchas Rápidas', tipo: 'Lancha' },
  { id: 4, nombre: 'Naviera Caribeña', tipo: 'Ferry' },
  { id: 5, nombre: 'Express Marino', tipo: 'Lancha' },
]

// Calcular distancia aproximada entre dos puertos (en km)
export function calcularDistancia(puerto1: typeof PUERTOS[0], puerto2: typeof PUERTOS[0]): number {
  const lat1 = puerto1.latitud
  const lon1 = puerto1.longitud
  const lat2 = puerto2.latitud
  const lon2 = puerto2.longitud

  const R = 6371 // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}

// Determinar si es ruta directa o con escala
export function determinarTipoRuta(distancia: number): 'Directa' | 'Con Escala' {
  return distancia <= 150 ? 'Directa' : 'Con Escala'
}

// Calcular precio dinámico basado en distancia y tipo de embarcación
export function calcularPrecio(distancia: number, tipoEmbarcacion: 'Lancha' | 'Ferry'): number {
  const precioBase = 45000
  const precioMaximo = 180000

  // Fórmula: precio base + (distancia * factor) + ajuste por embarcación
  const factor = (precioMaximo - precioBase) / 250 // Máxima distancia ~250km
  let precio = precioBase + distancia * factor

  // Ferrys son más caros (20% adicional)
  if (tipoEmbarcacion === 'Ferry') {
    precio = precio * 1.2
  }

  // Redondear a múltiplos de 1000
  return Math.round(precio / 1000) * 1000
}

// Generar viajes disponibles para una ruta
export function generarViajes(
  puertoOrigen: typeof PUERTOS[0],
  puertoDestino: typeof PUERTOS[0],
  cantidad: number = 3
) {
  const distancia = calcularDistancia(puertoOrigen, puertoDestino)
  const tipoRuta = determinarTipoRuta(distancia)
  const viajes = []

  for (let i = 0; i < cantidad; i++) {
    const tipoEmbarcacion = Math.random() > 0.5 ? 'Lancha' : 'Ferry'
    const operador = OPERADORES[Math.floor(Math.random() * OPERADORES.length)]
    const horas = Math.floor(6 + Math.random() * 18) // Entre 6 y 24 horas
    const precio = calcularPrecio(distancia, tipoEmbarcacion as 'Lancha' | 'Ferry')

    viajes.push({
      id: `${puertoOrigen.id}-${puertoDestino.id}-${i}`,
      origen: puertoOrigen.nombre,
      destino: puertoDestino.nombre,
      distancia,
      tipoRuta,
      tipoEmbarcacion,
      operador: operador.nombre,
      operadorId: operador.id,
      hora: `${6 + i}:00`,
      duracion: `${horas}h`,
      precio,
      capacidad: tipoEmbarcacion === 'Lancha' ? 20 : 80,
      disponibles: Math.floor(Math.random() * 15) + 1,
      fecha: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    })
  }

  return viajes
}
