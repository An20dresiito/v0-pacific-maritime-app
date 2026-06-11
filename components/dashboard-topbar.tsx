'use client'

import { useAuth } from '@/lib/auth-context'
import { CircleCheckBig } from 'lucide-react'

export function DashboardTopbar() {
  const { user } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-40 ml-64">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-slate-900">PacificConnect</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
          <CircleCheckBig className="w-5 h-5 text-green-600" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-600">Sesión</span>
            <span className="text-sm font-semibold text-green-700">Activa</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-slate-900">{user?.nombre_completo}</span>
          <span className="text-xs text-slate-500">{user?.email}</span>
        </div>
      </div>
    </header>
  )
}
