'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navigation } from '@/data/siteData'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 bg-[#f4f2ed]/90 backdrop-blur-md border-b transition-all duration-300 ${scrolled ? 'border-[#10284B]/10 shadow-sm' : 'border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/v2">
          <img src="/palceholder.jpg" alt="Logo" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#091830]/70">
          <Link href="#episodes" className="hover:text-[#10284B] transition-colors">Episodes</Link>
          <Link href="#about" className="hover:text-[#10284B] transition-colors">About</Link>
          <Link href="#reviews" className="hover:text-[#10284B] transition-colors">Reviews</Link>
          <Link href="#resources" className="hover:text-[#10284B] transition-colors">Resources</Link>
        </div>

        {/* Subscribe + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="bg-[#10284B] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#091830] transition-all transform hover:scale-105 shadow-lg shadow-[#10284B]/20">
            {navigation.ctaText}
          </button>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#f4f2ed] border-t border-[#10284B]/10 px-6 py-6 space-y-4">
          <Link href="#episodes" className="block text-sm font-medium text-[#091830]/70 hover:text-[#10284B]" onClick={() => setMobileOpen(false)}>Episodes</Link>
          <Link href="#about" className="block text-sm font-medium text-[#091830]/70 hover:text-[#10284B]" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="#reviews" className="block text-sm font-medium text-[#091830]/70 hover:text-[#10284B]" onClick={() => setMobileOpen(false)}>Reviews</Link>
          <Link href="#resources" className="block text-sm font-medium text-[#091830]/70 hover:text-[#10284B]" onClick={() => setMobileOpen(false)}>Resources</Link>
        </div>
      )}
    </nav>
  )
}

export default Header
