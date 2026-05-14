'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Info } from 'lucide-react'
import { trustBadges } from '@/data/siteData'

type TooltipState = { text: string; top: number; left: number }

const TrustBadges = () => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const badges = trustBadges

  const showTooltip = (e: React.MouseEvent, text: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setTooltip({
      text,
      top: rect.top,
      left: rect.left + rect.width / 2,
    })
  }

  const hideTooltip = () => setTooltip(null)

  return (
    <section className="bg-white py-6 md:py-12 overflow-hidden ">
      <div className="flex animate-marquee-fast md:animate-marquee-slower hover:[animation-play-state:paused]">
        {/* First set of badges */}
        {badges.map((badge) => (
          <div
            key={`first-${badge.id}`}
            className="relative flex items-center gap-0.5 mx-6 md:mx-16 shrink-0 cursor-pointer"
            onClick={() => badge.href && window.location.assign(badge.href)}
          >
            {/* Badge */}
            <div className="h-20 flex items-center justify-center">
              {badge.badge ? (
                <Image
                  src={badge.badge}
                  alt={badge.title}
                  width={192}
                  height={192}
                  className="h-20 w-auto object-contain"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 text-center px-1 leading-tight">{badge.title}</span>
                </div>
              )}
            </div>

            {/* Info Icon */}
            <button
              className="relative"
              onMouseEnter={(e) => showTooltip(e, badge.tooltip)}
              onMouseLeave={hideTooltip}
            >
              <Info size={20} className="text-gray-400 hover:text-black transition-colors" />
            </button>
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {badges.map((badge) => (
          <div
            key={`second-${badge.id}`}
            className="relative flex items-center gap-0.5 mx-6 md:mx-16 shrink-0 cursor-pointer"
            onClick={() => badge.href && window.location.assign(badge.href)}
          >
            {/* Badge */}
            <div className="h-20 flex items-center justify-center">
              {badge.badge ? (
                <Image
                  src={badge.badge}
                  alt={badge.title}
                  width={192}
                  height={192}
                  className="h-20 w-auto object-contain"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 text-center px-1 leading-tight">{badge.title}</span>
                </div>
              )}
            </div>

            {/* Info Icon */}
            <button
              className="relative"
              onMouseEnter={(e) => showTooltip(e, badge.tooltip)}
              onMouseLeave={hideTooltip}
            >
              <Info size={20} className="text-gray-400 hover:text-black transition-colors" />
            </button>
          </div>
        ))}
      </div>

      {/* Portal-rendered tooltip — escapes marquee stacking context */}
      {mounted && tooltip && createPortal(
        <div
          style={{
            position: 'fixed',
            top: tooltip.top - 8,
            left: tooltip.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
          className="w-48 bg-black text-white text-xs rounded-lg p-3 shadow-lg animate-in fade-in slide-in-from-bottom-2"
        >
          {tooltip.text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-black rotate-45" />
        </div>,
        document.body
      )}
    </section>
  )
}

export default TrustBadges
