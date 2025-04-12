"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

interface NeuralNetworkProps {
  scrollY: number
}

export default function NeuralNetwork({ scrollY }: NeuralNetworkProps) {
  const ref = useRef<THREE.Points>(null!)
  const pointsRef = useRef<THREE.BufferAttribute>(null!)
  const connectionsRef = useRef<THREE.LineSegments>(null!)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768 || 
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Generate fewer points for all devices
  const count = 150
  
  // Generate random points for the neural network
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20

      // Gradient colors from cyan to purple
      colors[i3] = 0.2 + Math.random() * 0.4 // R
      colors[i3 + 1] = 0.5 + Math.random() * 0.5 // G
      colors[i3 + 2] = 0.8 + Math.random() * 0.2 // B
    }

    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (!ref.current || typeof window === "undefined") return

    const time = state.clock.getElapsedTime()
    const scrollFactor = scrollY * 0.001
    
    // Simple rotation for all devices
    ref.current.rotation.y = time * 0.02 + scrollFactor
  })

  return (
    <group>
      <Points ref={ref} positions={points.positions} colors={points.colors}>
        <PointMaterial
          transparent
          vertexColors
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}
