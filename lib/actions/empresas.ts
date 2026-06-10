"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function registrarEmpresa(formData: FormData) {
  const supabase = await createClient()

  const nit = formData.get("nit") as string
  const nombre = formData.get("nombre") as string
  const representante = formData.get("representante") as string
  const email = formData.get("email") as string
  const telefono = formData.get("telefono") as string
  const descripcion = formData.get("descripcion") as string
  const password = formData.get("password") as string

  // Validaciones
  if (!nit?.trim()) {
    return { error: "El NIT es obligatorio", field: "nit" }
  }
  if (!/^\d{9,12}-?\d{1,2}$/.test(nit.replace(/\s/g, ""))) {
    return { error: "El NIT no tiene un formato válido (ej: 900123456-1)", field: "nit" }
  }

  if (!nombre?.trim()) {
    return { error: "El nombre de la empresa es obligatorio", field: "nombre" }
  }

  if (!representante?.trim()) {
    return { error: "El nombre del representante es obligatorio", field: "representante" }
  }

  if (!email?.trim()) {
    return { error: "El correo electrónico es obligatorio", field: "email" }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: "El correo electrónico no tiene un formato válido", field: "email" }
  }

  if (!password) {
    return { error: "La contraseña es obligatoria", field: "password" }
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  if (!passwordRegex.test(password)) {
    return {
      error: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
      field: "password",
    }
  }

  const telefonoLimpio = telefono?.replace(/\s/g, "") ?? ""
  if (telefonoLimpio && !/^(\+57)?[0-9]{10}$/.test(telefonoLimpio)) {
    return { error: "El número de teléfono no es válido (10 dígitos)", field: "telefono" }
  }

  // Crear usuario en auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
      data: {
        nombre_completo: representante,
        telefono: telefonoLimpio,
      },
    },
  })

  if (authError) {
    if (authError.message.includes("already registered") || authError.message.includes("User already registered")) {
      return { error: "Este correo ya está registrado. Intenta iniciar sesión.", field: "email" }
    }
    return { error: authError.message, field: null }
  }

  if (!authData?.user) {
    return { error: "Error al crear la cuenta. Intenta nuevamente.", field: null }
  }

  // Crear perfil
  await supabase.from("perfiles").insert({
    id: authData.user.id,
    nombre_completo: representante,
    telefono: telefonoLimpio,
  })

  // Crear empresa
  const { error: empresaError } = await supabase.from("empresas").insert({
    nit: nit.replace(/\s/g, ""),
    nombre,
    representante,
    email,
    telefono: telefonoLimpio || null,
    descripcion: descripcion?.trim() || null,
    usuario_id: authData.user.id,
    verificada: false,
    activa: true,
  })

  if (empresaError) {
    if (empresaError.code === "23505") {
      return { error: "Ya existe una empresa registrada con este NIT", field: "nit" }
    }
    return { error: "Error al registrar la empresa. Intenta nuevamente.", field: null }
  }

  redirect("/registro-exitoso?tipo=empresa")
}

export async function getEmpresaByUsuario(usuarioId: string) {
  const supabase = await createClient()

  const { data: empresa, error } = await supabase
    .from("empresas")
    .select("*")
    .eq("usuario_id", usuarioId)
    .single()

  if (error) return null
  return empresa
}

export async function getEmpresaById(id: string) {
  const supabase = await createClient()

  const { data: empresa, error } = await supabase
    .from("empresas")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return empresa
}

export async function getEmpresas() {
  const supabase = await createClient()

  const { data: empresas, error } = await supabase
    .from("empresas")
    .select("id, nit, nombre, representante, logo_url, verificada, activa")
    .eq("activa", true)
    .order("nombre", { ascending: true })

  if (error) return []
  return empresas
}

export async function getEmbarcacionesByEmpresa(empresaId: string) {
  const supabase = await createClient()

  const { data: embarcaciones, error } = await supabase
    .from("embarcaciones")
    .select("*")
    .eq("empresa_id", empresaId)
    .order("creado_en", { ascending: false })

  if (error) return []
  return embarcaciones
}

