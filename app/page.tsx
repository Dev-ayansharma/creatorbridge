import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { LogoMarquee } from "@/components/logo-marquee"

import {TimelineDemo} from "@/components/timeline-demo"
import { Pricing } from "@/components/pricing"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black">
        <Navbar />
        <Hero />
        <LogoMarquee />
        <TimelineDemo />
        <Pricing />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

