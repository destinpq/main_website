"use client"

import { useRef, useMemo } from "react"
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

  // Generate random points for the neural network
  const count = 500
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

    // Rotate the entire neural network
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.2
    ref.current.rotation.y = time * 0.05 + scrollFactor

    // Update point positions to create a pulsing effect
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const y = positions[i3 + 1]
      const z = positions[i3 + 2]

      // Apply subtle movement
      positions[i3] = x + Math.sin(time + i) * 0.01
      positions[i3 + 1] = y + Math.cos(time + i) * 0.01
      positions[i3 + 2] = z + Math.sin(time * 0.5 + i) * 0.01
    }

    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group>
      <Points ref={ref} positions={points.positions} colors={points.colors}>
        <PointMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}
