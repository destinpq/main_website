"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Only add event listener if we're in the browser environment
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true })
      window.addEventListener('resize', checkMobile)
      return () => {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener('resize', checkMobile)
      }
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  const navLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Case Studies", href: "#case-studies", id: "case-studies" },
    { name: "Technology", href: "#technology", id: "technology" },
    { name: "Contact", href: "#contact", id: "contact" },
  ]

  const policyLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
    { name: "Refund & Cancellation", href: "/refund-cancellation-policy" },
  ]

  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-3 w-[60px] h-[60px]">
              {/* Outer yellow glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-amber-500 blur-lg opacity-90 scale-125"></div>
              
              {/* Solid black center */}
              <div className="absolute inset-[5%] rounded-full bg-black"></div>
              
              {/* Gradient ring from black to yellow */}
              <div className="absolute inset-[5%] rounded-full bg-gradient-radial from-transparent via-black to-yellow-500/90 blur-md pointer-events-none"></div>
              
              {/* Logo container with pure black background */}
              <div className="absolute inset-[25%] rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full relative flex items-center justify-center bg-black rounded-full">
                  <div className="w-[75%] h-[75%] relative">
                    <Image src="/thunh.png" alt="DestinPQ Logo" fill className="object-contain" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">DESTINPQ</div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg border-b border-yellow-500/20" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-3 w-[60px] h-[60px] cursor-pointer" onClick={() => scrollToSection('hero')}>
              {/* Outer yellow glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-amber-500 blur-lg opacity-90 scale-125"></div>
              
              {/* Solid black center */}
              <div className="absolute inset-[5%] rounded-full bg-black"></div>
              
              {/* Gradient ring from black to yellow */}
              <div className="absolute inset-[5%] rounded-full bg-gradient-radial from-transparent via-black to-yellow-500/90 blur-md pointer-events-none"></div>
              
              {/* Logo container with pure black background */}
              <div className="absolute inset-[25%] rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full relative flex items-center justify-center bg-black rounded-full">
                  <div className="w-[75%] h-[75%] relative">
                    <Image 
                      src="/thunh.png" 
                      alt="DestinPQ Logo" 
                      fill 
                      sizes="60px"
                      priority
                      className="object-contain" 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div 
              className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text cursor-pointer" 
              onClick={() => scrollToSection('hero')}
            >
              DESTINPQ
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <button 
                key={index} 
                onClick={() => scrollToSection(link.id)} 
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                {link.name}
              </button>
            ))}

            {/* Policies Dropdown */}
            <div className="relative">
              <button 
                className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center"
                onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
              >
                Policies <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isPoliciesOpen && (
                <div className="absolute top-full mt-2 w-52 bg-black/95 backdrop-blur-md border border-gray-800 rounded-md shadow-lg z-20">
                  <div className="py-2">
                    {policyLinks.map((link, index) => (
                      <Link 
                        key={index}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <ThemeToggle />

            <Button 
              className="bg-black hover:bg-gray-900 text-white border-2 border-yellow-500"
              onClick={() => scrollToSection('contact')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col pt-20 px-4">
          <div className="flex flex-col space-y-6 items-center">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="text-xl text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer"
                onClick={() => scrollToSection(link.id)}
              >
                {link.name}
              </div>
            ))}

            {/* Mobile Policies Links */}
            <div className="w-full">
              <div className="text-xl text-gray-300 mb-2 text-center">Policies</div>
              <div className="flex flex-col space-y-3">
                {policyLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-lg text-gray-400 hover:text-yellow-400 transition-colors text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-center mb-4">
                <ThemeToggle />
              </div>
              <Button 
                className="bg-black hover:bg-gray-900 text-white border-2 border-yellow-500 w-full mt-4"
                onClick={() => scrollToSection('contact')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
