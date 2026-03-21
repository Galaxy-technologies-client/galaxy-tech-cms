'use client'

import React from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export const Hero = () => {
  return (
    <section id="hero" className="grid md:grid-cols-2 min-h-[90vh] overflow-hidden">
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center items-start py-xxl px-s md:px-xxl bg-lightGrey">
        <div className="max-w-[563px] flex flex-col gap-m md:gap-lg mx-auto md:mx-0">
          {/* Daikin Badge */}
          <div className="flex items-center gap-xs">
            <Image
              src="/media/daikin-logo-new.png"
              alt="Daikin Logo"
              width={1280}
              height={276}
              className="h-6 w-auto object-contain"
              priority
            />
            <span className="text-bodyMedium text-textAlt font-regular leading-none">
              Authorised Dealer in Kochi
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-h1 font-semibold text-primaryDarkAlt leading-tight">
            Reliable Cooling Starts Here
          </h1>

          {/* Paragraph */}
          <p className="text-bodyLarge text-textAlt leading-relaxed">
            Galaxy Technologies provides genuine Daikin air conditioners, professional installation,
            and reliable AC service across Kochi for homes, offices, and commercial spaces.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-xs mt-xs">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View AC Models
            </Button>

            <Button
              variant="primary"
              size="sm"
              href="tel:+919074025365"
            >
              Call us now
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE on desktop / BOTTOM on mobile & tablet */}
      <div className="relative h-[300px] md:h-auto md:min-h-[500px]">
        <Image
          src="/media/d84c4a9feeb734061807ab6d3c9ea4f5ff789e19.jpg"
          alt="Modern living room with a Daikin air conditioner on the wall"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}
