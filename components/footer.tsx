import Link from "next/link"
import { Anchor, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

const footerLinks = {
  destinos: [
    { label: "Nuquí", href: "#" },
    { label: "Bahía Solano", href: "#" },
    { label: "Ladrilleros", href: "#" },
    { label: "Tumaco", href: "#" },
    { label: "Guapi", href: "#" },
    { label: "El Valle", href: "#" },
  ],
  experiencias: [
    { label: "Avistamiento de Ballenas", href: "#" },
    { label: "Tour de Manglares", href: "#" },
    { label: "Buceo y Snorkel", href: "#" },
    { label: "Expedición Selvática", href: "#" },
    { label: "Experiencia Cultural", href: "#" },
    { label: "Fotografía de Naturaleza", href: "#" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#" },
    { label: "Nuestra Historia", href: "#" },
    { label: "Sostenibilidad", href: "#" },
    { label: "Trabaja con Nosotros", href: "#" },
    { label: "Prensa", href: "#" },
    { label: "Blog", href: "#" },
  ],
  ayuda: [
    { label: "Centro de Ayuda", href: "#" },
    { label: "Preguntas Frecuentes", href: "#" },
    { label: "Políticas de Cancelación", href: "#" },
    { label: "Términos y Condiciones", href: "#" },
    { label: "Política de Privacidad", href: "#" },
    { label: "Contacto", href: "#" },
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
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Anchor className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-background leading-tight">
                  Pacífico
                </span>
                <span className="text-sm text-background/60 -mt-1">Voyages</span>
              </div>
            </Link>
            
            <p className="text-background/70 mb-6 max-w-sm">
              Conectamos a los viajeros con la magia del Pacífico colombiano. 
              Más de 10 años navegando con pasión y compromiso.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Muelle Turístico, Buenaventura, Valle del Cauca</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5 text-primary" />
                <span>+57 312 456 7890</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@pacificovoyages.co</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <Clock className="w-5 h-5 text-primary" />
                <span>Lun - Sáb: 6:00 AM - 6:00 PM</span>
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
            <h3 className="font-semibold text-background mb-4">Experiencias</h3>
            <ul className="space-y-3">
              {footerLinks.experiencias.map((link) => (
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
            <h3 className="font-semibold text-background mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
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
              © 2025 Pacífico Voyages. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-background/60">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Registro Nacional de Turismo: RNT 12345
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
