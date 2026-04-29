'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navigation, siteConfig } from '@/data/siteData'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 bg-black backdrop-blur-md border-b transition-all duration-300 ${scrolled ? 'border-white/10 shadow-md' : 'border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img src="/images/logo.svg" alt="Logo" className="h-12 md:h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="/#episodes" className="hover:text-white transition-colors">Episodes</Link>
          <Link href="/#about" className="hover:text-white transition-colors">About</Link>
          <Link href="/#reviews" className="hover:text-white transition-colors">Reviews</Link>
          <Link href="/#resources" className="hover:text-white transition-colors">Resources</Link>
        </div>

        {/* Subscribe + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="bg-secondary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-secondary-hover transition-all transform hover:scale-105 shadow-lg shadow-secondary/20">
            {navigation.ctaText}
          </button>
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 space-y-4">
          <Link href="/#episodes" className="block text-sm font-medium text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>Episodes</Link>
          <Link href="/#about" className="block text-sm font-medium text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/#reviews" className="block text-sm font-medium text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>Reviews</Link>
          <Link href="/#resources" className="block text-sm font-medium text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>Resources</Link>
        </div>
      )}
    </nav>
  )
}

export default Header
