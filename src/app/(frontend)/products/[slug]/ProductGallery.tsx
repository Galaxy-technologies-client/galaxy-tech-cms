'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [images, activeIndex])

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square md:aspect-[4/3] bg-white border border-border rounded-2xl flex items-center justify-center p-4">
        <span className="text-textAlt text-bodyMedium">No image available</span>
      </div>
    )
  }

  const visibleThumbnails = images.slice(0, 3)
  const extraImagesCount = images.length - 3

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image */}
      <div className="w-full aspect-square md:aspect-[4/3] bg-white border border-border rounded-[20px] flex items-center justify-center p-8 relative overflow-hidden shadow-sm">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`Product Main View ${idx + 1}`}
            fill
            priority={idx === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-contain p-8 transition-opacity duration-500 ease-in-out ${
              activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-row items-center gap-4 w-full h-[123px]">
          {visibleThumbnails.map((img, idx) => {
            const isLastVisible = idx === 2
            const hasExtra = extraImagesCount > 0 && isLastVisible

            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex-1 flex justify-center items-center h-[123px] relative rounded-[24px] border overflow-hidden cursor-pointer transition-all bg-lightGrey hover:border-borderDark ${
                  activeIndex === idx ? 'border-primary ring-1 ring-primary' : 'border-border'
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-contain p-2" />

                {hasExtra && (
                  <div className="absolute inset-0 bg-black/40 flex justify-center items-center pointer-events-none">
                    <span className="text-white font-semibold text-h4">+{extraImagesCount}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
