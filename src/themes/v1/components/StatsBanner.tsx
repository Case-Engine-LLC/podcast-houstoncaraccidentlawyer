'use client'

import React from 'react'
import { stats } from '@/data/siteData'

const StatsBanner = () => {
  return (
    <section className="bg-white py-0 md:py-12">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1: Rating - Orange */}
          <div className="bg-[#FAA31A] rounded-3xl px-6 py-8 md:px-5 md:py-10 text-left">
            <p>
              <span className="flex items-center justify-between mb-4 md:mb-6">
                <span className="text-[#FFC564] text-4xl md:text-6xl font-bold">{stats.rating}</span>
                <img src="/icons/stars.svg" alt="Stars" className="w-16 h-16 md:w-20 md:h-20" />
              </span>
              <span className="text-[#451F00] text-xl md:text-2xl font-bold mb-3 block">Positive Reviews</span>
              <span className="text-[#451F00] text-sm md:text-base leading-relaxed">{stats.ratingVerbalization}</span>
            </p>
          </div>

          {/* Card 2: Satisfaction - Yellow */}
          <div className="bg-[#FAA61A] rounded-3xl px-6 py-8 md:px-5 md:py-10 text-left">
            <p>
              <span className="flex items-center justify-between mb-4 md:mb-6">
                <span className="text-[#10284B] text-4xl md:text-6xl font-bold">{stats.satisfactionRate}%</span>
                <img src="/icons/like.svg" alt="Like" className="w-16 h-16 md:w-20 md:h-20" />
              </span>
              <span className="text-[#10284B] text-xl md:text-2xl font-bold mb-3 block">{stats.satisfactionLabel}</span>
              <span className="text-[#10284B] text-sm md:text-base leading-relaxed">{stats.satisfactionVerbalization}</span>
            </p>
          </div>

          {/* Card 3: Cases - Dark Blue */}
          <div className="bg-[#10284B] rounded-3xl px-6 py-8 md:px-5 md:py-10 text-left">
            <p>
              <span className="flex items-center justify-between mb-4 md:mb-6">
                <span className="text-[#FAA31A] text-4xl md:text-6xl font-bold">{stats.casesHandled}+</span>
                <img src="/icons/case.svg" alt="Case" className="w-16 h-16 md:w-20 md:h-20" />
              </span>
              <span className="text-[#A3C9FF] text-xl md:text-2xl font-bold mb-3 block">{stats.casesLabel}</span>
              <span className="text-[#A3C9FF] text-sm md:text-base leading-relaxed">{stats.casesVerbalization}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsBanner
