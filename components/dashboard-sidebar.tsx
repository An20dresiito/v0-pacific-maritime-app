'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MapPin, Users, Building2, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/rutas-transbordo', label: 'Rutas de Transbordo', icon: MapPin },
  { href: '/dashboard/destinos', label: 'Destinos', icon: MapPin },
  { href: '/dashboard/operadores', label: 'Operadores', icon: Users },
  { href: '/dashboard/empresas', label: 'Portal de Empresas', icon: Building2 },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col pt-20 border-r border-slate-700">
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <button
        onClick={() => {
          logout()
          window.location.href = '/auth'
        }}
        className="mx-4 mb-6 flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Cerrar sesión</span>
      </button>
    </aside>
  )
}
