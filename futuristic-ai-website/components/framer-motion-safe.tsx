"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion as framerMotion, type AnimatePresence as framerAnimatePresence } from "framer-motion"

// Safe versions of framer-motion components that only render on the client side
export function SafeMotion(props: React.ComponentProps<typeof framerMotion.div>) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div style={props.style} className={props.className} />
  }

  return <framerMotion.div {...props} />
}

export function SafeAnimatePresence(props: React.ComponentProps<typeof framerAnimatePresence>) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <>{props.children}</>
  }

  return <framerAnimatePresence {...props} />
}
