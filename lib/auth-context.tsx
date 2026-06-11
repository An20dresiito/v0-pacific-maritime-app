'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type User = {
  id: string
  nombre_completo: string
  email: string
  telefono: string
  puerto_frecuente: string
  created_at: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => void
  register: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'pacificconnect_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar usuario desde localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
  }

  const register = (userData: User) => {
    const userWithId = {
      ...userData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    }
    login(userWithId)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isLoggedIn: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
