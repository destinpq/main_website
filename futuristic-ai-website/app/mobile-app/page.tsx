"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  ChevronRight,
  Fingerprint,
  Home,
  Menu,
  MessageSquare,
  Settings,
  User,
} from "lucide-react"

export default function MobileAppPage() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "home" | "dashboard" | "chat">("login")

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginScreen onLogin={() => setCurrentScreen("home")} />
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />
      case "dashboard":
        return <DashboardScreen onBack={() => setCurrentScreen("home")} />
      case "chat":
        return <ChatScreen onBack={() => setCurrentScreen("home")} />
      default:
        return <LoginScreen onLogin={() => setCurrentScreen("home")} />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="relative w-full aspect-[9/19] bg-black border-2 border-gray-800 rounded-[40px] overflow-hidden shadow-2xl">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex items-center justify-between px-6">
            <span className="text-xs">9:41</span>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.33 4.75c2.91 0 5.25 2.34 5.25 5.25v8.75h-10.5V10c0-2.91 2.34-5.25 5.25-5.25z" />
                </svg>
              </div>
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.75 9.75a2 2 0 012-2h16.5a2 2 0 012 2v4.5a2 2 0 01-2 2H3.75a2 2 0 01-2-2v-4.5z" />
                </svg>
              </div>
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.25A9.75 9.75 0 002.25 12c0 5.384 4.365 9.75 9.75 9.75 5.384 0 9.75-4.366 9.75-9.75 0-5.385-4.366-9.75-9.75-9.75zm0 18A8.25 8.25 0 1120.25 12 8.258 8.258 0 0112 20.25z" />
                  <path d="M12 6.5a1 1 0 011 1v4.25h3.25a1 1 0 110 2H12a1 1 0 01-1-1V7.5a1 1 0 011-1z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-20"></div>

          {/* Screen Content */}
          <div className="w-full h-full pt-7">{renderScreen()}</div>
        </div>
      </div>
    </div>
  )
}

interface LoginScreenProps {
  onLogin: () => void
}

