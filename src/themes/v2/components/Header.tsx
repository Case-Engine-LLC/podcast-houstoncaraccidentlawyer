'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navigation, siteConfig, attorney, authorProfiles } from '@/data/siteData'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const authorSlug = Object.keys(authorProfiles)[0]
  const navLinks = [
    { label: 'Episodes', href: '/#episodes' },
    { label: 'Law Firm', href: siteConfig.firmUrl, external: true },
    { label: 'About', href: '/#about' },
    { label: `Meet ${attorney.name}`, href: `/author/${authorSlug}` },
  ].filter((l) => l.href)

  return (
    <nav className={`fixed top-0 w-full z-50 bg-black backdrop-blur-md border-b transition-all duration-300 ${scrolled ? 'border-white/10 shadow-md' : 'border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-6 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img src="/images/logo.svg" alt="Logo" className="h-14 md:h-16 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Subscribe + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link
            href="https://benwins.com/contact/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-secondary-hover transition-all transform hover:scale-105 shadow-lg shadow-secondary/20 whitespace-nowrap"
          >
            {navigation.ctaText}
          </Link>
          <button className="md:hidden text-white flex-shrink-0" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="block text-sm font-medium text-white/70 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Header
