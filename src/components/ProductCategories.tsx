import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Media } from '@/payload-types'

export async function ProductCategories({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  let fetchedCategories: import('@/payload-types').Category[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'categories',
      limit: 10,
      sort: 'createdAt',
    })
    fetchedCategories = docs || []
  } catch (_) {
    console.warn('Database unreachable. Falling back to empty categories.')
  }

  // Define the required order
  const order = ['Split AC', 'Cassette AC', 'Ductable Systems', 'VRV / VRF', 'Tower AC']

  // Sort categories based on the defined order (ignore case/spacing mismatches gracefully)
  const categories = fetchedCategories.sort((a, b) => {
    const normalize = (name?: string | null) => (name || '').toLowerCase().replace(/[^a-z0-9]/g, '')
    const indexA = order.findIndex((o) => normalize(o) === normalize(a.name))
    const indexB = order.findIndex((o) => normalize(o) === normalize(b.name))

    // If not found in the custom order array, push it to the end
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  return (
    <section id="products" className="bg-white py-xxl px-s md:px-xxxl">
      <div className="max-w-container mx-auto flex flex-col items-center gap-xl text-center">
        {!hideHeader && (
          <div className="max-w-[900px] flex flex-col gap-s">
            <h2 className="text-h3 md:text-h2 font-semibold text-primaryDarkAlt">
              Explore Our Range of Daikin Air Conditioning Solutions
            </h2>
            <p className="text-bodySmall md:text-bodyMedium text-textAlt">
              We offer a complete selection of Daikin air conditioners in Kochi, designed for
              comfort, efficiency, and long-term reliability across residential and commercial
              environments.
            </p>
          </div>
        )}

        {/* Categories Grid - Adjusted to 5 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-xl w-full">
          {categories.map((category) => {
            const media = category.image as Media | undefined
            const filename = media?.filename

            // Construct direct Supabase public URL to bypass Vercel serverless DB proxying.
            const directSupabaseUrl = filename
              ? `https://hnoiauivogwlrupoxztc.supabase.co/storage/v1/object/public/media/${filename}`
              : '/media/split-ac.png'

            const imageUrl = directSupabaseUrl

            return (
              <Link
                href={`/categories/${category.slug || category.id}`}
                key={category.id}
                className="flex flex-col items-start text-left gap-s group cursor-pointer block"
              >
                {/* Image Box */}
                <div className="relative aspect-square w-full bg-white rounded-lg overflow-hidden border border-border group-hover:border-grey transition-colors">
                  <Image
                    src={imageUrl}
                    alt={media?.alt || category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-xs mt-2">
                  <h3 className="text-h6 font-semibold text-primaryDarkAlt leading-tight group-hover:text-primary transition-colors">
                    {(category.name || '').toLowerCase().includes('split')
                      ? 'Split AC Models'
                      : (category.name || '').toLowerCase().includes('cassette')
                        ? 'Cassette AC Models'
                        : (category.name || '').toLowerCase().includes('duct')
                          ? 'Ductable Systems'
                          : (category.name || '').toLowerCase().includes('vrv') ||
                              (category.name || '').toLowerCase().includes('vrf')
                            ? 'VRV / VRF Systems'
                            : (category.name || '').toLowerCase().includes('tower')
                              ? 'Tower AC Models'
                              : category.name || 'Unknown Category'}
                  </h3>
                  {category.short_description && (
                    <p className="text-bodySmall text-textAlt leading-snug">
                      {category.short_description}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
