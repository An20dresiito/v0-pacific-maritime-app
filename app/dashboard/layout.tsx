'use client'

import { useAuth } from '@/lib/auth-context'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardTopbar } from '@/components/dashboard-topbar'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/auth')
    }
  }, [isLoggedIn, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-300 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="flex">
      <DashboardSidebar />
      <DashboardTopbar />
      <main className="flex-1 ml-64 mt-20 bg-slate-50 min-h-screen p-8">
        {children}
      </main>
    </div>
  )
}
