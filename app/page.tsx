import { Navbar } from "@/components/smartchef/navbar"
import { Hero } from "@/components/smartchef/hero"
import { Features } from "@/components/smartchef/features"
import { HowItWorks } from "@/components/smartchef/how-it-works"
import { CTA } from "@/components/smartchef/cta"
import { Footer } from "@/components/smartchef/footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}