export async function getViajesByEmpresa(empresaId: string) {
  const supabase = await createClient()

  const { data: viajes, error } = await supabase
    .from("viajes")
    .select("*")
    .eq("empresa_id", empresaId)
    .eq("activo", true)
    .order("fecha", { ascending: true })

  if (error) return []
  return viajes
}

export async function crearEmbarcacion(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No has iniciado sesión" }
  }

  const empresa = await getEmpresaByUsuario(user.id)
  if (!empresa) {
    return { error: "No tienes una empresa registrada" }
  }

  const nombre = formData.get("nombre") as string
  const tipo = formData.get("tipo") as string
  const capacidad = parseInt(formData.get("capacidad") as string)
  const velocidad = formData.get("velocidad") as string
  const motor = formData.get("motor") as string

  if (!nombre?.trim()) {
    return { error: "El nombre de la embarcación es obligatorio", field: "nombre" }
  }

  if (!tipo) {
    return { error: "El tipo de embarcación es obligatorio", field: "tipo" }
  }

  if (!capacidad || capacidad < 1) {
    return { error: "La capacidad debe ser al menos 1 pasajero", field: "capacidad" }
  }

  const { error } = await supabase.from("embarcaciones").insert({
    empresa_id: empresa.id,
    nombre,
    tipo,
    capacidad,
    velocidad: velocidad?.trim() || null,
    motor: motor?.trim() || null,
    certificada: false,
    activa: true,
  })

  if (error) {
    return { error: "Error al crear la embarcación", field: null }
  }

  return { success: true }
}

export async function crearViaje(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No has iniciado sesión" }
  }

  const empresa = await getEmpresaByUsuario(user.id)
  if (!empresa) {
    return { error: "No tienes una empresa registrada" }
  }

  const origen = formData.get("origen") as string
  const destino = formData.get("destino") as string
  const fecha = formData.get("fecha") as string
  const hora_salida = formData.get("hora_salida") as string
  const hora_llegada = formData.get("hora_llegada") as string
  const embarcacion_id = formData.get("embarcacion_id") as string
  const precio = parseFloat(formData.get("precio") as string)
  const cupos_totales = parseInt(formData.get("cupos_totales") as string)
  const paradasStr = formData.get("paradas") as string

  if (!origen || !destino || !fecha || !hora_salida || !hora_llegada) {
    return { error: "Todos los campos de ruta y horario son obligatorios" }
  }

  if (!precio || precio <= 0) {
    return { error: "El precio debe ser mayor a 0", field: "precio" }
  }

  if (!cupos_totales || cupos_totales < 1) {
    return { error: "Los cupos totales deben ser al menos 1", field: "cupos_totales" }
  }

  // Get embarcacion info
  const { data: embarcacion } = await supabase
    .from("embarcaciones")
    .select("nombre, tipo")
    .eq("id", embarcacion_id)
    .single()

  if (!embarcacion) {
    return { error: "Embarcación no encontrada", field: "embarcacion_id" }
  }

  // Parse paradas
  const paradas = paradasStr
    ? paradasStr.split(",").map((p) => p.trim()).filter(Boolean)
    : []

  const { error } = await supabase.from("viajes").insert({
    origen,
    destino,
    fecha,
    hora_salida,
    hora_llegada,
    tipo_embarcacion: embarcacion.tipo,
    nombre_embarcacion: embarcacion.nombre,
    precio,
    cupos_disponibles: cupos_totales,
    cupos_totales,
    operador: empresa.nombre,
    empresa_id: empresa.id,
    embarcacion_id,
    paradas,
    activo: true,
  })

  if (error) {
    return { error: "Error al crear el viaje", field: null }
  }

  return { success: true }
}

export async function getReservasByEmpresa(empresaId: string) {
  const supabase = await createClient()

  const { data: reservas, error } = await supabase
    .from("reservas")
    .select(`
      *,
      viajes (
        id,
        origen,
        destino,
        fecha,
        hora_salida,
        nombre_embarcacion
      ),
      perfiles (
        nombre_completo,
        telefono
      )
    `)
    .eq("viajes.empresa_id", empresaId)
    .order("created_at", { ascending: false })

  if (error) return []
  return reservas
}
