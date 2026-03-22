import React from 'react'
import Image from 'next/image'

import Link from 'next/link'

export interface ProductCardProps {
  name: string
  priceRange: string
  mrpRange?: string | null
  imageUrl?: string
  tonnages?: string[]
  className?: string
  href?: string
}

export function ProductCard({
  name,
  priceRange,
  mrpRange,
  imageUrl,
  tonnages,
  className = '',
  href,
}: ProductCardProps) {
  // Handle tonnages display logic: max 3 items, else show 2 + "X more"
  const maxVisibleTonnages = 3
  let displayTonnages = tonnages || []
  let extraCount = 0

  if (displayTonnages.length > maxVisibleTonnages) {
    displayTonnages = displayTonnages.slice(0, 2)
    extraCount = (tonnages || []).length - 2
  }

  const containerClasses = `group flex flex-col w-full h-full rounded-[20px] border border-border bg-white overflow-hidden transition-shadow duration-300 hover:shadow-md ${
    href ? 'cursor-pointer' : ''
  } ${className}`

  const content = (
    <>
      <div className="w-full aspect-[4/3] bg-white shrink-0 relative flex justify-center items-center p-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#A9A9A9] flex items-center justify-center">
            <span className="text-white/60 text-sm font-medium">No Image</span>
          </div>
        )}
      </div>

      {/* Product Details (Text Box) */}
      <div className="flex flex-col items-start self-stretch p-s gap-xs bg-lightGrey flex-1 group-hover:bg-[#F2F4F7] transition-colors duration-300">
        {/* Heading */}
        <h3 className="text-primaryDarkAlt font-poppins text-h5 font-semibold text-left w-full group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Pricing */}
        <div className="flex flex-row items-center gap-2 w-full pt-1">
          <p className="text-textAlt font-poppins text-bodySmall font-semibold">
            {priceRange}
          </p>
          {mrpRange && mrpRange !== priceRange && (
            <p className="text-textAlt/70 font-poppins text-[12px] line-through">
              {mrpRange}
            </p>
          )}
        </div>

        {/* Tonnage chips */}
        {tonnages && tonnages.length > 0 && (
          <div className="flex flex-row flex-wrap items-center gap-[6px] w-full pt-1">
            {displayTonnages.map((tonnage, index) => (
              <div
                key={index}
                className="flex py-[4px] px-[12px] justify-center items-center rounded-full border border-borderDark bg-[#F0F8FB] transition-colors group-hover:border-primary group-hover:bg-primarySurface"
              >
                <span className="text-primaryDark font-inter text-bodyExtraSmall font-medium">
                  {tonnage}
                </span>
              </div>
            ))}
            {extraCount > 0 && (
              <div className="flex py-[4px] px-[12px] justify-center items-center rounded-full border border-borderDark bg-[#F0F8FB] transition-colors group-hover:border-primary group-hover:bg-primarySurface">
                <span className="text-primaryDark font-inter text-bodyExtraSmall font-medium">
                  +{extraCount}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {content}
      </Link>
    )
  }

  return <div className={containerClasses}>{content}</div>
}
