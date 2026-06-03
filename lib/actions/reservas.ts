"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type Reserva = {
  id: string
  usuario_id: string
  viaje_id: string
  asientos: number
  precio_total: number
  asientos_seleccionados: string[]
  codigo: string
  estado: "confirmada" | "cancelada" | "completada"
  created_at: string
  viaje?: {
    origen: string
    destino: string
    fecha: string
    hora_salida: string
    hora_llegada: string
    tipo_embarcacion: string
    nombre_embarcacion: string
    operador: string
  }
}

export async function confirmarReserva(data: {
  viaje_id: string
  asientos: number
  precio_total: number
  asientos_seleccionados: string[]
}): Promise<{ success: boolean; reserva?: Reserva; error?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Debes iniciar sesión para realizar una reserva" }
  }

  // Verificar cupos disponibles
  const { data: viaje } = await supabase
    .from("viajes")
    .select("cupos_disponibles")
    .eq("id", data.viaje_id)
    .single()

  if (!viaje || viaje.cupos_disponibles < data.asientos) {
    return { success: false, error: "No hay suficientes cupos disponibles" }
  }

  // Crear reserva (el trigger descuenta los cupos automáticamente)
  const { data: reserva, error } = await supabase
    .from("reservas")
    .insert({
      usuario_id: user.id,
      viaje_id: data.viaje_id,
      asientos: data.asientos,
      precio_total: data.precio_total,
      asientos_seleccionados: data.asientos_seleccionados,
    })
    .select()
    .single()

  if (error) {
    console.error("Error al crear reserva:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/perfil")
  revalidatePath("/buscar")

  return { success: true, reserva }
}

export async function getMisReservas(): Promise<Reserva[]> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from("reservas")
    .select(`
      *,
      viaje:viajes (
        origen,
        destino,
        fecha,
        hora_salida,
        hora_llegada,
        tipo_embarcacion,
        nombre_embarcacion,
        operador
      )
    `)
    .eq("usuario_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error al obtener reservas:", error)
    return []
  }

  return data || []
}

export async function cancelarReserva(reservaId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "No autorizado" }
  }

  // Obtener la reserva para saber cuántos asientos devolver
  const { data: reserva } = await supabase
    .from("reservas")
    .select("viaje_id, asientos, estado")
    .eq("id", reservaId)
    .eq("usuario_id", user.id)
    .single()

  if (!reserva || reserva.estado !== "confirmada") {
    return { success: false, error: "Reserva no encontrada o ya cancelada" }
  }

  // Actualizar estado a cancelada
  const { error: updateError } = await supabase
    .from("reservas")
    .update({ estado: "cancelada" })
    .eq("id", reservaId)

  if (updateError) {
    return { success: false, error: updateError.message }
  }

  // Devolver los cupos al viaje
  await supabase.rpc("devolver_cupos", {
    p_viaje_id: reserva.viaje_id,
    p_asientos: reserva.asientos,
  })

  revalidatePath("/perfil")
  revalidatePath("/buscar")

  return { success: true }
}
