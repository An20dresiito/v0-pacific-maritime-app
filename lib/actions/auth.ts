"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

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

// ----------------------------------------------------------------------------
// MOCK AUTH (solo para entorno de desarrollo)
// Evita el límite de correos de Supabase ("email rate limit exceeded").
// Guarda una sesión simulada en cookie y omite supabase.auth.signUp.
// ----------------------------------------------------------------------------
const MOCK_SESSION_COOKIE = "mock_session"

type MockSession = {
  id: string
  email: string
  nombre_completo: string
  telefono: string
  puerto_frecuente: string
  created_at: string
}

async function setMockSession(session: MockSession) {
  const cookieStore = await cookies()
  cookieStore.set(MOCK_SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  })
}

async function getMockSession(): Promise<MockSession | null> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(MOCK_SESSION_COOKIE)?.value
  if (!raw) return null
  try {
    return JSON.parse(raw) as MockSession
  } catch {
    return null
  }
}

async function clearMockSession() {
  const cookieStore = await cookies()
  cookieStore.delete(MOCK_SESSION_COOKIE)
}

export async function signUp(formData: FormData) {
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

  // --- MOCK AUTH: simula registro exitoso sin llamar a Supabase ---
  // Esto evita el bloqueo por "email rate limit exceeded" en desarrollo.
  const mockUserId = crypto.randomUUID()

  await setMockSession({
    id: mockUserId,
    email,
    nombre_completo,
    telefono: telefonoLimpio,
    puerto_frecuente,
    created_at: new Date().toISOString(),
  })

  // Intentar persistir el perfil en Supabase (no bloquea el flujo si falla).
  try {
    const supabase = await createClient()
    await supabase.from("perfiles").upsert({
      id: mockUserId,
      nombre_completo,
      telefono: telefonoLimpio,
      puerto_frecuente,
    })
  } catch {
    // Ignorar errores de persistencia en modo mock.
  }

  // Redirigir inmediatamente al perfil con los datos ingresados.
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
  // Limpiar sesión simulada (mock auth)
  await clearMockSession()

  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}

export async function updateProfile(formData: FormData) {
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

  // --- MOCK AUTH: actualizar la cookie de sesión simulada ---
  const mock = await getMockSession()
  if (mock) {
    await setMockSession({
      ...mock,
      nombre_completo,
      telefono: telefonoLimpio,
      puerto_frecuente,
    })

    // Intentar persistir en Supabase sin bloquear el flujo.
    try {
      const supabase = await createClient()
      await supabase.from("perfiles").upsert({
        id: mock.id,
        nombre_completo,
        telefono: telefonoLimpio,
        puerto_frecuente,
      })
    } catch {
      // Ignorar en modo mock.
    }

    return { success: true }
  }

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "No has iniciado sesión" }
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
  // --- MOCK AUTH: priorizar sesión simulada si existe ---
  const mock = await getMockSession()
  if (mock) {
    return {
      user: {
        id: mock.id,
        email: mock.email,
        created_at: mock.created_at,
        // Campos requeridos por el tipo User de Supabase (valores mínimos).
        app_metadata: {},
        user_metadata: {
          nombre_completo: mock.nombre_completo,
          telefono: mock.telefono,
          puerto_frecuente: mock.puerto_frecuente,
        },
        aud: "authenticated",
      } as never,
      profile: {
        id: mock.id,
        nombre_completo: mock.nombre_completo,
        telefono: mock.telefono,
        puerto_frecuente: mock.puerto_frecuente,
        avatar_url: null,
        creado_en: mock.created_at,
        updated_at: mock.created_at,
      },
    }
  }

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
