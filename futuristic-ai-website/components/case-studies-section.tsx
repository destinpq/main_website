"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SafeMotion } from "@/components/framer-motion-safe"
import { fetchCaseStudies } from "@/lib/google-sheets"
import { CaseStudy } from "@/types/case-study"

interface CaseStudiesSectionProps {
  inView: boolean
}

function CaseStudyCard({ caseStudy, index, inView }: { caseStudy: CaseStudy; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  if (!isMounted) {
    return (
      <div ref={cardRef} className="w-full mb-32 last:mb-0">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2 relative overflow-hidden rounded-xl">
            <div className="aspect-video bg-gradient-to-br from-purple-900 to-cyan-900 rounded-xl overflow-hidden">
              <img
                src={caseStudy.image || "/placeholder.svg"}
                alt={caseStudy.title}
                className="w-full h-full object-cover mix-blend-overlay opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <p className="text-yellow-400 mb-4">Client: {caseStudy.client}</p>
            <h3 className="text-2xl font-bold text-white mb-4">{caseStudy.title}</h3>
            <p className="text-gray-400 mb-6">{caseStudy.description}</p>
            
            <div className="flex items-center text-sm text-gray-400 mb-6">
              <span>{caseStudy.date}</span>
              <span className="text-yellow-500 mx-2">•</span>
              <span>{caseStudy.category}</span>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-white mb-3">Key Results:</h4>
              <ul className="space-y-2">
                {caseStudy.results.map((result, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    <span className="text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-950/30">
              View Full Case Study <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <SafeMotion
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="w-full mb-32 last:mb-0"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2 relative overflow-hidden rounded-xl">
          <div className="aspect-video bg-gradient-to-br from-purple-900 to-cyan-900 rounded-xl overflow-hidden">
            <img
              src={caseStudy.image || "/placeholder.svg"}
              alt={caseStudy.title}
              className="w-full h-full object-cover mix-blend-overlay opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <p className="text-yellow-400 mb-4">Client: {caseStudy.client}</p>
          <h3 className="text-2xl font-bold text-white mb-4">{caseStudy.title}</h3>
          <p className="text-gray-400 mb-6">{caseStudy.description}</p>
          
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <span>{caseStudy.date}</span>
            <span className="text-yellow-500 mx-2">•</span>
            <span>{caseStudy.category}</span>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold text-white mb-3">Key Results:</h4>
            <ul className="space-y-2">
              {caseStudy.results.map((result, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span className="text-gray-300">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-950/30">
            View Full Case Study <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </SafeMotion>
  )
}

export default function CaseStudiesSection({ inView }: CaseStudiesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsMounted(true)
    
    async function loadCaseStudies() {
      try {
        setIsLoading(true);
        const data = await fetchCaseStudies();
        setCaseStudies(data);
        setError(null);
      } catch (err) {
        console.error("Error loading case studies:", err);
        setError("Failed to load case studies. Please try again later.");
        // Fallback to empty array
        setCaseStudies([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadCaseStudies();
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  if (!isMounted) {
    return (
      <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
            Case Studies
          </h2>
          <p className="text-xl text-gray-300">
            Explore how our AI solutions have transformed businesses across industries
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
        variants={textVariants}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
          Case Studies
        </h2>
        <p className="text-xl text-gray-300">
          Explore how our AI solutions have transformed businesses across industries
        </p>
      </SafeMotion>

      <div className="w-full max-w-7xl mx-auto">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
            <p className="mt-4 text-gray-400">Loading case studies...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        ) : caseStudies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No case studies available at the moment.</p>
          </div>
        ) : (
          caseStudies.map((caseStudy, index) => (
            <CaseStudyCard key={index} caseStudy={caseStudy} index={index} inView={inView} />
          ))
        )}
      </div>
    </div>
  )
}
