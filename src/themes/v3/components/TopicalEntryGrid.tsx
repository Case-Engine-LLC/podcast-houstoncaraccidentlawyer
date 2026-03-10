'use client'

import React, { useState, useRef, useEffect } from 'react'
import { topicalEntryGrid } from '@/data/siteData'

const TopicalEntryGrid = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const links = topicalEntryGrid.tabs[activeTab].links

  // Track which card is in view
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const cardWidth = container.firstElementChild?.clientWidth || 1
      const gap = 16
      setActiveSlide(Math.round(scrollLeft / (cardWidth + gap)))
    }
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [activeTab])

  const scrollTo = (index: number) => {
    const container = scrollRef.current
    if (!container) return
    const cardWidth = container.firstElementChild?.clientWidth || 0
    const gap = 16
    container.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' })
  }

  // Reset scroll on tab change
  useEffect(() => {
    setActiveSlide(0)
    scrollRef.current?.scrollTo({ left: 0 })
  }, [activeTab])

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <h3 className="font-heading text-3xl text-white">{topicalEntryGrid.title}</h3>
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(Number(e.target.value))}
          className="bg-transparent text-xs text-amber-500 font-bold uppercase tracking-wider border-none focus:outline-none cursor-pointer"
        >
          {topicalEntryGrid.tabs.map((tab, i) => (
            <option key={tab.label} value={i} className="bg-[#050505] text-white">
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Horizontal scroll cards with arrows */}
      <div className="relative group/slider">
        {/* Left arrow */}
        {activeSlide > 0 && (
          <button
            onClick={() => scrollTo(activeSlide - 1)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-black/80 border border-white/10 items-center justify-center text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {activeSlide < links.length - 1 && (
          <button
            onClick={() => scrollTo(activeSlide + 1)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-black/80 border border-white/10 items-center justify-center text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
        >
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="min-w-[80vw] md:min-w-[400px] snap-start bg-zinc-900 border border-white/5 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all group cursor-pointer shrink-0"
            >
              <div className="h-40 bg-zinc-800 relative">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded">
                    {topicalEntryGrid.tabs[activeTab].label}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {link.title}
                </h4>
                <p className="text-xs text-slate-500 mb-4">{link.description}</p>
                <span className="text-xs font-bold text-white border-b border-amber-500 pb-0.5">
                  Read Guide
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {links.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === i ? 'bg-amber-500 w-6' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default TopicalEntryGrid
