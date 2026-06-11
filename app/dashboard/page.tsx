'use client'

import { useAuth } from '@/lib/auth-context'
import { User, Mail, Phone, MapPin, Calendar, Ship } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TravelerProfilePage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Perfil de Viajero</h1>
        <p className="text-slate-600">Información personal y historial de viajes</p>
      </div>

      {/* Datos Personales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-slate-600 font-medium">Nombre Completo</label>
              <p className="text-lg font-semibold text-slate-900 mt-1">{user?.nombre_completo}</p>
            </div>

            <div>
              <label className="text-sm text-slate-600 font-medium">Email</label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4 text-slate-500" />
                <p className="text-lg font-semibold text-slate-900">{user?.email}</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600 font-medium">Teléfono</label>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="w-4 h-4 text-slate-500" />
                <p className="text-lg font-semibold text-slate-900">{user?.telefono}</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600 font-medium">Puerto Frecuente</label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-slate-500" />
                <p className="text-lg font-semibold text-slate-900">{user?.puerto_frecuente}</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600 font-medium">Miembro Desde</label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-slate-500" />
                <p className="text-lg font-semibold text-slate-900">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString('es-CO')
                    : '-'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historial de Viajes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="w-5 h-5" />
            Historial de Viajes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Ship className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-2">No hay viajes registrados aún</p>
            <p className="text-sm text-slate-400">
              Tu historial de viajes aparecerá aquí cuando realices tu primera reserva
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
