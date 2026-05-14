"use client"

import { useState } from "react"
import Image from "next/image"
import { Send, CheckCircle, Loader2, Smartphone, Bell, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSuccess(true)
    setEmail("")
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000)
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge with Logo */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
          <Image
            src="/images/pacificconnect-logo.png"
            alt="PacificConnect"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
          <span className="text-sm font-medium text-white">
            App Móvil - Disponible pronto
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
          Reserva tu Cupo Desde Cualquier Lugar
        </h2>

        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10 text-pretty">
          Suscríbete para recibir notificaciones cuando lancemos la app móvil, 
          ofertas exclusivas y alertas de nuevas rutas disponibles.
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                disabled={isLoading}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || isSuccess}
              className="h-auto py-4 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base rounded-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Registrado
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Notificarme
                </>
              )}
            </Button>
          </div>
          
          <p className="text-xs text-white/60 mt-4">
            Al suscribirte aceptas nuestra política de privacidad. 
            Puedes cancelar en cualquier momento.
          </p>
        </form>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">App Móvil</h3>
            <p className="text-sm text-white/70">Reserva desde tu celular</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">Notificaciones</h3>
            <p className="text-sm text-white/70">Alertas en tiempo real</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-1">100% Seguro</h3>
            <p className="text-sm text-white/70">Embarcaciones verificadas</p>
          </div>
        </div>
      </div>
    </section>
  )
}
