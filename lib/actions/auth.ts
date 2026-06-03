"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

const PUERTOS_VALIDOS = [
  "Buenaventura",
  "Guapi", 
  "Tumaco",
  "Nuquí",
  "Bahía Solano",
  "El Valle",
  "Ladrilleros",
  "La Bocana",
  "Pianguita",
]

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const nombre_completo = formData.get("nombre_completo") as string
  const telefono = formData.get("telefono") as string
  const puerto_frecuente = formData.get("puerto_frecuente") as string

  // Validaciones con campo identificado
  if (!nombre_completo?.trim()) {
    return { error: "El nombre completo es obligatorio", field: "nombre_completo" }
  }

  const telefonoLimpio = telefono?.replace(/\s/g, "") ?? ""
  if (!telefonoLimpio) {
    return { error: "El teléfono es obligatorio", field: "telefono" }
  }
  if (!/^(\+57)?[0-9]{10}$/.test(telefonoLimpio)) {
    return { error: "El número de teléfono no es válido. Usa 10 dígitos (ej: 3001234567)", field: "telefono" }
  }

  if (!puerto_frecuente || !PUERTOS_VALIDOS.includes(puerto_frecuente)) {
    return { error: "Selecciona un puerto de origen válido", field: "puerto_frecuente" }
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email?.trim()) {
    return { error: "El correo electrónico es obligatorio", field: "email" }
  }
  if (!emailRegex.test(email)) {
    return { error: "El correo electrónico no tiene un formato válido", field: "email" }
  }

  // Validar contraseña segura (mínimo 8 caracteres, una mayúscula, una minúscula, un número)
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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
      data: {
        nombre_completo,
        telefono: telefonoLimpio,
        puerto_frecuente,
      },
    },
  })

  if (error) {
    if (error.message.includes("already registered") || error.message.includes("User already registered")) {
      return { error: "Este correo ya está registrado. Intenta iniciar sesión.", field: "email" }
    }
    return { error: error.message, field: null }
  }

  // Con confirmación de email desactivada, Supabase crea la sesión inmediatamente.
  // Si hay usuario, redirigir directamente al perfil.
  if (data?.user) {
    redirect("/perfil")
  }

  // Fallback: si por alguna razón no hay user pero tampoco error
  redirect("/perfil")
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Correo y contraseña son obligatorios", field: !email ? "email" : "password" }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Correo o contraseña incorrectos", field: "password" }
    }
    return { error: error.message, field: "password" }
  }

  redirect("/perfil")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "No has iniciado sesión" }
  }

  const nombre_completo = formData.get("nombre_completo") as string
  const telefono = formData.get("telefono") as string
  const puerto_frecuente = formData.get("puerto_frecuente") as string

  // Validaciones
  if (!nombre_completo || !telefono || !puerto_frecuente) {
    return { error: "Todos los campos son obligatorios" }
  }

  if (!PUERTOS_VALIDOS.includes(puerto_frecuente)) {
    return { error: "Puerto de origen no válido" }
  }

  const telefonoLimpio = telefono.replace(/\s/g, "")
  if (!/^(\+57)?[0-9]{10}$/.test(telefonoLimpio)) {
    return { error: "El número de teléfono no es válido" }
  }

  const { error } = await supabase
    .from("perfiles")
    .update({
      nombre_completo,
      telefono: telefonoLimpio,
      puerto_frecuente,
    })
    .eq("id", user.id)

  if (error) {
    return { error: "Error al actualizar el perfil" }
  }

  return { success: true }
}

export async function getProfile() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return {
    user,
    profile,
  }
}
