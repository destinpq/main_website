"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Calendar, X } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { FaWhatsapp, FaPhone } from "react-icons/fa"
import { SafeMotion } from "./framer-motion-safe"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactSectionProps {
  inView: boolean
}

export default function ContactSection({ inView }: ContactSectionProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState<'message' | 'whatsapp'>('message')
  const [showCallModal, setShowCallModal] = useState(false)
  const [callFormState, setCallFormState] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const openWhatsApp = () => {
    window.open(`https://wa.me/9873521968`, '_blank')
  }

  const handleCallFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCallFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleCallFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    
    try {
      const formattedMessage = `
Call Scheduling Request:
------------------------
Name: ${callFormState.name}
Phone: ${callFormState.phone}
Email: ${callFormState.email}
Preferred Date: ${callFormState.preferredDate}
Preferred Time: ${callFormState.preferredTime}
Additional Notes: ${callFormState.message || 'None provided'}
      `.trim()
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Call Scheduling Request',
          message: formattedMessage,
          userEmail: callFormState.email,
          schedule: 'call scheduling'
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSubmitSuccess(true)
        setCallFormState({
          name: "",
          phone: "",
          email: "",
          preferredDate: "",
          preferredTime: "",
          message: ""
        })
        
        // Close modal after 3 seconds
        setTimeout(() => {
          setShowCallModal(false)
          setSubmitSuccess(false)
        }, 3000)
      } else {
        throw new Error(data.error || 'Failed to schedule call')
      }
    } catch (error) {
      console.error('Error scheduling call:', error)
      alert('There was an error scheduling your call. Please try again or contact us via WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) {
    return <div className="w-full min-h-screen bg-black"></div>
  }

  return (
    <div className="relative bg-black w-full overflow-hidden z-10 pt-16 pb-24">
      {/* Subtle background elements */}
      <div className="absolute -top-96 -left-40 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-64 -right-40 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl"></div>
      
      {/* Call Scheduling Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowCallModal(false)}></div>
          <div className="bg-black border border-gray-800 rounded-2xl p-6 md:p-8 max-w-xl w-full z-10 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowCallModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-10 w-10 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Call Scheduled!</h3>
                <p className="text-gray-300 mb-6">
                  Thank you for scheduling a call. We'll contact you shortly to confirm your appointment.
                </p>
                <Button
                  onClick={() => setShowCallModal(false)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2"
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Schedule a Call</h3>
                    <p className="text-gray-400">Let us know when you're available</p>
                  </div>
                </div>
                
                <form onSubmit={handleCallFormSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-yellow-400">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={callFormState.name}
                      onChange={handleCallFormChange}
                      placeholder="Enter your full name"
                      className="bg-black border-[1.5px] border-gray-700 hover:border-yellow-500/50 focus:border-yellow-500 rounded-xl h-12 px-4 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-yellow-400">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={callFormState.phone}
                        onChange={handleCallFormChange}
                        placeholder="Your phone number"
                        className="bg-black border-[1.5px] border-gray-700 hover:border-yellow-500/50 focus:border-yellow-500 rounded-xl h-12 px-4 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-yellow-400">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={callFormState.email}
                        onChange={handleCallFormChange}
                        placeholder="Your email"
                        className="bg-black border-[1.5px] border-gray-700 hover:border-yellow-500/50 focus:border-yellow-500 rounded-xl h-12 px-4 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="preferredDate" className="block text-sm font-medium text-yellow-400">
                        Preferred Date
                      </label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={callFormState.preferredDate}
                        onChange={handleCallFormChange}
                        className="bg-black border-[1.5px] border-gray-700 hover:border-yellow-500/50 focus:border-yellow-500 rounded-xl h-12 px-4 text-white placeholder:text-gray-500"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-yellow-400">
                        Preferred Time
                      </label>
                      <Input
                        id="preferredTime"
                        name="preferredTime"
                        type="time"
                        value={callFormState.preferredTime}
                        onChange={handleCallFormChange}
                        className="bg-black border-[1.5px] border-gray-700 hover:border-yellow-500/50 focus:border-yellow-500 rounded-xl h-12 px-4 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-yellow-400">
                      Additional Notes <span className="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={callFormState.message}
                      onChange={handleCallFormChange}
                      placeholder="Any specific topics you'd like to discuss..."
                      className="bg-black border-[1.5px] border-gray-700 hover:border-yellow-500/50 focus:border-yellow-500 rounded-xl p-4 text-white placeholder:text-gray-500 min-h-[100px] resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg py-5 rounded-xl disabled:opacity-70"
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Call'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <SafeMotion 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-400 text-transparent bg-clip-text mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to harness the power of AI for your business? Contact us today for a consultation.
          </p>
        </SafeMotion>

        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
          {/* Left side - Contact Options */}
          <div className="w-full lg:w-5/12 space-y-6">
            <SafeMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-yellow-500/10 to-yellow-600/5 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/30 transition-all"
            >
              <div className="flex flex-row items-center mb-6">
                <div className="w-14 h-14 flex items-center justify-center bg-yellow-500/20 rounded-full mr-4">
                  <FaWhatsapp className="text-yellow-400 text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">WhatsApp</h3>
                  <p className="text-gray-400">Fastest way to reach us</p>
                </div>
              </div>
              <p className="text-yellow-500 text-lg font-semibold mb-6">+91 9873521968</p>
              <Button 
                onClick={openWhatsApp}
                className="w-full py-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold border-none text-lg"
              >
                Start Chat on WhatsApp
              </Button>
            </SafeMotion>

            <SafeMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-yellow-500/20 transition-all"
            >
              <div className="flex flex-row items-center mb-6">
                <div className="w-14 h-14 flex items-center justify-center bg-yellow-500/10 rounded-full mr-4">
                  <FaPhone className="text-yellow-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Call Us</h3>
                  <p className="text-gray-400">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>
              <p className="text-yellow-500 text-lg font-semibold mb-6">+91 9873521968</p>
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={() => setShowCallModal(true)}
                  className="w-full py-3 bg-black border-[1.5px] border-yellow-500 hover:bg-yellow-500/10 text-yellow-400 font-semibold text-lg rounded-xl"
                >
                  Schedule a Call
                </Button>
                <Button
                  onClick={() => window.location.href = 'mailto:support@destinpq.com'}
                  className="w-full py-3 bg-black border-[1.5px] border-blue-500 hover:bg-blue-500/10 text-blue-400 font-semibold text-lg rounded-xl"
                >
                  Send Email
                </Button>
              </div>
            </SafeMotion>
          </div>

          {/* Right side - Contact Form */}
          <div className="w-full lg:w-7/12">
            <SafeMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-yellow-500/20 transition-all"
            >
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 flex items-center justify-center bg-yellow-500/10 rounded-full mr-4">
                  <Mail className="text-yellow-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Send Message</h3>
                  <p className="text-gray-400">We'll get back to you</p>
                </div>
              </div>

              <ContactForm />
            </SafeMotion>
          </div>
        </div>
      </div>
    </div>
  )
}
