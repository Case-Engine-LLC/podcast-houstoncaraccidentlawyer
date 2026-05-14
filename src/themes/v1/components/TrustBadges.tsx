'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Info } from 'lucide-react'
import { trustBadges } from '@/data/siteData'

const TrustBadges = () => {
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null)

  const badges = trustBadges

  return (
    <section className="relative z-20 bg-white py-6 md:py-12 overflow-x-hidden ">
      <div className="flex animate-marquee-fast md:animate-marquee-slower">
        {/* First set of badges */}
        {badges.map((badge) => (
          <div
            key={`first-${badge.id}`}
            className="relative flex items-center gap-0.5 mx-6 md:mx-16 shrink-0 cursor-pointer"
            onMouseEnter={() => setHoveredBadge(badge.id)}
            onMouseLeave={() => setHoveredBadge(null)}
            onClick={() => badge.href && window.location.assign(badge.href)}
          >
            {/* Badge */}
            <div className="w-48 h-48 flex items-center justify-center">
              {badge.badge ? (
                <Image
                  src={badge.badge}
                  alt={badge.title}
                  width={192}
                  height={192}
                  className="object-contain"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 text-center px-1 leading-tight">{badge.title}</span>
                </div>
              )}
            </div>

            {/* Info Icon */}
            <button className="relative">
              <Info size={20} className="text-gray-400 hover:text-black transition-colors" />

              {/* Tooltip */}
              {hoveredBadge === badge.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black text-white text-xs rounded-lg p-3 shadow-lg z-50 animate-in fade-in slide-in-from-bottom-2">
                  {badge.tooltip}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-black rotate-45" />
                </div>
              )}
            </button>
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {badges.map((badge) => (
          <div
            key={`second-${badge.id}`}
            className="relative flex items-center gap-0.5 mx-6 md:mx-16 shrink-0 cursor-pointer"
            onMouseEnter={() => setHoveredBadge(badge.id + 100)}
            onMouseLeave={() => setHoveredBadge(null)}
            onClick={() => badge.href && window.location.assign(badge.href)}
          >
            {/* Badge */}
            <div className="w-48 h-48 flex items-center justify-center">
              {badge.badge ? (
                <Image
                  src={badge.badge}
                  alt={badge.title}
                  width={192}
                  height={192}
                  className="object-contain"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 text-center px-1 leading-tight">{badge.title}</span>
                </div>
              )}
            </div>

            {/* Info Icon */}
            <button className="relative">
              <Info size={20} className="text-gray-400 hover:text-black transition-colors" />

              {/* Tooltip */}
              {hoveredBadge === badge.id + 100 && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black text-white text-xs rounded-lg p-3 shadow-lg z-50 animate-in fade-in slide-in-from-bottom-2">
                  {badge.tooltip}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-black rotate-45" />
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustBadges
