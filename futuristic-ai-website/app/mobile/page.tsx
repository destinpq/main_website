"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Brain, Cpu, Database, LineChart, MessageSquare, Network, ChevronRight, Menu, X } from "lucide-react"
import { FaPhone, FaRegEnvelope } from "react-icons/fa"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchCaseStudies } from "@/lib/google-sheets"
import { CaseStudy } from "@/types/case-study"

export default function MobilePage() {
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [isLoadingCaseStudies, setIsLoadingCaseStudies] = useState(true)
  const [caseStudiesError, setCaseStudiesError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // On desktop, redirect to main site
    if (window.innerWidth >= 768) {
      window.location.href = '/'
    }
    
    // Load case studies from Google Sheets
    async function loadCaseStudies() {
      try {
        setIsLoadingCaseStudies(true);
        const data = await fetchCaseStudies();
        console.log("Mobile: Fetched case studies:", data);
        setCaseStudies(data);
        setCaseStudiesError(null);
      } catch (error) {
        console.error("Mobile: Error loading case studies:", error);
        setCaseStudiesError("Failed to load case studies");
      } finally {
        setIsLoadingCaseStudies(false);
      }
    }
    
    loadCaseStudies();
  }, [])

  const handleScroll = (id: string) => {
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      // Direct scroll, no smooth behavior
      window.scrollTo(0, element.offsetTop)
    }
    setActiveSection(id)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')
    
    // Log to console for debugging
    console.log("Mobile: Form submitted:", formState)
    
    try {
      // Format the message
      const formattedMessage = `
Mobile Contact Form Submission:
------------------------
Name: ${formState.name}
Email: ${formState.email}
Company: ${formState.company || 'Not provided'}
Message:
${formState.message}
      `.trim()
      
      // Send the email using the API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: 'Mobile Website Contact Form Submission',
          message: formattedMessage,
          userEmail: formState.email,
          schedule: 'immediately',
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitStatus('success')
        // Reset form
        setFormState({ name: "", email: "", company: "", message: "" })
        alert("Thank you for your message! We'll be in touch soon.")
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Mobile: Error submitting form:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred')
      alert("Something went wrong sending your message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Tech Stack", id: "tech-stack" },
    { name: "Case Studies", id: "case-studies" },
    { name: "Contact", id: "contact" },
  ]

  const teamMembers = [
    { 
      name: "Dr. Akanksha Agarwal", 
      role: "CEO, Psy D", 
      image: "/akanksha.jpg",
      description: "Leading our vision for AI innovation with a unique background in psychology, focusing on ethical and human-centered AI solutions."
    },
    { 
      name: "Pratik Khanapurkar", 
      role: "CTO", 
      image: "/pratik.jpg",
      description: "Architecting our technological framework and ensuring our AI systems deliver cutting-edge performance with scalability."
    },
    { 
      name: "Shaurya Bansal", 
      role: "R&D Head", 
      image: "/shaurya.jpg",
      description: "Spearheading our research initiatives to discover breakthrough AI applications and next-generation neural network architectures."
    },
    { 
      name: "Mohit Agrwal", 
      role: "Chief Marketing Officer", 
      image: "/mohit.jpeg",
      description: "Developing strategic marketing initiatives and building strong brand presence to drive growth and market penetration for our AI solutions."
    },
  ]

  const services = [
    {
      title: "Neural Networks",
      description: "Custom-built neural architectures for your specific needs.",
      icon: <Brain className="text-white" size={24} />,
      detailedDescription: "Neural Networks are the backbone of modern AI. We design and implement custom neural network architectures including:\n\n• Deep Learning Models: Multi-layer networks for complex pattern recognition\n• Convolutional Neural Networks (CNNs): Perfect for image and video analysis\n• Recurrent Neural Networks (RNNs): Ideal for sequential data like time series\n• Transformer Networks: State-of-the-art for natural language processing\n• Custom Architectures: Tailored specifically to your business requirements\n\nOur neural networks can handle tasks like image classification, speech recognition, predictive modeling, and much more. We ensure optimal performance through careful architecture design and hyperparameter tuning."
    },
    {
      title: "Predictive Analytics",
      description: "Advanced predictive models for forecasting trends.",
      icon: <LineChart className="text-white" size={24} />,
      detailedDescription: "Predictive Analytics uses historical data and machine learning to forecast future outcomes. Our services include:\n\n• Sales Forecasting: Predict future sales trends and demand patterns\n• Customer Behavior Prediction: Anticipate customer actions and preferences\n• Risk Assessment: Identify potential risks before they become problems\n• Market Analysis: Forecast market trends and opportunities\n• Inventory Optimization: Predict optimal stock levels and reorder points\n• Maintenance Prediction: Anticipate equipment failures and maintenance needs\n\nWe use advanced algorithms like regression analysis, time series forecasting, and ensemble methods to deliver accurate predictions that drive business decisions."
    },
    {
      title: "Generative AI",
      description: "Generative models tailored to your brand and needs.",
      icon: <Cpu className="text-white" size={24} />,
      detailedDescription: "Generative AI creates new content from existing data patterns. Our custom solutions include:\n\n• Content Generation: Create text, images, and multimedia content automatically\n• Brand-Specific Models: Train models on your data for consistent brand voice\n• Creative Automation: Generate marketing materials, product descriptions, and social media content\n• Data Augmentation: Create synthetic data to enhance your training datasets\n• Personalization: Generate personalized content for individual users\n• Creative Assistance: AI-powered tools for designers, writers, and content creators\n\nWe specialize in fine-tuning large language models (LLMs) and diffusion models to match your specific requirements, ensuring generated content aligns with your brand identity and business goals."
    },
    {
      title: "Conversational AI",
      description: "Intelligent chatbots that understand natural language.",
      icon: <MessageSquare className="text-white" size={24} />,
      detailedDescription: "Conversational AI enables natural, human-like interactions between users and machines. Our solutions include:\n\n• Intelligent Chatbots: Context-aware bots that understand user intent\n• Voice Assistants: Speech-enabled AI for hands-free interactions\n• Customer Support Automation: 24/7 AI-powered customer service\n• Multi-language Support: Chatbots that communicate in multiple languages\n• Integration Services: Seamless integration with existing systems and platforms\n• Sentiment Analysis: Understanding user emotions and responding appropriately\n\nOur conversational AI systems use natural language processing (NLP), intent recognition, and machine learning to provide meaningful, helpful interactions that improve customer satisfaction and reduce operational costs."
    },
    {
      title: "Computer Vision",
      description: "Image recognition and visual analysis systems.",
      icon: <Network className="text-white" size={24} />,
      detailedDescription: "Computer Vision enables machines to interpret and understand visual information. Our expertise covers:\n\n• Object Detection: Identify and locate objects in images and videos\n• Facial Recognition: Secure authentication and identity verification systems\n• Quality Control: Automated inspection for manufacturing and production\n• Medical Imaging: AI-powered analysis of medical scans and diagnostics\n• Autonomous Systems: Vision systems for robots and self-driving vehicles\n• Optical Character Recognition (OCR): Extract text from images and documents\n• Real-time Processing: Live video analysis for security and monitoring\n\nWe implement cutting-edge computer vision algorithms using deep learning frameworks to deliver accurate, fast, and scalable visual intelligence solutions."
    },
    {
      title: "Big Data Processing",
      description: "Transform massive datasets into actionable insights.",
      icon: <Database className="text-white" size={24} />,
      detailedDescription: "Big Data Processing handles massive volumes of structured and unstructured data. Our services include:\n\n• Data Pipeline Architecture: Scalable systems for data ingestion and processing\n• Real-time Analytics: Process streaming data for immediate insights\n• Data Warehousing: Organize and store large datasets efficiently\n• ETL/ELT Processes: Extract, transform, and load data from multiple sources\n• Distributed Computing: Leverage cloud and cluster computing for scale\n• Data Lake Implementation: Store and analyze diverse data types\n• Performance Optimization: Ensure fast query response times and efficient processing\n\nWe use technologies like Apache Spark, Hadoop, Kafka, and cloud-native solutions to process petabytes of data, enabling data-driven decision making and unlocking valuable business insights."
    },
  ]

  const openPopup = (serviceTitle: string) => {
    setActivePopup(serviceTitle)
  }

  const closePopup = () => {
    setActivePopup(null)
  }

  const techCategories = ["all", "ML Frameworks", "AI Services", "Infrastructure", "Cloud Services", "Databases", "Frontend", "Backend", "Mobile Development"]
  
  const techStack = [
    { name: "TensorFlow", category: "ML Frameworks", description: "Open-source ML framework" },
    { name: "PyTorch", category: "ML Frameworks", description: "ML library based on Torch" },
    { name: "OpenAI API", category: "AI Services", description: "Access to powerful LLMs" },
    { name: "Kubernetes", category: "Infrastructure", description: "Container orchestration" },
    { name: "AWS", category: "Cloud Services", description: "Amazon's cloud platform" },
    { name: "Google Cloud", category: "Cloud Services", description: "Google's cloud services" },
    { name: "MongoDB", category: "Databases", description: "NoSQL document database" },
    { name: "PostgreSQL", category: "Databases", description: "Relational database system" },
    { name: "React", category: "Frontend", description: "UI library for web apps" },
    { name: "Next.js", category: "Frontend", description: "React framework with SSR" },
    { name: "Node.js", category: "Backend", description: "JavaScript runtime" },
    { name: "Nest.js", category: "Backend", description: "Node.js framework" },
    { name: "Flutter", category: "Mobile Development", description: "UI toolkit for mobile apps" },
    { name: "Android/iOS", category: "Mobile Development", description: "Native mobile platforms" },
  ]
  
  const filteredTech = selectedCategory === "all" 
    ? techStack 
    : techStack.filter(item => item.category === selectedCategory)
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <div className="relative mr-2 w-[40px] h-[40px]">
              <Image 
                src="/thunh.png" 
                alt="DestinPQ Logo" 
                fill 
                sizes="40px"
                priority
                className="object-contain" 
              />
            </div>
            <div className="text-xl font-bold text-yellow-400">
              DESTINPQ
            </div>
          </div>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[57px] left-0 w-full bg-black border-b border-gray-800 z-40">
          <div className="flex flex-col space-y-4 items-center pt-4 pb-4">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleScroll(link.id)}
                className={`text-xl ${activeSection === link.id ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                {link.name}
              </button>
            ))}
            
            <button 
              className="bg-black text-white border-2 border-yellow-500 w-full mt-4 py-2 mx-4"
              onClick={() => handleScroll('contact')}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {activePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-yellow-400">{activePopup}</h3>
              <button onClick={closePopup} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                {services.find(service => service.title === activePopup)?.detailedDescription}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
                  <p className="text-yellow-400 text-sm font-medium">💡 Consultation Fee: 1000₹ per hour</p>
                </div>
                <button 
                  onClick={() => {
                    closePopup()
                    handleScroll('contact')
                  }}
                  className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium"
                >
                  Get Started with This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="pt-16 pb-12 px-4 flex flex-col items-center">
        <div className="relative mb-8 w-[200px] h-[200px]">
          <Image 
            src="/thunh.png" 
            alt="DestinPQ Logo" 
            fill
            sizes="200px"
            className="object-contain" 
            priority
          />
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-yellow-400 pb-3">
            Designing Tomorrow&apos;s Intelligence
          </h1>

          <p className="mt-4 text-base text-gray-300 px-2">
            Pioneering the future of AI and machine learning solutions that transform industries.
          </p>

          <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <span className="text-yellow-400 font-medium">Consultation Fee: 1000₹ per hour</span>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <button
              className="bg-black text-white border-2 border-yellow-500 px-6 py-4 text-base rounded-md w-full"
              onClick={() => handleScroll('services')}
            >
              Explore Solutions
            </button>
            <button
              className="border border-yellow-500 text-yellow-400 px-6 py-4 text-base rounded-md w-full"
              onClick={() => handleScroll('case-studies')}
            >
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-8 px-4 bg-black">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-4">
            Meet Our AI Experts
          </h2>
          <p className="text-gray-300">The brilliant minds behind DestinPQ's innovation</p>
        </div>

        <div className="space-y-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="relative h-48 sm:h-auto sm:w-32 bg-gradient-to-br from-yellow-900/20 to-amber-900/20 flex-shrink-0">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, 128px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/400x400/111/333?text=${member.name.split(' ').map(n => n[0]).join('')}`;
                    }}
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-yellow-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 px-4 bg-black">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Our Services
          </h2>
          <p className="text-gray-300">Cutting-edge AI solutions for your business</p>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <Card key={index} className="bg-black border border-gray-800 p-6 rounded-xl">
              <CardHeader>
                <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center mb-3">
                  {service.icon}
                </div>
                <CardTitle className="text-xl text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <button 
                  onClick={() => openPopup(service.title)}
                  className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <span className="mr-2">Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-8 px-4 bg-black">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Our Technology Stack
          </h2>
          <p className="text-gray-300">
            Cutting-edge technologies to deliver AI solutions
          </p>
        </div>

        {/* Tech Categories */}
        <div className="mb-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 pb-2 whitespace-nowrap">
            {techCategories.map((category, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Items */}
        <div className="space-y-3">
          {filteredTech.map((tech, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-lg p-3"
            >
              <h3 className="text-lg font-bold text-white mb-1">{tech.name}</h3>
              <p className="text-xs text-yellow-400 mb-1">{tech.category}</p>
              <p className="text-sm text-gray-400">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-8 px-4 bg-black">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">
            Case Studies
          </h2>
          <p className="text-gray-300">
            See how our AI solutions have transformed businesses
          </p>
        </div>

        {isLoadingCaseStudies ? (
          <div className="flex justify-center items-center py-12">
            <div className="h-8 w-8 rounded-full border-4 border-purple-400 border-t-transparent animate-spin"></div>
          </div>
        ) : caseStudiesError ? (
          <div className="text-center py-8">
            <p className="text-red-400">{caseStudiesError}</p>
          </div>
        ) : caseStudies.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No case studies available</p>
          </div>
        ) : (
          <div className="space-y-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-video bg-purple-900 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover opacity-80"
                    loading="lazy"
                  />
                </div>
                
                <div className="p-4">
                  <div className="text-yellow-400 mb-2">Client: {study.client}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{study.title}</h3>
                  <p className="text-gray-400 mb-4">{study.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Key Results:</h4>
                    <ul className="space-y-1">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-cyan-500 mr-2">•</span>
                          <span className="text-gray-300">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="w-full justify-center border border-yellow-500 text-yellow-400 py-2 px-4 rounded flex items-center">
                    View Details <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 px-4 bg-black">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-300">
            Ready to harness AI for your business?
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-black border border-gray-800 rounded-xl p-4 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-white">Send us a message</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleFormChange}
                  placeholder="your.email@company.com"
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleFormChange}
                  placeholder="Your company name"
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleFormChange}
                  placeholder="Tell us about your project"
                  className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder:text-gray-500 min-h-[100px]"
                  required
                ></textarea>
              </div>
            </div>

            <div className="mt-8">
              <button 
                className="bg-yellow-600 text-white py-3 px-8 rounded-full w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              
              {submitStatus === 'success' && (
                <p className="text-green-400 text-center mt-4">Message sent successfully!</p>
              )}
              
              {submitStatus === 'error' && (
                <p className="text-red-400 text-center mt-4">
                  {errorMessage || "Failed to send message. Please try again."}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="bg-black border border-gray-800 rounded-xl p-4">
            <div className="flex items-start">
              <div className="bg-blue-900 p-2 rounded-full mr-3">
                <FaRegEnvelope className="text-blue-400 text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-1">Email Us</h4>
                <p className="text-gray-400 text-sm mb-2">We'll respond within 24 hours</p>
                <a href="mailto:support@destinpq.com" className="text-blue-400 text-sm">
                  support@destinpq.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-black border border-gray-800 rounded-xl p-4">
            <div className="flex items-start">
              <div className="bg-green-900 p-2 rounded-full mr-3">
                <FaPhone className="text-green-400 text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-1">WhatsApp</h4>
                <p className="text-gray-400 text-sm mb-2">Message us anytime</p>
                <div className="flex flex-col space-y-2">
                  <a href="https://wa.me/919873521968" className="text-green-400 text-sm flex items-center">
                    <span className="mr-1">Chat:</span> +91 98735 21968
                  </a>
                  <a href="mailto:support@destinpq.com" className="text-blue-400 text-sm flex items-center">
                    <span className="mr-1">Email:</span> support@destinpq.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2025 DestinPQ. All rights reserved.
        </div>
      </section>
    </div>
  )
} 