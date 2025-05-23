"use client"

// Fix the incomplete ChatScreen component
import type React from "react"
import { useState } from "react"
import { ArrowLeft, Brain, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface ChatScreenProps {
  onBack: () => void
}

function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState([{ id: 1, text: "Hello! How can I assist you today?", sender: "bot" }])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (inputValue.trim() === "") return

    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsTyping(true)

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

      const newBotMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
      }

      setMessages((prev) => [...prev, newBotMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="w-full h-full bg-black flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
            <ArrowLeft size={20} className="text-white" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">Neural Assistant</h1>
            <p className="text-xs text-cyan-400">Online • Instant Support</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              <p>{message.text}</p>
            </div>
          </motion.div>
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
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-gray-900/50">
        <div className="flex items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
          />
          <Button
            type="submit"
            className="ml-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
            disabled={inputValue.trim() === ""}
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChatScreen
