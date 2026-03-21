'use client'

import React, { useState, useMemo } from 'react'
import type { Media, ProductModel } from '@/payload-types'
import { ProductCard } from '@/components/ui/ProductCard'

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

interface CategoryProductGridProps {
  products: ProductModel[]
  availableCapacities: number[]
  availableTechnologies: string[]
}

export function CategoryProductGrid({
  products,
  availableCapacities,
  availableTechnologies,
}: CategoryProductGridProps) {
  const [selectedCapacity, setSelectedCapacity] = useState<number | 'All'>('All')
  const [selectedTechnology, setSelectedTechnology] = useState<string | 'All'>('All')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Check capacity match
      let capacityMatch = false
      if (selectedCapacity === 'All') {
        capacityMatch = true
      } else {
        const productCapacities = product.variants
          ?.map((v) => v.capacity)
          .filter((c): c is number => typeof c === 'number')
        if (productCapacities && productCapacities.includes(selectedCapacity)) {
          capacityMatch = true
        }
      }

      // Check technology match
      let technologyMatch = false
      if (selectedTechnology === 'All') {
        technologyMatch = true
      } else {
        const productTech = product.technology?.toLowerCase()
        const selectedTechLower = selectedTechnology.toLowerCase()
        if (productTech && productTech === selectedTechLower) {
          technologyMatch = true
        }
      }

      return capacityMatch && technologyMatch
    })
  }, [products, selectedCapacity, selectedTechnology])

  const showCapacities = availableCapacities.length > 0
  const showTechnologies = availableTechnologies.length > 0
  const showFilters = showCapacities || showTechnologies

  const activePillClasses =
    'flex justify-center items-center gap-[10px] px-4 py-2 rounded-[40px] bg-white text-[#00668A] text-[14px] font-normal leading-[20px] cursor-pointer whitespace-nowrap transition-colors shadow-sm'
  const inactivePillClasses =
    'flex justify-center items-center gap-[10px] px-4 py-2 rounded-[40px] text-[#161616] text-[14px] font-normal leading-[20px] hover:text-[#00668A] cursor-pointer transition-colors whitespace-nowrap'

  return (
    <div className="flex flex-col items-center justify-center w-full gap-xl">
      {/* Filter Row */}
      {showFilters && products.length > 0 && (
        <div className="flex flex-col lg:flex-row self-stretch w-full max-w-container mx-auto justify-between items-start lg:items-center gap-6 lg:gap-8 pb-6 border-b border-border/60">
          {showCapacities && (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
              <span className="text-bodyMedium text-textAlt font-medium mr-1 whitespace-nowrap">
                Capacity :
              </span>
              <div className="flex flex-row flex-wrap justify-center items-start p-1 bg-[#F8F8F8] rounded-[40px] gap-2">
                <span
                  onClick={() => setSelectedCapacity('All')}
                  className={selectedCapacity === 'All' ? activePillClasses : inactivePillClasses}
                >
                  All
                </span>
                {availableCapacities.map((cap) => (
                  <span
                    key={cap}
                    onClick={() => setSelectedCapacity(cap)}
                    className={selectedCapacity === cap ? activePillClasses : inactivePillClasses}
                  >
                    {cap} Ton
                  </span>
                ))}
              </div>
            </div>
          )}

          {showTechnologies && (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
              <span className="text-bodyMedium text-textAlt font-medium mr-1 whitespace-nowrap">
                Technology :
              </span>
              <div className="flex flex-row flex-wrap justify-center items-start p-1 bg-[#F8F8F8] rounded-[40px] gap-2">
                <span
                  onClick={() => setSelectedTechnology('All')}
                  className={selectedTechnology === 'All' ? activePillClasses : inactivePillClasses}
                >
                  All
                </span>
                {availableTechnologies.map((tech) => (
                  <span
                    key={tech}
                    onClick={() => setSelectedTechnology(tech)}
                    className={
                      selectedTechnology === tech ? activePillClasses : inactivePillClasses
                    }
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="w-full text-center py-lg bg-lightGrey rounded-lg max-w-container mx-auto">
          <p className="text-bodyMedium text-textAlt">No products match the selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-[24px] w-full max-w-container mx-auto">
          {filteredProducts.map((product) => {
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
    </div>
  )
}
