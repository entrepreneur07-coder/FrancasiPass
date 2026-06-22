import { HeroSection, FeaturesSection, StatsSection, PricingSection, CTASection, Footer } from "@/components/landing"
import { Navbar } from "@/components/layout/Navbar"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}