function LoginScreen({ onLogin }: LoginScreenProps) {
  const [scanning, setScanning] = useState(false)

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      onLogin()
    }, 2000)
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Neural Network */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-500 rounded-full animate-pulse-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text mb-2">
          DESTINPQ
        </h1>
        <p className="text-gray-400">Intelligent solutions at your fingertips</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative w-32 h-32 mb-12"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 opacity-20 animate-pulse-slow"></div>
        <div className="absolute inset-2 rounded-full border-2 border-yellow-500/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Fingerprint size={64} className="text-yellow-400" />
        </div>
        {scanning && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-yellow-500/0 via-yellow-500/30 to-yellow-500/0"
            initial={{ y: -100 }}
            animate={{ y: 100 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-2">Face Recognition</h2>
        <p className="text-gray-400 text-sm">Scan your face to unlock the application</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <Button
          onClick={handleScan}
          disabled={scanning}
          className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white border-none px-8 py-6"
        >
          {scanning ? "Scanning..." : "Scan Face"}
        </Button>
      </motion.div>
    </div>
  )
}

interface HomeScreenProps {
  onNavigate: (screen: "login" | "home" | "dashboard" | "chat") => void
}

function HomeScreen({ onNavigate }: HomeScreenProps) {
  const menuItems = [
    {
      title: "AI Dashboard",
      description: "View your AI models and analytics",
      icon: <Brain className="text-yellow-400" size={24} />,
      action: () => onNavigate("dashboard"),
    },
    {
      title: "Neural Assistant",
      description: "Chat with your personal AI assistant",
      icon: <MessageSquare className="text-amber-400" size={24} />,
      action: () => onNavigate("chat"),
    },
    {
      title: "User Profile",
      description: "Manage your account settings",
      icon: <User className="text-blue-400" size={24} />,
      action: () => {},
    },
    {
      title: "Settings",
      description: "Configure app preferences",
      icon: <Settings className="text-green-400" size={24} />,
      action: () => {},
    },
  ]

  return (
    <div className="w-full h-full bg-black flex flex-col">
      {/* Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-gray-400">Alex Johnson</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu size={24} className="text-white" />
          </Button>
        </div>

        {/* Status Card */}
        <motion.div
          className="w-full p-4 bg-gradient-to-br from-yellow-900/30 to-amber-900/30 backdrop-blur-sm rounded-xl border border-gray-800/50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">AI Processing</p>
              <h3 className="text-xl font-bold text-white">84% Complete</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center">
                <span className="text-xs font-bold">84%</span>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-500 to-amber-600 h-2 rounded-full"
              style={{ width: "84%" }}
            ></div>
          </div>
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-6 pb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className="w-full p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 flex items-center cursor-pointer hover:border-yellow-900/50 transition-all duration-300"
              onClick={item.action}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
              <ChevronRight size={20} className="text-gray-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800 p-4">
        <div className="flex items-center justify-around">
          <Button variant="ghost" size="icon" className="text-yellow-400">
            <Home size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Brain size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <MessageSquare size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <User size={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface DashboardScreenProps {
  onBack: () => void
}

function DashboardScreen({ onBack }: DashboardScreenProps) {
  const metrics = [
    { label: "Active Models", value: "12", change: "+2", positive: true },
    { label: "Processing Power", value: "84%", change: "+7%", positive: true },
    { label: "Accuracy Rate", value: "97.8%", change: "+0.3%", positive: true },
    { label: "Response Time", value: "42ms", change: "-8ms", positive: true },
  ]

  const activities = [
    { time: "09:45 AM", event: "Model training completed", status: "success" },
    { time: "11:20 AM", event: "New data batch processed", status: "success" },
    { time: "01:15 PM", event: "System optimization", status: "in-progress" },
    { time: "03:30 PM", event: "Scheduled maintenance", status: "pending" },
  ]

  return (
    <div className="w-full h-full bg-black flex flex-col">
      {/* Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
            <ArrowLeft size={24} className="text-white" />
          </Button>
          <h1 className="text-2xl font-bold text-white">AI Dashboard</h1>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="p-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <p className="text-gray-400 text-xs mb-1">{metric.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-xl font-bold text-white">{metric.value}</h3>
                <span className={`text-xs font-medium ${metric.positive ? "text-green-500" : "text-red-500"}`}>
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Visualization */}
        <motion.div
          className="w-full p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-800/50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Neural Activity</h3>
            <Button variant="ghost" size="sm" className="text-yellow-400 h-8 px-2">
              View All
            </Button>
          </div>

          <div className="h-32 flex items-end space-x-1">
            {Array.from({ length: 24 }).map((_, i) => {
              const height = 20 + Math.random() * 80
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-yellow-500 to-amber-600 rounded-sm"
                  style={{ height: `${height}%` }}
                ></div>
              )
            })}
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <Button variant="ghost" size="sm" className="text-yellow-400 h-8 px-2">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              className="w-full p-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <div
                className={`w-3 h-3 rounded-full mr-3 ${
                  activity.status === "success"
                    ? "bg-green-500"
                    : activity.status === "in-progress"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-white text-sm">{activity.event}</p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
              <ArrowRight size={16} className="text-yellow-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ChatScreenProps {
  onBack: () => void
}

function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === "") return;
    
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user"
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help with that! Could you provide more details?",
        "That's an interesting question about our AI solutions. Let me explain how we approach this.",
        "Based on your inquiry, I'd recommend scheduling a demo with our team to see our technology in action.",
        "Our neural network technology could be perfect for solving this challenge. Would you like to learn more?",
        "I can connect you with one of our AI specialists who can provide more specific information about this use case."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot"
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

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
            <p className="text-xs text-yellow-400">Online • Instant Support</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-yellow-600 to-amber-600 text-white"
                  : "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
              }`}
            >
              {message.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/80 backdrop-blur-md">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:border-yellow-500"
          />
          <button type="submit" className="p-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white border border-yellow-500 rounded-r-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
