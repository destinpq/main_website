"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight, Brain, Cpu, Database, LineChart, MessageSquare, Network, ChevronRight, Menu, X } from "lucide-react"
import { FaPhone, FaRegEnvelope, FaRocketchat } from "react-icons/fa"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function MobilePage() {
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    // On desktop, redirect to main site
    if (window.innerWidth >= 768) {
      window.location.href = '/'
    }
  }, [])

  const handleScroll = (id: string) => {
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      // Direct scroll, no smooth behavior
      window.scrollTo(0, element.offsetTop)
    }
    setActiveSection(id)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! We'll be in touch soon.")
    setFormState({ name: "", email: "", company: "", message: "" })
  }

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "Services", id: "services" },
    { name: "Tech Stack", id: "tech-stack" },
    { name: "Case Studies", id: "case-studies" },
    { name: "Contact", id: "contact" },
  ]

  const services = [
    {
      title: "Neural Networks",
      description: "Custom-built neural architectures for your specific needs.",
      icon: <Brain className="text-white" size={24} />,
    },
    {
      title: "Predictive Analytics",
      description: "Advanced predictive models for forecasting trends.",
      icon: <LineChart className="text-white" size={24} />,
    },
    {
      title: "Generative AI",
      description: "Generative models tailored to your brand and needs.",
      icon: <Cpu className="text-white" size={24} />,
    },
    {
      title: "Conversational AI",
      description: "Intelligent chatbots that understand natural language.",
      icon: <MessageSquare className="text-white" size={24} />,
    },
    {
      title: "Computer Vision",
      description: "Image recognition and visual analysis systems.",
      icon: <Network className="text-white" size={24} />,
    },
    {
      title: "Big Data Processing",
      description: "Transform massive datasets into actionable insights.",
      icon: <Database className="text-white" size={24} />,
    },
  ]

  const techCategories = ["all", "ML Frameworks", "AI Services", "Infrastructure", "Cloud Services", "Databases", "Frontend", "Backend", "Mobile Development"]
  
  const techStack = [
    { name: "TensorFlow", category: "ML Frameworks", description: "Open-source ML framework" },
    { name: "PyTorch", category: "ML Frameworks", description: "ML library based on Torch" },
    { name: "OpenAI API", category: "AI Services", description: "Access to powerful LLMs" },
    { name: "Kubernetes", category: "Infrastructure", description: "Container orchestration" },
    { name: "AWS", category: "Cloud Services", description: "Amazon's cloud platform" },
    { name: "Google Cloud", category: "Cloud Services", description: "Google's cloud services" },
    { name: "MongoDB", category: "Databases", description: "NoSQL document database" },
    { name: "PostgreSQL", category: "Databases", description: "Relational database system" },
    { name: "React", category: "Frontend", description: "UI library for web apps" },
    { name: "Next.js", category: "Frontend", description: "React framework with SSR" },
    { name: "Node.js", category: "Backend", description: "JavaScript runtime" },
    { name: "Nest.js", category: "Backend", description: "Node.js framework" },
    { name: "Flutter", category: "Mobile Development", description: "UI toolkit for mobile apps" },
    { name: "Android/iOS", category: "Mobile Development", description: "Native mobile platforms" },
  ]
  
  const filteredTech = selectedCategory === "all" 
    ? techStack 
    : techStack.filter(item => item.category === selectedCategory)
  
  const caseStudies = [
    {
      title: "AI-Powered Financial Forecasting",
      client: "Global Investment Firm",
      description: "Developed a sophisticated ML model that increased prediction accuracy by 35%.",
      image: "/placeholder.svg",
      results: ["35% higher accuracy", "Saved $2.4M annually", "95% client satisfaction"]
    },
    {
      title: "Smart Manufacturing Optimization",
      client: "Manufacturing Corp",
      description: "Implemented AI systems that reduced waste and increased production efficiency.",
      image: "/placeholder.svg",
      results: ["28% reduction in waste", "19% efficiency increase", "ROI in 4 months"]
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-2 w-[40px] h-[40px]">
              <Image 
                src="/thunh.png" 
                alt="DestinPQ Logo" 
                fill 
                sizes="40px"
                priority
                className="object-contain" 
              />
            </div>
            <div className="text-xl font-bold text-yellow-400">
              DESTINPQ
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-gray-800">
          <div className="flex flex-col space-y-4 items-center pt-4">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleScroll(link.id)}
                className={`text-xl ${activeSection === link.id ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                {link.name}
              </button>
            ))}
            
            <Button 
              className="bg-black text-white border-2 border-yellow-500 w-full mt-4"
              onClick={() => handleScroll('contact')}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="pt-16 pb-12 px-4 flex flex-col items-center">
        <div className="relative mb-8 w-[250px] h-[250px]">
          <Image 
            src="/thunh.png" 
            alt="DestinPQ Logo" 
            fill
            sizes="210px"
            className="object-contain" 
            priority
          />
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-yellow-400 pb-3">
            Designing Tomorrow&apos;s Intelligence
          </div>

          <div className="mt-4 text-base text-gray-300 px-2">
            Pioneering the future of AI and machine learning solutions that transform industries.
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Button
              size="lg"
              className="bg-black text-white border-2 border-yellow-500 px-6 py-5 text-base"
              onClick={() => handleScroll('services')}
            >
              Explore Solutions
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-500 text-yellow-400 px-6 py-5 text-base"
              onClick={() => handleScroll('case-studies')}
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 px-4 bg-black">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Our Services
          </h2>
          <p className="text-gray-300">Cutting-edge AI solutions for your business</p>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <Card key={index} className="bg-black border border-gray-800 p-6 rounded-xl">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center mb-3">
                  {service.icon}
                </div>
                <CardTitle className="text-xl text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-yellow-500">
                  <span className="mr-2">Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-8 px-4 bg-black">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Our Technology Stack
          </h2>
          <p className="text-gray-300">
            Cutting-edge technologies to deliver AI solutions
          </p>
        </div>

        {/* Tech Categories */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2 whitespace-nowrap">
            {techCategories.map((category, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Items */}
        <div className="space-y-3">
          {filteredTech.map((tech, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-lg p-3"
            >
              <h3 className="text-lg font-bold text-white mb-1">{tech.name}</h3>
              <p className="text-xs text-yellow-400 mb-1">{tech.category}</p>
              <p className="text-sm text-gray-400">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-8 px-4 bg-black">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">
            Case Studies
          </h2>
          <p className="text-gray-300">
            Success stories from our clients
          </p>
        </div>

        <div className="space-y-6">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-black border border-gray-800">
              <div className="aspect-video bg-purple-900 relative">
                <Image
                  src={study.image}
                  alt={study.title}
                  className="object-cover"
                  fill
                />
              </div>
              
              <div className="p-4">
                <p className="text-yellow-400 mb-2">Client: {study.client}</p>
                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-gray-400 mb-4">{study.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Key Results:</h4>
                  <ul className="space-y-1">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-cyan-500 mr-2">•</span>
                        <span className="text-gray-300">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" className="border-yellow-500 text-yellow-400 w-full">
                  View Details <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 px-4 bg-black">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-300">
            Ready to harness AI for your business?
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-black border border-gray-800 rounded-xl p-4 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Send us a message</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleFormChange}
                  placeholder="your.email@company.com"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleFormChange}
                  placeholder="Your company name"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleFormChange}
                  placeholder="Tell us about your project"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <button 
                className="bg-yellow-600 text-white py-3 px-8 rounded-full w-full"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="bg-black border border-gray-800 rounded-xl p-4">
            <div className="flex items-start">
              <div className="bg-blue-900 p-2 rounded-full mr-3">
                <FaRegEnvelope className="text-blue-400 text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-1">Email Us</h4>
                <p className="text-gray-400 text-sm mb-2">We'll respond within 24 hours</p>
                <Button variant="ghost" className="text-blue-400 p-0 h-auto font-normal text-sm">
                  contact@youraicompany.com
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-black border border-gray-800 rounded-xl p-4">
            <div className="flex items-start">
              <div className="bg-green-900 p-2 rounded-full mr-3">
                <FaPhone className="text-green-400 text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-1">Call Us</h4>
                <p className="text-gray-400 text-sm mb-2">Mon-Fri from 9am to 6pm</p>
                <Button variant="ghost" className="text-green-400 p-0 h-auto font-normal text-sm">
                  +1 (555) 123-4567
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2025 DestinPQ. All rights reserved.
        </div>
      </section>
    </div>
  )
} 