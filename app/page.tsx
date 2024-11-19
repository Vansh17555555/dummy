'use client'

import { useState } from 'react'
import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from 'next/image';

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
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#132054] via-[#1a326f] to-[#1c2e7e] text-gray-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
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

      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Image src="/Final-removebg-preview.png" width={150} height={200} alt="Logo"/>
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

      <main className="container mx-auto px-4 py-8 max-w-[calc(100%-120px)] flex flex-col lg:flex-row gap-8 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full mb-4"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[2rem] sm:text-[1.75rem] xs:text-[1.5rem]">Discover, Design, Connect</h2>
          <p className="text-lg mb-6 text-[1.125rem] sm:text-[1rem] xs:text-[0.875rem]">
            Ready to bring your design visions to life? Sign up for early access to Heaven Estate and be part of a world where creativity and inspiration connect.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4" id="waitlist">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow rounded-full pl-4 bg-slate-700 text-sm sm:text-base xs:text-xs py-2"
              required
            />
            <Button type="submit" size="lg" className="rounded-full bg-white text-black sm:text-[18px] text-[15px] xs:text-[14px] py-2" disabled={isLoading}>
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

        {/* Mobile Screenshots */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:hidden w-full"
        >
          <Card className="border-gray-700">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {mobileScreenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-full h-full overflow-hidden shadow-lg rounded-[6px]">
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

      </main>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg p-4 max-w-md w-[90%] sm:w-[80%] md:w-[60%]">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Thank you!</h2>
            <p className="text-lg text-white mb-6">You&apos;ve successfully joined our waitlist!</p>

               <p className="text-lg text-white mb-4 text-center">Head over to our groups to stay updated on our progress:</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://discord.gg/fsWYHaXs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline text-center"
              >
                Join our Discord Server
              </a>
              <a
                href="https://chat.whatsapp.com/HRUZayVguCbE45mRDefGjp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline text-center"
              >
                Join our WhatsApp Group
              </a>
            </div>
            <Button
              size="lg"
              className="rounded-full bg-cyan-400 text-gray-900 mt-4"
              onClick={handleClosePopup}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
