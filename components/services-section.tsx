"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, Cpu, Database, LineChart, MessageSquare, Network } from "lucide-react"
import { ChevronRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  index: number
  inView: boolean
  isMobile: boolean
}

function ServiceCard({ title, description, icon, index, inView, isMobile }: ServiceCardProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
        <Card className="h-full bg-black/40 backdrop-blur-sm border border-cyan-900/50 hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mb-4">
              {icon}
            </div>
            <CardTitle className="text-xl text-white group-hover:text-yellow-400 transition-colors">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-400 text-base">{description}</CardDescription>
          </CardContent>
          <CardFooter>
            <div className="flex items-center text-yellow-500 group-hover:text-yellow-300 transition-colors">
              <span className="mr-2">Learn more</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
      <Card className="h-full bg-black/40 backdrop-blur-sm border border-cyan-900/50 hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden">
        <CardHeader>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mb-4">
            {icon}
          </div>
          <CardTitle className="text-xl text-white group-hover:text-yellow-400 transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400 text-base">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-yellow-500 group-hover:text-yellow-300 transition-colors">
            <span className="mr-2">Learn more</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

interface ServicesSectionProps {
  inView: boolean
}

export default function ServicesSection({ inView }: ServicesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const services = [
    {
      title: "Neural Networks",
      description:
        "Custom-built neural architectures designed for your specific business challenges and data requirements.",
      icon: <Brain className="text-white" size={24} />,
    },
    {
      title: "Predictive Analytics",
      description: "Harness the power of your data with advanced predictive models that forecast trends and behaviors.",
      icon: <LineChart className="text-white" size={24} />,
    },
    {
      title: "Generative AI",
      description:
        "Create content, designs, and solutions with state-of-the-art generative models tailored to your brand.",
      icon: <Cpu className="text-white" size={24} />,
    },
    {
      title: "Conversational AI",
      description:
        "Engage customers with intelligent chatbots and virtual assistants that understand natural language.",
      icon: <MessageSquare className="text-white" size={24} />,
    },
    {
      title: "Computer Vision",
      description: "See the world through AI with image recognition, object detection, and visual analysis systems.",
      icon: <Network className="text-white" size={24} />,
    },
    {
      title: "Big Data Processing",
      description: "Transform massive datasets into actionable insights with our scalable data processing solutions.",
      icon: <Database className="text-white" size={24} />,
    },
  ]

  if (!isMounted) {
    return (
      <div ref={containerRef} className="relative flex flex-col items-center justify-center px-4 py-8 md:py-16 bg-black">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-300">Cutting-edge AI solutions designed to transform your business</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center px-4 py-8 md:py-16 bg-black">
      <div className="text-center max-w-4xl mx-auto mb-8 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text mb-6">
          Our Services
        </h2>
        <p className="text-xl text-gray-300">Cutting-edge AI solutions designed to transform your business</p>
      </div>

      {/* Services Grid */}
      <div className="w-full max-w-7xl mx-auto mt-8 md:mt-16">
        <div className="flex flex-wrap gap-4 justify-center">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
              inView={inView}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
