import type React from "react"
import { Code, Palette, Globe } from "lucide-react"
import { CardWrapper } from "./ui/card-wrapper"

interface ServiceProps {
  title: string
  description: string
  icon: React.ReactNode
}

function ServiceCard({ title, description, icon }: ServiceProps) {
  return (
    <CardWrapper className="hover:border-primary/40 transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </CardWrapper>
  )
}

export function Services() {
  return (
    <section className="py-16" id="services">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What I Do</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          I offer a wide range of services to help businesses and individuals create impactful digital experiences.
          Here's how I can help you succeed.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard
          icon={<Code size={24} />}
          title="Website Design"
          description="I craft custom stunning, user-friendly, and responsive designs tailored to your needs."
        />
        <ServiceCard
          icon={<Palette size={24} />}
          title="UI/UX Design"
          description="Creating intuitive and engaging user experiences that delight your users."
        />
        <ServiceCard
          icon={<Globe size={24} />}
          title="Web Development"
          description="Building fast, secure, and scalable web applications using modern technologies."
        />
      </div>
    </section>
  )
}

