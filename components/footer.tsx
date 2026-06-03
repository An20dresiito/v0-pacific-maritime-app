import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

const footerLinks = {
  departamentos: [
    { label: "Chocó", href: "#" },
    { label: "Valle del Cauca", href: "#" },
    { label: "Cauca", href: "#" },
    { label: "Nariño", href: "#" },
  ],
  destinos: [
    { label: "Nuquí", href: "#" },
    { label: "Bahía Solano", href: "#" },
    { label: "Buenaventura", href: "#" },
    { label: "Guapi", href: "#" },
    { label: "Tumaco", href: "#" },
    { label: "Ladrilleros", href: "#" },
  ],
  servicios: [
    { label: "Reservar Cupo", href: "/reserva" },
    { label: "Consultar Rutas", href: "/#rutas" },
    { label: "Operadores", href: "#" },
    { label: "Equipaje", href: "#" },
    { label: "Grupos", href: "#" },
  ],
  ayuda: [
    { label: "Centro de Ayuda", href: "#" },
    { label: "Preguntas Frecuentes", href: "#" },
    { label: "Políticas de Cancelación", href: "#" },
    { label: "Términos y Condiciones", href: "#" },
    { label: "Política de Privacidad", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer id="contacto" className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-background rounded-full p-1 flex items-center justify-center">
                <Image
                  src="/images/pacificconnect-logo.png"
                  alt="PacificConnect Logo"
                  width={60}
                  height={60}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-background leading-tight">
                  PacificConnect
                </span>
                <span className="text-xs text-background/60 -mt-0.5">
                  Estamos Unidos
                </span>
              </div>
            </Link>
            
            <p className="text-background/70 mb-6 max-w-sm">
              Plataforma tecnológica que centraliza la oferta de transporte marítimo 
              conectando Chocó, Valle del Cauca, Cauca y Nariño por vía marítima.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Muelle Turístico, Buenaventura, Valle del Cauca</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+57 312 456 7890</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>info@pacificconnect.co</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Lun - Dom: 5:00 AM - 8:00 PM</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-background mb-4">Departamentos</h3>
            <ul className="space-y-3">
              {footerLinks.departamentos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-background mb-4">Destinos</h3>
            <ul className="space-y-3">
              {footerLinks.destinos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-background mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-background mb-4">Ayuda</h3>
            <ul className="space-y-3">
              {footerLinks.ayuda.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60 text-center md:text-left">
              2025 PACIFICCONNECT. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-background/60">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Embarcaciones Verificadas y Seguras
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
