'use client'

import { useState } from 'react'
import { FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from 'next/image';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (!emailRegex.test(inputEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if email format is valid
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Validate email using AbstractAPI
      const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=701c44ebd7d04fd281a18bad696edf8a&email=${email}`);
      const data = await response.json();

      // Check if the email format is valid and deliverable
      if (!data.is_valid_format.value) {
        setEmailError('Please enter a valid email address');
      } else if (data.is_mx_found.value === false || data.is_smtp_valid.value === false) {
        setEmailError('This email address is undeliverable');
      } else if (data.deliverability === 'UNDELIVERABLE') {
        setEmailError('This email address is undeliverable');
      } else {
        // Proceed with submission if email is valid and deliverable
        const result = await fetch('https://script.google.com/macros/s/AKfycbwchqixO7fl-3HoCiHCc2FQjl_8VhYdLT_L9QghOJWF29dGBs7HMXT4gF5rmcRUvoXf/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ email })
        });
        const responseText = await result.text();
        console.log('Submitted email:', responseText);
        setShowSuccessPopup(true); // Show success popup
        setEmail(''); // Clear the email input after successful submission
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Failed to validate email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const DesktopScreenshots = [
    { src: "/1.png", alt: "Property Listing Screen" },
    { src: "/2.png", alt: "Virtual Tour Screen" },
    { src: "/3.png", alt: "Chat Interface" },
    { src: "/4.png", alt: "Search Filters" },
  ];

  const mobileScreenshots = [
    { src: "/Screenshot_20241019_165814_Heaven Estate.jpg", alt: "Property Listing Screen" },
    { src: "/Screenshot_20241019_171609_Heaven Estate.jpg", alt: "Virtual Tour Screen" },
    { src: "/Screenshot_20241019_172103_Heaven Estate.jpg", alt: "Chat Interface" },
    { src: "/Screenshot_20241019_172332_Heaven Estate.jpg", alt: "Search Filters" },
  ];

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
  };

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
        <Image src="/Final-removebg-preview.png" width={150} height={200} alt="Logo" className="w-[100px] sm:w-[120px] md:w-[150px]"/>
        <div className="flex gap-4 sm:gap-6 mr-4 sm:mr-8">
          <motion.a
            href="https://x.com/theambio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-gray-300"
          >
            <FaTwitter size={20} className="sm:text-2xl md:text-3xl" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/theambio/?igsh=MW9lNWs3bmFvdzk0#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-gray-300"
          >
            <FaInstagram size={20} className="sm:text-2xl md:text-3xl" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/showcase/105685710/admin/dashboard/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white hover:text-gray-300"
          >
            <FaLinkedin size={20} className="sm:text-2xl md:text-3xl" />
          </motion.a>
         <motion.a
  href="mailto:Emodevelopers@gmail.com"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="text-white hover:text-gray-300"
>

 <FaEnvelope size={20} className="sm:text-2xl md:text-3xl" />
          </motion.a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-[calc(100%-32px)] sm:max-w-[calc(100%-64px)] md:max-w-[calc(100%-120px)] flex flex-col lg:flex-row gap-8 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full mb-4"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold 2xl:mt-28 mb-4">Discover, Design, Connect</h2>
          <p className="text-base sm:text-lg mb-6">
            Ready to bring your design visions to life? Sign up for early access to Ambio and be part of a world where creativity and inspiration connect.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4" id="waitlist">
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="flex-grow rounded-full pl-4 bg-slate-700 text-sm sm:text-base py-2"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            <Button type="submit" size="lg" className="rounded-full bg-white text-black text-sm sm:text-base py-2" disabled={isLoading}>
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
                        className="rounded-[40px] w-full h-auto"
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
        <div className="fixed top-0 left-0 w-full h-full bg-[#1a326f] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 max-w-md w-[90%] sm:w-[80%] md:w-[60%] flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-[#1a326f] mb-4 text-center">Thank you!</h2>
            <p className="text-lg ml-2 text-black mb-6 text-center">You&apos;ve successfully joined our waitlist!</p>

            <p className="text-lg text-black mb-4 text-center">Head over to our groups to stay updated on our progress:</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://discord.gg/WnNuyfetD3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a326f] hover:underline text-center"
              >
                Join our Discord Server
              </a>
              <a
                href="https://chat.whatsapp.com/HRUZayVguCbE45mRDefGjp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a326f] hover:underline text-center"
              >
                Join our WhatsApp Group
              </a>
            </div>
            <Button
              size="lg"
              className="rounded-full bg-[#1a326f] text-white mt-4 "
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
