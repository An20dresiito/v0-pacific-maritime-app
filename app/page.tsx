import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DestinationsSection } from "@/components/destinations-section"
import { ServicesSection } from "@/components/services-section"
import { RoutesSection } from "@/components/routes-section"
import { OperatorsSection } from "@/components/operators-section"
import { AboutSection } from "@/components/about-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <DestinationsSection />
      <ServicesSection />
      <RoutesSection />
      <OperatorsSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  )
}
