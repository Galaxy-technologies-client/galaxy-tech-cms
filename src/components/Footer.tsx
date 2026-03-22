import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './ui/Button'

export function Footer() {
  return (
    <footer
      id="contact"
      className="flex flex-col items-center py-xxl px-s md:px-xxxl gap-xl border-t-[0.5px] border-grey bg-white w-full"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start w-full max-w-container mx-auto gap-xl">
        {/* Left Side: Logo & Info */}
        <div className="flex flex-col items-start gap-m max-w-md">
          <div className="relative w-[260px] h-[40px] mb-2">
            <Image
              src="/media/296df6681b7df5244edb8dab3154992c757e5558.png"
              alt="Galaxy Technologies Logo"
              fill
              className="object-contain object-left"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <h4 className="text-bodyMedium font-semibold text-text">Address:</h4>
            <p className="text-bodyMedium text-textAlt leading-relaxed">
              53/2331-D, opp. CKC High School, Ponnurunni, Vyttila,
              <br />
              Ernakulam, Kerala 682019
            </p>
          </div>

          <div className="flex flex-col gap-xs mt-2">
            <h4 className="text-bodyMedium font-semibold text-text">Contact:</h4>
            <div className="flex flex-col text-bodyMedium text-textAlt leading-relaxed">
              <span>+91 9074025365</span>
              <span>galaxytechnologies@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Links */}
        <div className="flex flex-col items-start lg:items-end gap-m lg:pt-12 w-full lg:w-auto">
          <ul className="flex flex-col items-start lg:items-end gap-s text-bodySmall font-regular text-text">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalogue" className="hover:text-primary transition-colors">
                Catalogue
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                About us
              </Link>
            </li>
          </ul>
          <div className="mt-s">
            <Button variant="primary" size="sm" href="tel:+919074025365">
              Contact us
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Privacy */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-container mx-auto pt-lg border-t-[0.5px] border-grey mt-m gap-m">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-bodySmall font-regular text-textAlt text-center md:text-left">
            &copy; {new Date().getFullYear()} Galaxy Technologies. All rights reserved.
          </p>
          <p className="text-bodySmall font-regular text-textAlt text-center md:text-left">
            Created by Lightbulb Creative Media & Pixelab
          </p>
        </div>
        <div className="flex items-center">
          <Link href="/privacy-policy" className="text-bodySmall text-textAlt hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
