'use client'

import React, { useState } from 'react'
import { Info } from 'lucide-react'
import { trustBadges } from '@/data/siteData'

const TrustBadges = () => {
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null)

  return (
    <div className="border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-6">
          {trustBadges.map((badge) => (
            <div
              key={badge.id}
              className="relative flex flex-col items-center group cursor-pointer opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              onMouseEnter={() => setHoveredBadge(badge.id)}
              onMouseLeave={() => setHoveredBadge(null)}
            >
              <div className="relative flex items-center gap-1">
                <img
                  src={badge.badge}
                  alt={badge.title}
                  className="w-28 h-28 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <button className="relative shrink-0">
                  <Info size={16} className="text-slate-600 hover:text-amber-400 transition-colors" />

                  {/* Tooltip */}
                  {hoveredBadge === badge.id && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-white text-zinc-900 text-xs rounded-lg p-3 shadow-xl z-50">
                      {badge.tooltip}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-white rotate-45" />
                    </div>
                  )}
                </button>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-slate-500 mt-1">
                {badge.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrustBadges
