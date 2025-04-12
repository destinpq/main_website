"use client"

import { useRef, useState, useEffect } from "react"
import { SafeMotion } from "@/components/framer-motion-safe"

interface TechItem {
  name: string
  category: string
  description: string
}

interface TechStackSectionProps {
  inView: boolean
}

export default function TechStackSection({ inView }: TechStackSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const techStack: TechItem[] = [
    {
      name: "TensorFlow",
      category: "ML Frameworks",
      description: "Open-source machine learning framework for high-performance numerical computation",
    },
    {
      name: "PyTorch",
      category: "ML Frameworks",
      description: "Open source machine learning library based on the Torch library",
    },
    {
      name: "Keras",
      category: "ML Frameworks",
      description: "High-level neural networks API, written in Python and capable of running on top of TensorFlow",
    },
    {
      name: "CUDA",
      category: "Hardware Acceleration",
      description: "Parallel computing platform and API model created by NVIDIA",
    },
    {
      name: "OpenAI API",
      category: "AI Services",
      description: "Access to powerful language models like GPT-4 for natural language processing",
    },
    {
      name: "Hugging Face",
      category: "AI Services",
      description: "AI community and platform providing access to thousands of pretrained models",
    },
    {
      name: "Kubernetes",
      category: "Infrastructure",
      description:
        "Open-source system for automating deployment, scaling, and management of containerized applications",
    },
    {
      name: "Docker",
      category: "Infrastructure",
      description: "Platform for developing, shipping, and running applications in containers",
    },
    {
      name: "AWS",
      category: "Cloud Services",
      description: "Comprehensive cloud computing platform provided by Amazon",
    },
    {
      name: "Google Cloud",
      category: "Cloud Services",
      description: "Suite of cloud computing services that runs on the same infrastructure that Google uses",
    },
    {
      name: "Azure",
      category: "Cloud Services",
      description: "Microsoft's cloud computing platform for building, testing, and managing applications",
    },
    {
      name: "MongoDB",
      category: "Databases",
      description: "Source-available cross-platform document-oriented database program",
    },
    {
      name: "PostgreSQL",
      category: "Databases",
      description: "Powerful, open source object-relational database system",
    },
    {
      name: "SQL",
      category: "Databases",
      description: "Standard language for storing, manipulating, and retrieving data in relational databases",
    },
    {
      name: "Neo4j",
      category: "Databases",
      description: "Graph database management system designed for storing and querying complex network structures",
    },
    { 
      name: "React", 
      category: "Frontend", 
      description: "JavaScript library for building user interfaces" 
    },
    { 
      name: "Angular", 
      category: "Frontend", 
      description: "Platform and framework for building single-page client applications using HTML and TypeScript" 
    },
    { 
      name: "Next.js", 
      category: "Frontend", 
      description: "React framework that enables server-side rendering and static site generation for web applications" 
    },
    { 
      name: "Node.js", 
      category: "Backend", 
      description: "JavaScript runtime built on Chrome's V8 JavaScript engine" 
    },
    { 
      name: "Nest.js", 
      category: "Backend", 
      description: "Progressive Node.js framework for building efficient, reliable, and scalable server-side applications" 
    },
    { 
      name: "Flutter", 
      category: "Mobile Development", 
      description: "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase" 
    },
    { 
      name: "iOS (Swift/SwiftUI)", 
      category: "Mobile Development", 
      description: "Apple's development ecosystem for building applications for iPhone, iPad, and other Apple devices" 
    },
    { 
      name: "Android (Kotlin/Java)", 
      category: "Mobile Development", 
      description: "Google's platform for creating applications for Android devices with support for modern programming languages" 
    },
  ]

  const categories = ["all", ...Array.from(new Set(techStack.map((item) => item.category)))]

  const filteredTech =
    selectedCategory === "all" ? techStack : techStack.filter((item) => item.category === selectedCategory)

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  if (!isMounted) {
    return (
      <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text mb-6">
            Our Technology Stack
          </h2>
          <p className="text-xl text-gray-300">
            Powered by cutting-edge technologies to deliver unparalleled AI solutions
          </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <SafeMotion
        className="text-center max-w-4xl mx-auto mb-16"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={textVariants}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text mb-6">
          Our Technology Stack
        </h2>
        <p className="text-xl text-gray-300">
          Powered by cutting-edge technologies to deliver unparalleled AI solutions
        </p>
      </SafeMotion>

      {/* Tech Stack Categories */}
      <div className="w-full max-w-7xl mx-auto mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category, index) => (
            <SafeMotion
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-yellow-600 to-amber-600 text-white"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
              onClick={() => setSelectedCategory(category)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </SafeMotion>
          ))}
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTech.map((tech, index) => (
            <SafeMotion
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-yellow-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-1">{tech.name}</h3>
              <p className="text-sm text-yellow-400 mb-2">{tech.category}</p>
              <p className="text-gray-400">{tech.description}</p>
            </SafeMotion>
          ))}
        </div>
      </div>
    </div>
  )
}
