"use client"

import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/navbar"
import ChatbotAssistant from "@/components/chatbot-assistant"

// Import sections individually to help identify the problematic component
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import CaseStudiesSection from "@/components/case-studies-section"
import TechStackSection from "@/components/tech-stack-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const caseStudiesRef = useRef(null)
  const techStackRef = useRef(null)
  const contactRef = useRef(null)

  // Use a client-side only flag to prevent any server-side DOM access
  const [isClient, setIsClient] = useState(false)

  // Initialize inView states with default values
  const [heroInView, setHeroInView] = useState(false)
  const [aboutInView, setAboutInView] = useState(false)
  const [servicesInView, setServicesInView] = useState(false)
  const [caseStudiesInView, setCaseStudiesInView] = useState(false)
  const [techStackInView, setTechStackInView] = useState(false)
  const [contactInView, setContactInView] = useState(false)

  useEffect(() => {
    // Set client-side flag after component mounts
    setIsClient(true)

    // Safe event listener setup
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => {
          setHeroInView(entry.isIntersecting)
        },
        { threshold: 0.5 },
      )

      const aboutObserver = new IntersectionObserver(
        ([entry]) => {
          setAboutInView(entry.isIntersecting)
        },
        { threshold: 0.3 },
      )

      const servicesObserver = new IntersectionObserver(
        ([entry]) => {
          setServicesInView(entry.isIntersecting)
        },
        { threshold: 0.3 },
      )

      const caseStudiesObserver = new IntersectionObserver(
        ([entry]) => {
          setCaseStudiesInView(entry.isIntersecting)
        },
        { threshold: 0.3 },
      )

      const techStackObserver = new IntersectionObserver(
        ([entry]) => {
          setTechStackInView(entry.isIntersecting)
        },
        { threshold: 0.3 },
      )

      const contactObserver = new IntersectionObserver(
        ([entry]) => {
          setContactInView(entry.isIntersecting)
        },
        { threshold: 0.3 },
      )

      if (heroRef.current) heroObserver.observe(heroRef.current)
      if (aboutRef.current) aboutObserver.observe(aboutRef.current)
      if (servicesRef.current) servicesObserver.observe(servicesRef.current)
      if (caseStudiesRef.current) caseStudiesObserver.observe(caseStudiesRef.current)
      if (techStackRef.current) techStackObserver.observe(techStackRef.current)
      if (contactRef.current) contactObserver.observe(contactRef.current)

      return () => {
        heroObserver.disconnect()
        aboutObserver.disconnect()
        servicesObserver.disconnect()
        caseStudiesObserver.disconnect()
        techStackObserver.disconnect()
        contactObserver.disconnect()
      }
    }
  }, [isClient])

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <Navbar />

      {/* Main Content */}
      <div className="relative z-10">
        <section ref={heroRef} id="hero" className="min-h-screen">
          {isClient && <HeroSection inView={heroInView} />}
        </section>

        <section ref={aboutRef} id="about" className="min-h-screen py-20">
          {isClient && <AboutSection inView={aboutInView} />}
        </section>

        <section ref={servicesRef} id="services" className="min-h-screen py-20">
          {isClient && <ServicesSection inView={servicesInView} />}
        </section>

        <section ref={caseStudiesRef} id="case-studies" className="min-h-screen py-20">
          {isClient && <CaseStudiesSection inView={caseStudiesInView} />}
        </section>

        <section ref={techStackRef} id="technology" className="min-h-screen py-20">
          {isClient && <TechStackSection inView={techStackInView} />}
        </section>

        <section ref={contactRef} id="contact" className="min-h-screen py-20">
          {isClient && <ContactSection inView={contactInView} />}
        </section>
      </div>

      {/* Chatbot Assistant */}
      {isClient && <ChatbotAssistant />}
    </main>
  )
}
