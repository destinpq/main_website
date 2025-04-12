"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Mail, MessageSquare, Phone, Video } from "lucide-react"
import { SafeMotion } from "@/components/framer-motion-safe"

interface ContactSectionProps {
  inView: boolean
}

export default function ContactSection({ inView }: ContactSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formState)
    alert("Thank you for your message! We'll be in touch soon.")
    setFormState({ name: "", email: "", company: "", message: "" })
  }

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

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  if (!isMounted) {
    return (
      <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300">
            Ready to transform your business with cutting-edge AI solutions? Let's start a conversation.
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
        custom={0}
        variants={textVariants}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text mb-6">
          Get in Touch
        </h2>
        <p className="text-xl text-gray-300">
          Ready to transform your business with cutting-edge AI solutions? Let's start a conversation.
        </p>
      </SafeMotion>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Contact Form */}
        <SafeMotion
          className="w-full lg:w-2/3"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={formVariants}
        >
          <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
            {/* Holographic effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 pointer-events-none"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <SafeMotion variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500"
                    required
                  />
                </SafeMotion>

                <SafeMotion variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your.email@company.com"
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500"
                    required
                  />
                </SafeMotion>

                <SafeMotion variants={itemVariants} className="md:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500"
                  />
                </SafeMotion>

                <SafeMotion variants={itemVariants} className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry"
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500 min-h-[150px]"
                    required
                  />
                </SafeMotion>
              </div>

              <SafeMotion variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white border-none py-6 text-lg"
                >
                  Send Message
                </Button>
              </SafeMotion>
            </form>
          </div>
        </SafeMotion>

        {/* Contact Info */}
        <SafeMotion
          className="w-full lg:w-1/3"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          variants={textVariants}
        >
          <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 h-full">
            <h3 className="text-2xl font-bold text-white mb-6">Connect with us</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mr-4">
                  <Mail className="text-white" size={18} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Email</h4>
                  <p className="text-gray-300">contact@nexusai.tech</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mr-4">
                  <Phone className="text-white" size={18} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Phone</h4>
                  <p className="text-gray-300">+1 (888) 555-NEXUS</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mr-4">
                  <MessageSquare className="text-white" size={18} />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Live Chat</h4>
                  <p className="text-gray-300">Available 24/7 via our AI assistant</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-800">
                <h4 className="text-lg font-medium text-white mb-4">Schedule a meeting</h4>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-950/30 flex items-center justify-center"
                  >
                    <Calendar className="mr-2" size={18} />
                    Book a Demo
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-amber-500 text-amber-400 hover:bg-amber-950/30 flex items-center justify-center"
                  >
                    <Video className="mr-2" size={18} />
                    Schedule Video Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SafeMotion>
      </div>
    </div>
  )
}
