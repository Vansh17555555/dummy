"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

export default function Component() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwchqixO7fl-3HoCiHCc2FQjl_8VhYdLT_L9QghOJWF29dGBs7HMXT4gF5rmcRUvoXf/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ email }),
        }
      );
      const result = await response.text();
      console.log("Submitted email:", result);
      alert("Email submitted successfully");
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("Failed to submit email");
    } finally {
      setIsLoading(false);
    }
  };

  const screenshots = [
    { src: "/heavenestate.png", alt: "Home listing view" },
    { src: "/Screenshot_20241019_172103_Heaven Estate.jpg", alt: "Property details" },
    { src: "/Screenshot_20241019_172332_Heaven Estate.jpg", alt: "Map search" },
    { src: "/Screenshot_20241019_171609_Heaven Estate.jpg", alt: "Saved properties" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-gray-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-6 z-10"
      >
        {/* Left content section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-indigo-400"
          >
            Join the waitlist
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-md sm:text-lg lg:text-xl mb-6"
          >
            Be the first to experience our revolutionary real estate app. Get exclusive early access and special offers!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-gray-800 text-white border-gray-700 rounded-xl"
            />
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Join Now"}
            </Button>
          </motion.div>
        </div>

        {/* Desktop view: Animated layout */}
        <div className="hidden lg:block w-1/2 h-[600px] relative -mt-10">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-full">
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                className="absolute left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: (index - (screenshots.length - 1) / 2) * 5,
                  x: `${(index - (screenshots.length - 1) / 2) * 40}px`,
                  y: `${Math.abs(index - (screenshots.length - 1) / 2) * 10}px`,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 * index,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.1,
                  zIndex: 50,
                  transition: { duration: 0.2 },
                }}
                style={{
                  zIndex: screenshots.length - Math.abs(index - (screenshots.length - 1) / 2),
                }}
              >
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    boxShadow: `
                      0 0 0 4px rgba(255, 255, 255, 0.8),
                      0 0 0 8px rgba(75, 85, 99, 0.7),
                      0 6px 16px rgba(0, 0, 0, 0.4),
                      0 4px 6px rgba(0, 0, 0, 0.3)
                    `,
                  }}
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={280}
                    height={500}
                    className="w-[280px] h-[500px] object-cover rounded-xl"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile view: Carousel */}
        <div className="lg:hidden w-full">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={5000}
            className="w-full"
          >
            {screenshots.map((screenshot, index) => (
              <div key={index} className="pb-8">
                <div
                  className="rounded-xl overflow-hidden mx-auto"
                  style={{
                    boxShadow: `
                      0 0 0 4px rgba(255, 255, 255, 0.8),
                      0 0 0 8px rgba(75, 85, 99, 0.7),
                      0 6px 16px rgba(0, 0, 0, 0.4),
                      0 4px 6px rgba(0, 0, 0, 0.3)
                    `,
                    width: 'fit-content'
                  }}
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={280}
                    height={500}
                    className="w-[280px] h-[500px] object-cover rounded-xl"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </motion.div>
    </div>
  );
}