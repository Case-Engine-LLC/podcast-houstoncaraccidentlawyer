'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { navigation } from '@/data/siteData'

interface HeaderProps {
  variant?: 'dark' | 'light'
}

const Header = ({ variant = 'dark' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = navigation.items

  const isDark = variant === 'dark'
  const textColor = isScrolled ? 'text-white' : (isDark ? 'text-white' : 'text-black')
  const textHoverColor = isScrolled ? 'hover:text-white/70' : (isDark ? 'hover:text-white/70' : 'hover:text-black/70')
  const buttonBg = isScrolled ? 'bg-white text-black hover:bg-white/90' : (isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90')
  const mobileMenuBg = isScrolled ? 'bg-black' : (isDark ? 'bg-black' : 'bg-white')
  const mobileBorder = isScrolled ? 'border-white/10' : (isDark ? 'border-white/10' : 'border-black/10')
  const headerBg = isScrolled ? 'bg-black' : 'bg-transparent'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${headerBg}`}>
      <div className="max-w-container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/palceholder.jpg"
            alt={navigation.logo}
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`text-base font-medium ${textColor} ${textHoverColor} transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Subscribe Button */}
        <div className="hidden md:flex items-center">
          <Link
            href={navigation.ctaHref}
            className={`px-6 py-2.5 rounded-lg text-base font-semibold ${buttonBg} transition-all`}
          >
            {navigation.ctaText}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 ${textColor}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className={`md:hidden ${mobileMenuBg} border-t ${mobileBorder} py-6 px-6 flex flex-col gap-6 shadow-xl`}>
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`text-lg font-medium ${textColor}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={navigation.ctaHref}
            className={`flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold ${buttonBg}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {navigation.ctaText}
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
