"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, X } from "lucide-react"
import { SafeMotion, SafeAnimatePresence } from "@/components/framer-motion-safe"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

type EmailSchedule = "immediately" | "daily" | "weekly" | "never"

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [showEmailSchedule, setShowEmailSchedule] = useState(false)
  const [emailSchedule, setEmailSchedule] = useState<EmailSchedule>("immediately")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToBottom = () => {
    if (messagesEndRef.current && typeof window !== "undefined") {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (isOpen && isMounted) {
      scrollToBottom()
    }
  }, [messages, isOpen, isMounted])

  // Function to send email notification
  const sendEmailNotification = async (messageText: string) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: 'New Chatbot Message',
          message: messageText,
          userEmail: userEmail || undefined,
          schedule: emailSchedule
        }),
      });

      const data = await response.json();
      if (!data.success) {
        console.error('Failed to send email notification:', data.error);
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (inputValue.trim() === "") return

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    
    // Send email notification if schedule is set to immediately
    if (emailSchedule === "immediately" && userEmail) {
      sendEmailNotification(inputValue);
    }
    
    setInputValue("")
    setIsTyping(true)

    // If this is the second user message and we don't have their email, ask for it
    if (messages.filter(m => m.sender === "user").length === 1 && !userEmail && !showEmailInput) {
      setTimeout(() => {
        const emailRequestMessage: Message = {
          id: messages.length + 2,
          text: "Would you like to leave your email so we can follow up with you?",
          sender: "bot",
          timestamp: new Date(),
        }
        
        setMessages((prev) => [...prev, emailRequestMessage])
        setIsTyping(false)
        setShowEmailInput(true)
      }, 1500);
      return;
    }

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help with that! Could you provide more details?",
        "That's an interesting question about our AI solutions. Let me explain how we approach this.",
        "Based on your inquiry, I'd recommend scheduling a demo with our team to see our technology in action.",
        "Our neural network technology could be perfect for solving this challenge. Would you like to learn more?",
        "I can connect you with one of our AI specialists who can provide more specific information about this use case.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const newBotMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newBotMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userEmail.trim() === "") return;
    
    setShowEmailInput(false);
    setShowEmailSchedule(true);
    
    // Send a message asking about email schedule
    const newBotMessage: Message = {
      id: messages.length + 1,
      text: `Thanks for your email! How often would you like to receive updates from us?`,
      sender: "bot",
      timestamp: new Date(),
    }
    
    setMessages((prev) => [...prev, newBotMessage]);
  }
  
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setShowEmailSchedule(false);
    
    // Send a confirmation message
    const scheduleText = emailSchedule === "immediately" ? "immediately" : 
                        emailSchedule === "daily" ? "in daily digests" :
                        emailSchedule === "weekly" ? "in weekly summaries" : "never";
                        
    const newBotMessage: Message = {
      id: messages.length + 1,
      text: `Thank you! We'll send updates to ${userEmail} ${emailSchedule !== "never" ? scheduleText : "only when you request them"}.`,
      sender: "bot",
      timestamp: new Date(),
    }
    
    setMessages((prev) => [...prev, newBotMessage]);
    toast.success("Email preferences saved!");
  }

  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Chat Button */}
      <SafeMotion
        className="fixed bottom-6 right-6 z-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full ${
            isOpen ? "bg-gradient-to-r from-red-500 to-pink-500" : "bg-gradient-to-r from-yellow-500 to-amber-600"
          } shadow-lg flex items-center justify-center`}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </Button>
      </SafeMotion>

      {/* Chat Window */}
      <SafeAnimatePresence>
        {isOpen && (
          <SafeMotion
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-black/90 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl z-20 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 p-4 border-b border-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mr-3">
                  <MessageSquare className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium">AI Assistant</h3>
                  <p className="text-gray-300 text-sm">Online | Instant Support</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-yellow-600 to-amber-600 text-white"
                        : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-2xl px-4 py-2 text-gray-200">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {showEmailInput && (
                <div className="flex justify-start w-full">
                  <div className="bg-gray-800 rounded-2xl px-4 py-3 text-gray-200 w-full">
                    <form onSubmit={handleEmailSubmit} className="flex flex-col space-y-2">
                      <Input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="bg-gray-900 border-gray-700 text-white"
                        required
                      />
                      <div className="flex space-x-2">
                        <Button 
                          type="submit" 
                          className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white w-full"
                        >
                          Submit
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          className="border-gray-700 text-gray-300 w-full"
                          onClick={() => setShowEmailInput(false)}
                        >
                          Skip
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {showEmailSchedule && (
                <div className="flex justify-start w-full">
                  <div className="bg-gray-800 rounded-2xl px-4 py-3 text-gray-200 w-full">
                    <form onSubmit={handleScheduleSubmit} className="flex flex-col space-y-3">
                      <p className="text-sm mb-1">When would you like to receive emails?</p>
                      <RadioGroup 
                        value={emailSchedule} 
                        onValueChange={(value) => setEmailSchedule(value as EmailSchedule)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="immediately" id="immediately" />
                          <Label htmlFor="immediately" className="text-sm">Immediately</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="daily" id="daily" />
                          <Label htmlFor="daily" className="text-sm">Daily digest</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label htmlFor="weekly" className="text-sm">Weekly summary</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="never" id="never" />
                          <Label htmlFor="never" className="text-sm">Only when I ask</Label>
                        </div>
                      </RadioGroup>
                      <div className="flex space-x-2 mt-2">
                        <Button 
                          type="submit" 
                          className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white w-full"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-gray-900/50">
              <div className="flex items-center">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-500"
                  disabled={showEmailInput || showEmailSchedule}
                />
                <Button
                  type="submit"
                  className="ml-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white"
                  disabled={inputValue.trim() === "" || showEmailInput || showEmailSchedule}
                >
                  <Send size={18} />
                </Button>
              </div>
            </form>
          </SafeMotion>
        )}
      </SafeAnimatePresence>
    </>
  )
}
