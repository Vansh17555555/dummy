"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-transparent text-white fixed top-0 left-0 z-20 shadow-lg mb-12">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-white flex items-center"
        >
          {/* Logo Image */}
          <img 
            src="/heavenestate-removebg-preview.png" 
            alt="Heaven Estate Logo" 
            className="w-20 h-14 mr-2"
          />
          Heaven-estate
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Button className="bg-indigo-600 hover:bg-indigo-700 ml-4">
            Join Waitlist
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Add mobile menu content if needed */}
      
    </header>
  )
}
