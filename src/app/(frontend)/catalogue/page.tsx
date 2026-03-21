import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/ui/Reveal'
import { ProductCategories } from '@/components/ProductCategories'
import { FullCatalogue } from '@/components/FullCatalogue'
import { CTA } from '@/components/CTA'
import { FAQ } from '@/components/FAQ'
import Image from 'next/image'

export const metadata = {
  title: 'Galaxy Technologies - Catalogue',
  description: 'Explore our full catalogue of premium AC products.',
}

export default function CataloguePage() {
  return (
    <div className="flex flex-col w-full bg-white font-poppins text-text selection:bg-primarySurface selection:text-primaryDark overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Catalogue Header Image */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-start bg-text px-s md:px-xxxl">
        <Image
          src="/media/d84c4a9feeb734061807ab6d3c9ea4f5ff789e19.jpg"
          alt="Daikin AC Background"
          fill
          className="object-cover opacity-60 flex-shrink-0"
          priority
        />
        <div className="relative z-10 flex flex-col items-start w-full max-w-container mx-auto gap-xs">
          <Reveal>
            <h1 className="text-h3 md:text-h2 font-semibold text-white tracking-tight">
              Popular Daikin Models
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-bodyMedium text-white/90 max-w-2xl">
              Explore our range of energy-efficient Daikin air conditioners designed for optimum
              cooling and savings.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Reveal>
          <ProductCategories hideHeader={true} />
        </Reveal>

        <Reveal>
          <FullCatalogue />
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
