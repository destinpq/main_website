"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"

// Conditional components that either use real animations or render without animations
export function SafeMotion(props: HTMLMotionProps<"div">) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Check if we're on mobile based on screen width or user agent
    const checkMobile = () => {
      const isMobileScreen = window.innerWidth < 768
      setIsMobile(isMobileScreen)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // On mobile, just render a div without animations
  if (isMobile) {
    // Type assertion to avoid type errors when passing motion props to a regular div
    const { animate, initial, exit, transition, variants, ...divProps } = props as any
    return <div {...divProps} />
  }
  
  // On desktop, use framer-motion animations
  return <motion.div {...props} />
}

export function SafeAnimatePresence(props: { children: React.ReactNode; mode?: "sync" | "wait" | "popLayout" }) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Check if we're on mobile based on screen width
    const checkMobile = () => {
      const isMobileScreen = window.innerWidth < 768
      setIsMobile(isMobileScreen)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // On mobile, just render children directly without animations
  if (isMobile) {
    return <>{props.children}</>
  }
  
  // On desktop, use AnimatePresence for animations
  return <AnimatePresence {...props}>{props.children}</AnimatePresence>
}
