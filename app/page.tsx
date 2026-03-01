import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Product } from "@/components/video-works"
import { VideoShowcase } from "@/components/video-showcase"
import { PainPoints } from "@/components/skills"
import { CallToAction } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Product />
      <VideoShowcase />
      <PainPoints />
      <CallToAction />
      <SiteFooter />
    </main>
  )
}
