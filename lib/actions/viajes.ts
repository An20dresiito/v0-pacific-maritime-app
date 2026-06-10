"use server"

import { createClient } from "@/lib/supabase/server"

export type Viaje = {
  id: string
  origen: string
  destino: string
  fecha: string
  hora_salida: string
  hora_llegada: string
  tipo_embarcacion: string
  nombre_embarcacion: string
  precio: number
  cupos_disponibles: number
  cupos_totales: number
  operador: string
}

export async function searchViajes(
  origen?: string,
  destino?: string,
  fecha?: string,
  pasajeros?: number
): Promise<{ viajes: Viaje[]; error: string | null }> {
  const supabase = await createClient()

  let query = supabase
    .from("viajes")
    .select("*")
    .order("hora_salida", { ascending: true })

  if (origen && origen !== "todos") {
    query = query.eq("origen", origen)
  }

  if (destino && destino !== "todos") {
    query = query.eq("destino", destino)
  }

  if (fecha) {
    query = query.eq("fecha", fecha)
  }

  if (pasajeros && pasajeros > 0) {
    query = query.gte("cupos_disponibles", pasajeros)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error searching viajes:", error)
    return { viajes: [], error: error.message }
  }

  return { viajes: data || [], error: null }
}

export async function getOrigenes(): Promise<string[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("viajes")
    .select("origen")
  
  if (error || !data) return []
  
  const origenes = [...new Set(data.map((v) => v.origen))]
  return origenes.sort()
}

export async function getDestinos(origen?: string): Promise<string[]> {
  const supabase = await createClient()

  let query = supabase.from("viajes").select("destino")

  if (origen && origen !== "todos") {
    query = query.eq("origen", origen)
  }

  const { data, error } = await query

  if (error || !data) return []

  const destinos = [...new Set(data.map((v) => v.destino))]
  return destinos.sort()
}

export async function getViajeById(id: string) {
  const supabase = await createClient()

  const { data: viaje, error } = await supabase
    .from("viajes")
    .select(`
      *,
      empresas (
        id,
        nombre,
        logo_url,
        verificada
      )
    `)
    .eq("id", id)
    .single()

  if (error) return null
  return viaje
}

export async function getViajesByOperador(operadorNombre: string) {
  const supabase = await createClient()

  const { data: viajes, error } = await supabase
    .from("viajes")
    .select(`
      *,
      empresas (
        id,
        nombre,
        logo_url,
        verificada
      )
    `)
    .eq("operador", operadorNombre)
    .eq("activo", true)
    .order("fecha", { ascending: true })

  if (error) return []
  return viajes
}

export async function getViajesByDestino(destino: string) {
  const supabase = await createClient()

  const { data: viajes, error } = await supabase
    .from("viajes")
    .select(`
      *,
      empresas (
        id,
        nombre,
        logo_url,
        verificada
      )
    `)
    .or(`destino.ilike.%${destino}%,origen.ilike.%${destino}%`)
    .eq("activo", true)
    .order("fecha", { ascending: true })

  if (error) return []
  return viajes
}
