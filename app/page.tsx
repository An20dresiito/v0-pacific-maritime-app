'use client'

import { useAuth } from '@/lib/auth-context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        router.push('/dashboard')
      } else {
        router.push('/auth')
      }
    }
  }, [isLoggedIn, isLoading, router])

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-slate-300 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Cargando...</p>
      </div>
    </div>
  )
}

