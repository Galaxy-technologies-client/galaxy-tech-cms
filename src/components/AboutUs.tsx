import React from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export function AboutUs() {
  return (
    <section
      id="about"
      className="flex flex-col-reverse md:flex-row items-stretch w-full border-y border-grey bg-lightGrey"
    >
      {/* Left side: Image */}
      <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[500px]">
        <Image
          src="/media/about-us.png"
          alt="Professional Daikin AC Technician"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Right side: Content */}
      <div className="w-full md:w-1/2 flex items-center py-xxl px-s md:px-xxl lg:px-[120px]">
        <div className="max-w-[600px] flex flex-col items-start gap-m">
          <div className="flex flex-col gap-xs">
            <span className="text-bodyMedium text-primary">About us</span>
            <h2 className="text-h3 md:text-h2 font-semibold text-primaryDarkAlt leading-tight">
              Your Trusted Cooling Partner in Kochi
            </h2>
          </div>

          <p className="text-bodyMedium text-textAlt leading-relaxed">
            Galaxy Technologies is a Daikin authorised dealer committed to delivering reliable air
            conditioning solutions backed by expert guidance and professional service. From helping
            you choose the right system to providing installation and ongoing maintenance, our team
            ensures comfort you can depend on.
          </p>

          <Button variant="outline" size="sm" className="mt-s px-8" href="/about">
            Learn more
          </Button>
        </div>
      </div>
    </section>
  )
}
