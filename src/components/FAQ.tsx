'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Do you provide Daikin warranty support?',
    a: 'Yes, we offer authorised support and genuine service.',
  },
  {
    q: 'How often should I service my AC?',
    a: 'We recommend servicing your AC at least twice a year to maintain optimal performance, improve energy efficiency, and avoid unexpected breakdowns.',
  },
  {
    q: 'Do you offer AMC plans?',
    a: 'Yes, we offer comprehensive Annual Maintenance Contracts (AMC) to keep your AC running efficiently year-round with regular preventive checkups.',
  },
  {
    q: 'How quickly can you respond to service requests?',
    a: 'We generally respond to all service requests within 24–48 hours to ensure your cooling is restored as promptly as possible.',
  },
  {
    q: 'Can you help choose the right AC?',
    a: 'Absolutely. Our experts provide free consultations to help you select the perfect AC based on your room size, budget, and specific cooling needs.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="flex flex-col lg:flex-row items-start justify-center pt-xxl pb-xl px-s md:px-xxxl gap-xxl bg-white w-full max-w-container mx-auto">
      {/* Left side text */}
      <div className="flex flex-col items-start gap-xs w-full lg:w-5/12 max-w-md">
        <span className="text-bodyMedium text-primary font-semibold uppercase tracking-wider">
          FAQ
        </span>
        <h2 className="text-h3 md:text-h2 font-semibold text-primaryDarkAlt leading-tight">
          Frequently Asked Questions About AC Service in Kochi
        </h2>
        <p className="text-bodyMedium text-textAlt leading-relaxed mt-2">
          Expert insights to guide you through cooling solutions, service expectations, and
          maintenance best practices.
        </p>
      </div>

      {/* Right side Accordion */}
      <div className="flex flex-col gap-4 w-full lg:w-7/12">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className="bg-lightGrey rounded-xl overflow-hidden group cursor-pointer"
            >
              <button
                className="w-full flex items-center justify-between p-lg text-left font-semibold text-h5 text-primaryDarkAlt outline-none"
                onClick={(e) => handleToggle(index, e)}
              >
                {faq.q}
                <ChevronDown
                  className={`text-primaryDarkAlt transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  size={20}
                />
              </button>
              {/* Answer Content Wrapper for Animation */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-lg pb-lg pt-0 text-bodyMedium text-textAlt font-regular leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
