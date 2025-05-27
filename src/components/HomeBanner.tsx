// components/HomeBanner.tsx

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

import Link from 'next/link';

export default function HomeBanner() {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-xl mb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left side text content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Glass Fiber Raw Material Information Platform
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Quickly find various glass fiber products, brand information, and technical parameters — your one-stop solution!
          </p>
          <div className="flex justify-center md:justify-start gap-4 pt-4">
            <Link href="/materials">
              <Button className="text-base px-6 py-4">
                Materials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="bg-white text-black hover:bg-gray-100 text-base px-6 py-4">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Right side illustration */}
        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            src="/images/tf.png"
            alt="Glass fiber illustration"
            width={480}
            height={480}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  )
}
