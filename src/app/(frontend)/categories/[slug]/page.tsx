import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/ui/Reveal'
import { CategoryProductGrid } from '@/components/CategoryProductGrid'
import { CTA } from '@/components/CTA'
import { FAQ } from '@/components/FAQ'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { docs: fetchedCategories } = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = fetchedCategories[0]

  if (!category) {
    return {
      title: 'Category Not Found - Galaxy Technologies',
    }
  }

  const getCustomTitle = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('split')) return 'Split AC Models'
    if (n.includes('cassette')) return 'Cassette AC Models'
    if (n.includes('duct')) return 'Ductable Systems'
    if (n.includes('vrv') || n.includes('vrf')) return 'VRV / VRF Systems'
    if (n.includes('tower')) return 'Tower AC Models'
    return name
  }

  const displayTitle = category.page_title || getCustomTitle(category.name)
  const displayDescription =
    category.page_description ||
    category.short_description ||
    `Explore our ${getCustomTitle(category.name)} from Daikin at Galaxy Technologies.`

  return {
    title: `${displayTitle} - Galaxy Technologies`,
    description: displayDescription,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs: fetchedCategories } = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = fetchedCategories[0]

  if (!category) {
    notFound()
  }

  const { docs: products } = await payload.find({
    collection: 'product-models',
    where: {
      category: {
        equals: category.id,
      },
    },
    limit: 100, // adjust as needed
  })

  const getCustomTitle = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('split')) return 'Split AC Models'
    if (n.includes('cassette')) return 'Cassette AC Models'
    if (n.includes('duct')) return 'Ductable Systems'
    if (n.includes('vrv') || n.includes('vrf')) return 'VRV / VRF Systems'
    if (n.includes('tower')) return 'Tower AC Models'
    return name
  }

  const displayTitle = category.page_title || getCustomTitle(category.name)
  const displayDescription = category.page_description || category.short_description

  const availableCapacitiesSet = new Set<number>()
  const availableTechnologiesSet = new Set<string>()

  products.forEach((product) => {
    if (product.technology && product.technology.toLowerCase() === 'inverter') {
      availableTechnologiesSet.add('Inverter')
    } else if (product.technology && product.technology.toLowerCase() === 'non-inverter') {
      availableTechnologiesSet.add('Non-Inverter')
    }

    product.variants?.forEach((v) => {
      if (typeof v.capacity === 'number') {
        availableCapacitiesSet.add(v.capacity)
      }
    })
  })

  const availableCapacities = Array.from(availableCapacitiesSet).sort((a, b) => a - b)
  const availableTechnologies = Array.from(availableTechnologiesSet).sort()

  return (
    <div className="flex flex-col w-full bg-white font-poppins text-text selection:bg-primarySurface selection:text-primaryDark overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Header Banner */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-start bg-text px-s md:px-xxxl">
        <Image
          src="/media/d84c4a9feeb734061807ab6d3c9ea4f5ff789e19.jpg"
          alt={displayTitle}
          fill
          className="object-cover opacity-60 flex-shrink-0"
          priority
        />
        <div className="relative z-10 flex flex-col items-start w-full max-w-container mx-auto gap-4">
          <Reveal>
            <h1 className="text-h3 md:text-h2 font-semibold text-white tracking-tight">
              {displayTitle}
            </h1>
          </Reveal>
          {displayDescription && (
            <Reveal>
              <p className="text-bodyMedium text-white/90 max-w-4xl">{displayDescription}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-xl gap-xxl">
        <Reveal>
          <section className="flex flex-col items-center justify-center px-s md:px-xxxl w-full">
            <CategoryProductGrid
              products={products}
              availableCapacities={availableCapacities}
              availableTechnologies={availableTechnologies}
            />
          </section>
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
