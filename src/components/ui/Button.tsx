import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-regular rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 text-center'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primaryDark focus:ring-primary',
    secondary: 'bg-primarySurface text-primary hover:bg-[#d4f0f8] focus:ring-primarySurface',
    outline:
      'border border-primary text-primary bg-transparent hover:bg-primarySurface focus:ring-primary',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-bodySmall',
    md: 'px-5 py-2.5 text-bodySmall md:px-6 md:py-3 md:text-bodyMedium',
    lg: 'px-5 py-2.5 text-bodySmall md:px-8 md:py-3.5 md:text-bodyMedium',
  }

  if (href) {
    return (
      <a href={href} className={clsx(baseStyles, variants[variant], sizes[size], className)}>
        {children}
      </a>
    )
  }

  return (
    <button className={clsx(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
