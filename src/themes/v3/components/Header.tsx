'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { navigation, siteConfig } from '@/data/siteData'

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/v3">
          <span className="h-10 w-auto object-contain flex items-center justify-center text-base font-bold text-white">{siteConfig.podcastName}</span>
        </Link>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.items.map((item) => (
            <Link
              key={item.name}
              href={`/v3${item.href}`}
              className="text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right: Subscribe + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href={navigation.ctaHref}
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-400 hover:text-black transition-all duration-300"
          >
            {navigation.ctaText}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#050505]/95 backdrop-blur-md border-t border-white/5 px-6 pb-6">
          {navigation.items.map((item) => (
            <Link
              key={item.name}
              href={`/v3${item.href}`}
              className="block py-3 text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Header
