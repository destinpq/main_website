"use client"

import { useRef, useState, useEffect } from "react"
import { SafeMotion } from "@/components/framer-motion-safe"
import Image from "next/image"

interface AboutSectionProps {
  inView: boolean
}

export default function AboutSection({ inView }: AboutSectionProps) {
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

  const teamMembers = [
    { 
      name: "Dr. Akanksha Agarwal", 
      role: "CEO, Psy D", 
      image: "/akanksha.jpg",
      description: "Leading our vision for AI innovation with a unique background in psychology, focusing on ethical and human-centered AI solutions."
    },
    { 
      name: "Pratik Khanapurkar", 
      role: "CTO", 
      image: "/pratik.jpg",
      description: "Architecting our technological framework and ensuring our AI systems deliver cutting-edge performance with scalability."
    },
    { 
      name: "Shaurya Bansal", 
      role: "R&D Head", 
      image: "/shaurya.jpg",
      description: "Spearheading our research initiatives to discover breakthrough AI applications and next-generation neural network architectures."
    },
    { 
      name: "Mohit Agrwal", 
      role: "Chief Marketing Officer", 
      image: "/mohit.jpeg",
      description: "Developing strategic marketing initiatives and building strong brand presence to drive growth and market penetration for our AI solutions."
    },
  ]

  // Simplified animation variants for mobile
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: isMobile ? 0.1 : i * 0.2,
        duration: isMobile ? 0.5 : 0.8,
        ease: "easeOut",
      },
    }),
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: isMobile ? 0.1 : 0.3 + (i * 0.1),
        duration: isMobile ? 0.3 : 0.6,
        ease: "easeOut",
      },
    }),
  };

  if (!isMounted) {
    return (
      <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
            Our Journey
          </h2>
          <p className="text-xl text-gray-300">
            From inception to innovation, we&apos;ve been at the forefront of AI evolution.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-black">
      <SafeMotion
        className="text-center max-w-4xl mx-auto mb-16"
        initial={isMobile ? { opacity: 1, y: 0 } : "hidden"}
        animate={isMobile ? { opacity: 1, y: 0 } : (inView ? "visible" : "hidden")}
        custom={0}
        variants={textVariants}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
          Our Journey
        </h2>
        <p className="text-xl text-gray-300">
          From inception to innovation, we&apos;ve been at the forefront of AI evolution.
        </p>
      </SafeMotion>

      {/* Team section */}
      <SafeMotion
        className="w-full max-w-6xl mx-auto mb-16"
        initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
        animate={isMobile ? { opacity: 1 } : (inView ? { opacity: 1 } : { opacity: 0 })}
        transition={{ duration: isMobile ? 0.1 : 1 }}
      >
        <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
          Meet Our AI Experts
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <SafeMotion
              key={index}
              variants={cardVariants}
              initial={isMobile ? { opacity: 1, y: 0 } : "hidden"}
              animate={isMobile ? { opacity: 1, y: 0 } : (inView ? "visible" : "hidden")}
              custom={index}
              className="bg-gradient-to-b from-gray-900/80 to-black/80 border border-gray-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
            >
              <div className="relative h-64 w-full bg-gradient-to-br from-yellow-900/20 to-amber-900/20">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  className="object-cover rounded-t-xl"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={index < 2} // Load first two images with priority
                  onError={(e) => {
                    // Fallback for missing images
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/400x400/111/333?text=" + member.name.split(' ').map(n => n[0]).join('');
                  }}
                />
              </div>
              <div className="p-5">
                <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                <p className="text-yellow-400 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.description}</p>
              </div>
            </SafeMotion>
          ))}
        </div>
      </SafeMotion>

      <SafeMotion
        className="text-center max-w-4xl mx-auto mt-16"
        initial={isMobile ? { opacity: 1, y: 0 } : "hidden"}
        animate={isMobile ? { opacity: 1, y: 0 } : (inView ? "visible" : "hidden")}
        custom={1}
        variants={textVariants}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</h3>
        <p className="text-lg text-gray-300">
          To harness the power of artificial intelligence and create solutions that empower businesses to achieve
          unprecedented growth, efficiency, and innovation. We believe in responsible AI that serves humanity while
          pushing the boundaries of what&apos;s possible.
        </p>
      </SafeMotion>
    </div>
  )
}
