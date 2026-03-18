import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ProductCard } from '@/components/ui/ProductCard'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Media, ProductModel } from '@/payload-types'

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

function getTonnages(variants: ProductModel['variants']) {
  if (!variants || variants.length === 0) return []
  const capacities = variants
    .map((v) => v.capacity)
    .filter((c): c is number => typeof c === 'number')
  const uniqueCapacities = Array.from(new Set(capacities)).sort((a, b) => a - b)
  return uniqueCapacities.map((c) => `${c} Ton`)
}

export async function SplitACGrid({ hideViewAll = false }: { hideViewAll?: boolean }) {
  let splitAcCategories: import('@/payload-types').Category[] = []
  let fetchedProducts: import('@/payload-types').ProductModel[] = []
  let splitAcCat: import('@/payload-types').Category | undefined

  try {
    const payload = await getPayload({ config: configPromise })

    // First fetch the 'Split AC' category to get its ID
    const { docs } = await payload.find({
      collection: 'categories',
      where: {
        name: {
          like: 'Split', // flexible match
        },
      },
      limit: 1,
    })
    splitAcCategories = docs || []

    splitAcCat = splitAcCategories[0]

    // Fetch some popular products (e.g. latest 4)
    const { docs: products } = await payload.find({
      collection: 'product-models',
      ...(splitAcCat ? { where: { category: { equals: splitAcCat.id } } } : {}),
      limit: 4,
      sort: '-createdAt',
    })
    fetchedProducts = products || []
  } catch (_) {
    console.warn('Database unreachable. Falling back to empty split AC products.')
  }

  const linkHref = splitAcCat?.slug ? `/categories/${splitAcCat.slug}` : `/catalogue`

  return (
    <section
      id="products"
      className="flex flex-col items-center justify-center py-xxl px-s md:px-xxxl gap-xl bg-white w-full"
    >
      <div className="flex flex-col items-start self-stretch w-full max-w-container mx-auto gap-4">
        <h2 className="text-h4 font-semibold text-primaryDarkAlt">
          Popular Daikin Split AC Models
        </h2>
        <p className="text-bodyMedium text-textAlt max-w-[800px] leading-relaxed">
          Discover energy-efficient Daikin split air conditioners designed to deliver powerful
          cooling while reducing electricity consumption — perfect for homes and offices in
          Kochi&apos;s climate.
        </p>
      </div>

      {/* Products Grid */}
      {!fetchedProducts || fetchedProducts.length === 0 ? (
        <div className="w-full text-center py-lg bg-lightGrey rounded-lg max-w-container mx-auto">
          <p className="text-bodyMedium text-textAlt">This category is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-[24px] w-full max-w-container mx-auto pb-4 pt-1">
          {fetchedProducts.map((product) => {
            const priceRange = getPriceRange(product.variants)
            const tonnages = getTonnages(product.variants)

            let imageUrl: string | undefined
            if (product.images && product.images.length > 0) {
              const firstImage = product.images[0]
              const media =
                typeof firstImage === 'object' && firstImage !== null
                  ? (firstImage as Media)
                  : undefined
              if (media?.filename) {
                imageUrl = `https://hnoiauivogwlrupoxztc.supabase.co/storage/v1/object/public/media/${media.filename}`
              }
            }

            return (
              <ProductCard
                key={product.id}
                name={product.name || product.series}
                priceRange={priceRange}
                tonnages={tonnages}
                imageUrl={imageUrl}
                href={`/products/${product.slug || product.id}`}
              />
            )
          })}
        </div>
      )}

      {!hideViewAll && (
        <Link href={linkHref}>
          <Button variant="outline" size="sm">
            View all products
          </Button>
        </Link>
      )}
    </section>
  )
}
