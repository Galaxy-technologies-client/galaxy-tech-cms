import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { ProductModel } from '@/payload-types'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/ui/Reveal'
import { SplitACGrid } from '@/components/SplitACGrid'
import { CTA } from '@/components/CTA'
import { ProductGallery } from './ProductGallery'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

function getPriceRange(variants: ProductModel['variants']) {
  if (!variants || variants.length === 0) return 'Price on request'
  const prices = variants.map((v) => v.price).filter((p): p is number => typeof p === 'number')
  if (prices.length === 0) return 'Price on request'
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  if (minPrice === maxPrice) {
    return `Rs ${minPrice.toLocaleString('en-IN')}`
  }
  return `Rs ${minPrice.toLocaleString('en-IN')} - ${maxPrice.toLocaleString('en-IN')}`
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  let product: ProductModel | null = null

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'product-models',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (docs && docs.length > 0) {
      product = docs[0]
    }
  } catch (err) {
    console.warn('Error fetching product for page:', err)
  }

  if (!product) {
    // If database is offline, fall back to "not found" instead of crashing completely.
    notFound()
  }

  const priceRange = getPriceRange(product.variants)

  // Extract images
  const images = (product.images || [])
    .map((img) => {
      if (typeof img === 'object' && img !== null && 'filename' in img && img.filename) {
        return `https://hnoiauivogwlrupoxztc.supabase.co/storage/v1/object/public/media/${img.filename}`
      }
      return ''
    })
    .filter(Boolean)

  if (images.length === 0) {
    images.push('/media/split-ac.png') // fallback
  }

  const uniqueTonnages = Array.from(
    new Set(
      (product.variants || [])
        .map((v) => v.capacity)
        .filter((c): c is number => typeof c === 'number'),
    ),
  ).sort((a, b) => a - b)

  const variantStr = uniqueTonnages.map((t) => `${t} Ton`).join(' • ')

  return (
    <div className="flex flex-col w-full bg-white font-poppins text-text selection:bg-primarySurface selection:text-primaryDark overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Main Product Info Section */}
      <section className="w-full max-w-container mx-auto px-s md:px-m lg:px-xxxl py-xl flex flex-col lg:flex-row gap-xl">
        {/* Left Side: Images */}
        <div className="w-full lg:w-[45%] shrink-0">
          <ProductGallery images={images} />
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col justify-center items-start gap-4 flex-1 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-primary font-semibold text-h4 tracking-tight">
              {product.series || 'Series'}
            </h1>
            <h2 className="text-primaryDarkAlt font-semibold text-h3 md:text-h2 leading-tight">
              {product.name}
            </h2>
            <p className="text-textAlt font-semibold text-h5 mt-2">{priceRange}</p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-text font-medium text-bodyMedium">Technology:</span>
              <span className="text-textAlt font-regular text-bodyMedium">
                {product.technology === 'inverter'
                  ? 'Inverter'
                  : product.technology === 'non-inverter'
                    ? 'Non-Inverter'
                    : 'Standard'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-text font-medium text-bodyMedium">Variants:</span>
              <span className="text-textAlt font-regular text-bodyMedium">
                {variantStr || 'None specified'}
              </span>
            </div>
          </div>

          {product.description && (
            <p className="text-bodySmall md:text-bodyMedium text-textAlt leading-relaxed max-w-[600px]">
              {product.description}
            </p>
          )}

          {/* Key Product Features Box */}
          {product.features && product.features.length > 0 && (
            <div className="flex flex-col justify-center items-start p-6 gap-4 self-stretch w-full rounded-[20px] bg-lightGrey mt-4">
              <h4 className="text-primaryDark font-semibold text-bodyMedium">
                Key product features
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                {product.features.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-text font-regular text-bodySmall"
                  >
                    <span className="w-[6px] h-[6px] rounded-full bg-primary shrink-0" />
                    <span className="leading-snug">{item?.feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Variants Section */}
      {product.variants && product.variants.length > 0 && (
        <section className="w-full bg-white py-xl px-s md:px-m lg:px-xxxl">
          <div className="w-full max-w-container mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-primaryDarkAlt font-semibold text-h4">Variants</h3>
              <p className="text-textAlt text-bodyMedium">
                {product.series
                  ? `Daikin ${product.series} series comes in ${product.variants.length} variant${product.variants.length > 1 ? 's' : ''}.`
                  : 'Available variants for this model.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {product.variants.map((v, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-6 lg:p-8 border border-borderDark rounded-[20px] bg-white transition-shadow shadow-sm hover:shadow-md gap-6 w-full"
                >
                  <div className="flex flex-col items-start gap-1">
                    <h4 className="text-primary font-poppins text-[20px] font-semibold leading-[1.4]">
                      {v.capacity ? `${v.capacity} Ton` : 'Unknown'}
                    </h4>
                    <span className="text-primaryDark font-poppins text-[16px] font-semibold leading-[1.4]">
                      {v.modelNumber || 'Standard'}
                    </span>
                    <span className="text-primaryDarkAlt font-poppins text-[16px] font-semibold leading-[1.4] mt-1">
                      {v.price ? `Rs ${v.price.toLocaleString('en-IN')}` : 'Price on request'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-textAlt font-regular text-bodySmall">
                        Energy rating :
                      </span>
                      <div className="flex gap-1 justify-end">
                        {Array.from({ length: v.energyRating || 0 }).map((_, i) => (
                          <svg
                            key={i}
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.99965 0L10.4566 5.0933L15.9997 5.8653L11.9678 9.714L12.9515 15L7.99965 12.3392L3.04781 15L4.03147 9.714L-0.000350952 5.8653L5.54271 5.0933L7.99965 0Z"
                              fill="#F5A623"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <span className="text-textAlt font-regular text-bodySmall">Room size :</span>
                      <span className="text-text font-semibold text-bodySmall text-right">
                        {v.roomSize || '-'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <span className="text-textAlt font-regular text-bodySmall">
                        Capacity kW :
                      </span>
                      <span className="text-text font-semibold text-bodySmall text-right">
                        {v.coolingCapacityKW || '-'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <span className="text-textAlt font-regular text-bodySmall">
                        Indoor model :
                      </span>
                      <span className="text-text font-semibold text-bodySmall text-right">
                        {v.indoorModel || '-'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <span className="text-textAlt font-regular text-bodySmall">
                        Outdoor model :
                      </span>
                      <span className="text-text font-semibold text-bodySmall text-right">
                        {v.outdoorModel || '-'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular AC Models (reusing Grid component) */}
      <Reveal>
        <div className="w-full bg-[#FAFAFA] py-xl border-t border-border">
          <SplitACGrid />
        </div>
      </Reveal>

      <Reveal>
        <CTA />
      </Reveal>

      <Footer />
    </div>
  )
}
