'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './ui/Button'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Catalogue', href: '/catalogue' },
  { name: 'About us', href: '/about' },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between w-full bg-white border-b border-grey py-s px-s md:px-xxl self-stretch relative">
      {/* Logo */}
      <Link href="/" className="relative w-[180px] h-[32px] md:w-[240px] md:h-[40px]">
        <Image
          src="/media/296df6681b7df5244edb8dab3154992c757e5558.png"
          alt="Galaxy Technologies Logo"
          fill
          className="object-contain object-left"
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-xl absolute left-1/2 transform -translate-x-1/2">
        <ul className="flex items-center gap-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-bodyMedium font-regular text-text hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Button */}
      <div className="hidden md:block">
        <Button variant="primary" size="sm" href="tel:+919074025365">
          Contact us
        </Button>
      </div>

      {/* Mobile Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-text hover:text-primary transition-colors focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-grey shadow-lg md:hidden animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col p-m gap-m">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-bodyMedium font-regular text-text hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button variant="primary" size="md" className="w-full" href="tel:+919074025365">
                Contact us
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
