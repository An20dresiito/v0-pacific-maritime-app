"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "pt", name: "Português" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("es")

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/#rutas", label: "Rutas" },
    { href: "/#destinos", label: "Destinos" },
    { href: "/embarcaciones", label: "Embarcaciones" },
    { href: "/#operadores", label: "Operadores" },
    { href: "/#nosotros", label: "Nosotros" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo - más grande y separado */}
          <Link href="/" className="flex items-center gap-4 shrink-0">
            <div className="relative">
              <Image
                src="/images/pacificconnect-logo.png"
                alt="PacificConnect Logo"
                width={72}
                height={72}
                className="w-14 h-14 md:w-[72px] md:h-[72px] object-contain"
                priority
              />
            </div>
            <div className="flex flex-col hidden md:flex">
              <span className="text-lg lg:text-xl font-bold text-primary leading-tight tracking-tight">
                PacificConnect
              </span>
              <span className="text-xs text-muted-foreground">
                Estamos Unidos
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - separado con más espacio */}
          <nav className="hidden lg:flex items-center gap-8 ml-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span className="uppercase text-xs">{currentLang}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={currentLang === lang.code ? "bg-muted" : ""}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <Link href="/iniciar-sesion">
                <User className="w-4 h-4" />
                Iniciar Sesión
              </Link>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/reserva">Reservar Cupo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="flex items-center gap-2 py-2 border-t border-border pt-4">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-transparent text-sm text-muted-foreground focus:outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="pt-2 space-y-3">
              <Button variant="outline" className="w-full gap-2" asChild>
                <Link href="/iniciar-sesion" onClick={() => setIsMenuOpen(false)}>
                  <User className="w-4 h-4" />
                  Iniciar Sesión
                </Link>
              </Button>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link href="/reserva" onClick={() => setIsMenuOpen(false)}>
                  Reservar Cupo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
