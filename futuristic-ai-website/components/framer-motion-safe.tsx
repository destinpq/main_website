"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion as framerMotion, AnimatePresence, type Transition } from "framer-motion"

// Check if we're on a mobile device
const isMobile = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Safe versions of framer-motion components that only render on the client side
export function SafeMotion(props: React.ComponentProps<typeof framerMotion.div>) {
  const [isMounted, setIsMounted] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Check for reduced motion preference or mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobileDevice = isMobile()
    setIsReducedMotion(prefersReducedMotion || isMobileDevice)
  }, [])

  if (!isMounted) {
    return <div style={props.style as React.CSSProperties} className={props.className} />
  }

  // For mobile devices or reduced motion preference, simplify animations
  if (isReducedMotion) {
    // Apply simplified transitions for better performance on mobile
    const simplifiedProps = {
      ...props,
      // Override with simpler transitions for better performance
      transition: {
        duration: 0.3,
        type: 'tween' as const,
        delay: 0,
      } as Transition,
    }
    return <framerMotion.div {...simplifiedProps} />
  }

  return <framerMotion.div {...props} />
}

export function SafeAnimatePresence(props: React.ComponentProps<typeof AnimatePresence>) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <>{props.children}</>
  }

  return <AnimatePresence {...props} />
}
