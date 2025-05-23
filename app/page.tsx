"use client"

import { useEffect, useState, useRef } from 'react'
import HeroSection from '@/components/hero-section'
import Navbar from '@/components/navbar'
import AboutSection from '@/components/about-section'
import ServicesSection from '@/components/services-section'
import CaseStudiesSection from '@/components/case-studies-section'
import TechStackSection from '@/components/tech-stack-section'
import ContactSection from '@/components/contact-section'
import ChatbotAssistant from "@/components/chatbot-assistant"
import Footer from '@/components/footer'

// Custom hook to detect if element is in view
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref.current, options]);
  
  return { ref, inView };
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Create refs with a triggerOnce behavior to prevent flickering
  const hero = useInView({ threshold: 0.1 });
  const about = useInView({ threshold: 0.1 });
  const services = useInView({ threshold: 0.1 });
  const caseStudies = useInView({ threshold: 0.1 });
  const techStack = useInView({ threshold: 0.1 });
  const contact = useInView({ threshold: 0.1 });

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isMounted) return null

  return (
    <main className="min-h-screen overflow-hidden bg-black">
      <Navbar />
      
      {/* Each section needs to seamlessly connect with others to prevent gaps */}
      <section ref={hero.ref} id="hero" className="relative bg-black">
        <HeroSection inView={hero.inView} />
        <div className="bg-black h-8 -mt-8"></div> {/* Ensure no gap */}
      </section>
      
      <section ref={about.ref} id="about" className="relative bg-black">
        <AboutSection inView={about.inView} />
        <div className="bg-black h-8 -mt-8"></div> {/* Ensure no gap */}
      </section>
      
      <section ref={services.ref} id="services" className="relative bg-black">
        <ServicesSection inView={services.inView} />
        <div className="bg-black h-8 -mt-8"></div> {/* Ensure no gap */}
      </section>
      
      <section ref={caseStudies.ref} id="case-studies" className="relative bg-black">
        <CaseStudiesSection inView={caseStudies.inView} />
        <div className="bg-black h-8 -mt-8"></div> {/* Ensure no gap */}
      </section>
      
      <section ref={techStack.ref} id="technology" className="relative bg-black">
        <TechStackSection inView={techStack.inView} />
        <div className="bg-black h-8 -mt-8"></div> {/* Ensure no gap */}
      </section>
      
      <section ref={contact.ref} id="contact" className="relative bg-black">
        <ContactSection inView={contact.inView} />
      </section>

      {/* Footer with links to policy pages */}
      <Footer />

      {/* Chatbot Assistant */}
      <ChatbotAssistant />
    </main>
  )
}
