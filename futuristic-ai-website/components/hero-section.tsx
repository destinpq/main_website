"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SafeMotion } from "@/components/framer-motion-safe"
import Image from "next/image"
import Link from "next/link"

interface HeroSectionProps {
  inView: boolean
}

export default function HeroSection({ inView }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  if (!isMounted) {
    return (
      <div ref={containerRef} className="relative h-screen flex flex-col items-center justify-center px-4">
        {/* Hero content placeholder */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Logo with direct black to yellow transition */}
          <div className="relative mb-12 md:mb-16 w-[350px] h-[350px]">
            {/* Outer yellow glow with larger blur for smoother transition */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-amber-500 blur-2xl opacity-90 scale-150"></div>
            
            {/* Solid black center that transitions to yellow */}
            <div className="absolute inset-[5%] rounded-full bg-black"></div>
            
            {/* Gradient ring from black to yellow */}
            <div className="absolute inset-[5%] rounded-full bg-gradient-radial from-transparent via-black to-yellow-500/90 blur-xl pointer-events-none"></div>
            
            {/* Logo container with pure black background */}
            <div className="absolute inset-[25%] rounded-full flex items-center justify-center overflow-hidden">
              <div className="w-full h-full relative flex items-center justify-center bg-black rounded-full">
                <div className="w-[75%] h-[75%] relative">
                  <Image 
                    src="/thunh.png" 
                    alt="DestinPQ Logo" 
                    fill
                    className="object-contain" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Text placeholder */}
          <div className="w-full max-w-xl mx-auto mt-4 text-center">
            <div className="h-12 bg-gray-800/50 rounded-md mb-4"></div>
            <div className="h-24 bg-gray-800/50 rounded-md"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-0">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Logo with animation */}
        <SafeMotion
          className="relative mb-12 md:mb-16 w-[350px] h-[350px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Outer yellow glow with larger blur for smoother transition */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-amber-500 blur-2xl opacity-90 scale-150"></div>
          
          {/* Solid black center that transitions to yellow */}
          <div className="absolute inset-[5%] rounded-full bg-black"></div>
          
          {/* Gradient ring from black to yellow */}
          <div className="absolute inset-[5%] rounded-full bg-gradient-radial from-transparent via-black to-yellow-500/90 blur-xl pointer-events-none"></div>
          
          {/* Logo container with pure black background */}
          <div className="absolute inset-[25%] rounded-full flex items-center justify-center overflow-hidden">
            <div className="w-full h-full relative flex items-center justify-center bg-black rounded-full">
              <div className="w-[75%] h-[75%] relative">
                <Image 
                  src="/thunh.png" 
                  alt="DestinPQ Logo" 
                  fill
                  className="object-contain" 
                  priority
                />
              </div>
            </div>
          </div>
        </SafeMotion>
        
        {/* Text content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <SafeMotion
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-transparent bg-clip-text pb-3"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            variants={textVariants}
          >
            Designing Tomorrow&apos;s Intelligence
          </SafeMotion>

          <SafeMotion
            className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 px-2"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            variants={textVariants}
          >
            Pioneering the future of AI and machine learning solutions that transform industries and redefine
            possibilities.
          </SafeMotion>

          <SafeMotion
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            variants={textVariants}
          >
            <Button
              size="lg"
              className="bg-black hover:bg-gray-900 text-white border-2 border-yellow-500 px-6 py-5 text-base md:px-8 md:py-6 md:text-lg"
              onClick={() => scrollToSection('services')}
            >
              Explore Solutions
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-black/30 px-6 py-5 text-base md:px-8 md:py-6 md:text-lg"
              onClick={() => scrollToSection('case-studies')}
            >
              View Case Studies
            </Button>
          </SafeMotion>
        </div>
      </div>
    </div>
  )
}
