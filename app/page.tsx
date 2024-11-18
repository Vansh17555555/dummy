'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
  
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwchqixO7fl-3HoCiHCc2FQjl_8VhYdLT_L9QghOJWF29dGBs7HMXT4gF5rmcRUvoXf/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email })
      })
      const result = await response.text()
      console.log('Submitted email:', result)
      setShowSuccessPopup(true) // Show success popup
      setEmail('') // Clear the email input after successful submission
    } catch (error) {
      console.error('Error submitting email:', error)
      alert('Failed to submit email')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClosePopup = () => {
    setShowSuccessPopup(false)
  }

  const DesktopScreenshots = [
    { src: "/1.png", alt: "Property Listing Screen" },
    { src: "/2.png", alt: "Virtual Tour Screen" },
    { src: "/3.png", alt: "Chat Interface" },
    { src: "/4.png", alt: "Search Filters" },
  ]
  const mobileScreenshots = [
    { src: "/Screenshot_20241019_165814_Heaven Estate.jpg", alt: "Property Listing Screen" },
    { src: "/Screenshot_20241019_171609_Heaven Estate.jpg", alt: "Virtual Tour Screen" },
    { src: "/Screenshot_20241019_172103_Heaven Estate.jpg", alt: "Chat Interface" },
    { src: "/Screenshot_20241019_172332_Heaven Estate.jpg", alt: "Search Filters" },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-gray-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <style jsx global>{`
        .slick-dots {
          bottom: -40px;
        }
        .slick-dots li button:before {
          color: white;
        }
        .slick-slide {
          padding: 0 10px;
        }
      `}</style>

      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">Heaven estate</h1>
        <Button variant="default" size="lg" className="rounded-full" asChild>
          <motion.a
href="https://www.emodev.tech"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EmoDev <FaExternalLinkAlt />
          </motion.a>
        </Button>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-[calc(100%-120px)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Discover,Design,Connect</h2>
            <p className="text-xl mb-8">
Ready to bring your design visions to life? Sign up for early access to Heaven Estate and be part of a world where creativity and inspiration connect.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4" id="waitlist">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow rounded-full pl-4"
                required
              />
              <Button type="submit" size="lg" className="rounded-full bg-violet-700 sm:text-[18px] text-[15px]" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Join Waitlist'}
              </Button>
            </form>
          </motion.div>

          {/* Desktop Carousel */}
          <motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="lg:w-1/2 hidden lg:block"
>
  <Card className="bg-transparent border-none">
    <CardContent className="p-0">
      <Slider {...settings}>
        {DesktopScreenshots.map((screenshot, index) => (
          <div key={index} className="px-4">
            <div className="border-0 rounded-[32px] p-4 shadow-lg max-w-xs mx-auto">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={400}
                height={600}
                className="rounded-[40px]"
              />
            </div>
          </div>
        ))}
      </Slider>
    </CardContent>
  </Card>
</motion.div>


<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="lg:hidden w-full"
>
  <Card className="bg-gray-800 border-gray-700">
    <CardContent className="p-6">
      <div className="grid grid-cols-2 gap-4">
        {mobileScreenshots.map((screenshot, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-full h-full overflow-hidden  shadow-lg rounded-[6px]">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={300}
                height={600}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </CardContent>
  </Card>
</motion.div>

        </div>
      </main>

      {/* Success Popup */}
    {/* Success Popup */}
{/* Success Popup */}
{showSuccessPopup && (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-800 rounded-lg p-6 max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Thankyou!</h2>
            <p className="text-lg text-white mb-6">You&apos;ve successfully joined our waitlist!</p>
            <p className="text-lg text-white mb-4">Head over to our groups to stay updated on our progress:</p>
            <div className="flex flex-col gap-2">
                <a href="https://discord.gg/fsWYHaXs" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                    Join our Discord Server
                </a>
                <a href="https://chat.whatsapp.com/HRUZayVguCbE45mRDefGjp" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                    Join our WhatsApp Group
                </a>
            </div>
            <Button size="lg" className="rounded-full bg-cyan-400 text-gray-900 mt-4" onClick={handleClosePopup}>
                Close
            </Button>
        </div>
    </div>
)}
    </div>
  )
}