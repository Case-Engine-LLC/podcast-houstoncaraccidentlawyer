'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Info } from 'lucide-react'
import { trustBadges } from '@/data/siteData'

const badgeImageById: Record<number, string> = {
  1: '/badges/super-lawyers-rising-star.webp',
  2: '/badges/million-dollar-advocates.gif',
  3: '/badges/national-trial-lawyers-top-40.png',
  4: '/badges/avvo-clients-choice.png',
  5: '/badges/houston-top-rated-lawyer.png',
}

const TrustBadges = () => {
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null)

  const badges = trustBadges

  return (
    <div className="relative z-20 overflow-x-hidden py-6">
      <div className="flex animate-marquee-fast md:animate-marquee-slower">
        {/* First set */}
        {badges.map((badge) => (
          <div
            key={`first-${badge.id}`}
            className="relative flex items-center gap-0.5 mx-6 md:mx-16 shrink-0 cursor-pointer"
            onMouseEnter={() => setHoveredBadge(badge.id)}
            onMouseLeave={() => setHoveredBadge(null)}
            onClick={() => badge.href && window.location.assign(badge.href)}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
              {badgeImageById[badge.id] ? (
                <Image
                  src={badgeImageById[badge.id]}
                  alt={badge.title}
                  width={96}
                  height={96}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                  unoptimized
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 text-center px-1 leading-tight">{badge.title}</span>
                </div>
              )}
            </div>

            <button className="relative">
              <Info size={20} className="text-gray-400 hover:text-primary transition-colors" />

              {hoveredBadge === badge.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-primary text-white text-xs rounded-lg p-3 shadow-lg z-50">
                  {badge.tooltip}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-primary rotate-45" />
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
            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
              {badgeImageById[badge.id] ? (
                <Image
                  src={badgeImageById[badge.id]}
                  alt={badge.title}
                  width={96}
                  height={96}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                  unoptimized
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 text-center px-1 leading-tight">{badge.title}</span>
                </div>
              )}
            </div>

            <button className="relative">
              <Info size={20} className="text-gray-400 hover:text-primary transition-colors" />

              {hoveredBadge === badge.id + 100 && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-primary text-white text-xs rounded-lg p-3 shadow-lg z-50">
                  {badge.tooltip}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-primary rotate-45" />
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrustBadges
