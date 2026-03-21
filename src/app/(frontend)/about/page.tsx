import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/ui/Reveal'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { CTA } from '@/components/CTA'
import { FAQ } from '@/components/FAQ'
import Image from 'next/image'

export const metadata = {
  title: 'Galaxy Technologies - About Us',
  description: 'Learn more about Galaxy Technologies, your trusted Daikin air conditioning partner in Kochi.',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-white font-poppins text-text selection:bg-primarySurface selection:text-primaryDark overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Header Image */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-start bg-text px-s md:px-xxxl">
        <Image
          src="/media/d84c4a9feeb734061807ab6d3c9ea4f5ff789e19.jpg"
          alt="About Us Background"
          fill
          className="object-cover opacity-60 flex-shrink-0"
          priority
        />
        <div className="relative z-10 flex flex-col items-start w-full max-w-container mx-auto gap-xs">
          <Reveal>
            <h1 className="text-h3 md:text-h2 font-semibold text-white tracking-tight">
              About Us
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-bodyMedium text-white/90 max-w-2xl">
              Delivering premium Daikin solutions, comprehensive maintenance, and reliable cooling strategies across Kochi.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-0">
        <Reveal>
          <div className="py-xl">
            <div className="w-full max-w-container mx-auto px-s md:px-xxxl flex flex-col gap-m text-textAlt text-bodyMedium leading-relaxed max-w-[800px]">
              <p>
                Welcome to <strong className="text-primaryDark">Galaxy Technologies</strong>, the premier authorised Daikin dealership in Kochi. We specialize in bringing cutting-edge cooling systems into homes, offices, and large commercial spaces, consistently upholding Daikin&apos;s globally recognized standards for quality and efficiency.
              </p>
              <p>
                Our expert technicians undergo rigorous training to ensure that every installation is flawless and that maintenance services prolong the lifespan of your systems. Whether you are looking specifically for a split, cassette, ductable, or VRV solution, our dedicated consulting team operates on a foundational commitment to your absolute comfort.
              </p>
              <p>
                Our track record is built on trust, transparency, and a relentless pursuit of customer satisfaction. By choosing Galaxy Technologies, you’re not just purchasing an air conditioner—you’re securing a high-performance lifestyle, significantly enhanced energy savings, and the peace of mind of having an extended support network right in your neighborhood.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <WhyChooseUs />
        </Reveal>

        <Reveal>
          <CTA />
        </Reveal>

        <Reveal>
          <FAQ />
        </Reveal>
      </div>

      <Footer />
    </div>
  )
}
