'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Mail, Lock, User, Phone, MapPin } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const { register, login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre_completo: '',
    telefono: '',
    puerto_frecuente: 'Buenaventura',
  })

  const puertos = [
    'Buenaventura',
    'Guapi',
    'Tumaco',
    'Nuquí',
    'Bahía Solano',
    'El Valle',
    'Ladrilleros',
    'La Bocana',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email y contraseña son obligatorios')
      return false
    }

    if (!isLogin) {
      if (!formData.nombre_completo || !formData.telefono) {
        setError('Todos los campos son obligatorios')
        return false
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError('Email inválido')
        return false
      }

      const phoneRegex = /^(\+57)?[0-9]{10}$/
      if (!phoneRegex.test(formData.telefono.replace(/\s/g, ''))) {
        setError('Teléfono inválido (10 dígitos)')
        return false
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
      if (!passwordRegex.test(formData.password)) {
        setError('La contraseña debe tener 8+ caracteres, mayúscula, minúscula y número')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500))

      if (isLogin) {
        // Simulación de login
        login({
          id: crypto.randomUUID(),
          email: formData.email,
          nombre_completo: formData.email.split('@')[0],
          telefono: '3001234567',
          puerto_frecuente: 'Buenaventura',
          created_at: new Date().toISOString(),
        })
      } else {
        // Registro con los datos del formulario
        register({
          id: crypto.randomUUID(),
          email: formData.email,
          nombre_completo: formData.nombre_completo,
          telefono: formData.telefono.replace(/\s/g, ''),
          puerto_frecuente: formData.puerto_frecuente,
          created_at: new Date().toISOString(),
        })
      }

      // Redirigir al dashboard
      router.push('/dashboard')
    } catch (err) {
      setError('Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">PacificConnect</h1>
          <p className="text-slate-400">Transporte Marítimo del Pacífico Colombiano</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => {
                setIsLogin(true)
                setError(null)
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                isLogin
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError(null)
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                !isLogin
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                    <User className="w-4 h-4" />
                    Nombre Completo
                  </Label>
                  <Input
                    type="text"
                    name="nombre_completo"
                    value={formData.nombre_completo}
                    onChange={handleChange}
                    placeholder="Carlos Rodríguez"
                    className="border-slate-300"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </Label>
                  <Input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="300 123 4567"
                    className="border-slate-300"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                    <MapPin className="w-4 h-4" />
                    Puerto Frecuente
                  </Label>
                  <select
                    name="puerto_frecuente"
                    value={formData.puerto_frecuente}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {puertos.map(puerto => (
                      <option key={puerto} value={puerto}>
                        {puerto}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <Label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="usuario@example.com"
                className="border-slate-300"
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                <Lock className="w-4 h-4" />
                Contraseña
              </Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="border-slate-300"
              />
              {!isLogin && (
                <p className="text-xs text-slate-500 mt-2">
                  Mínimo 8 caracteres, mayúscula, minúscula y número
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg font-medium transition-colors mt-6"
            >
              {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </Button>
          </form>

          {/* Demo Note */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Demo:</strong> Sin confirmación de correo. Usa cualquier email/contraseña válida.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
