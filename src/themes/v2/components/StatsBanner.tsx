'use client'

import React from 'react'
import { stats } from '@/data/siteData'

const StatsBanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100 py-8">
      <div className="p-4">
        <div className="font-heading text-5xl text-[#10284B] mb-2">{stats.rating}</div>
        <div className="text-sm font-bold uppercase tracking-widest text-[#FF9E00] mb-2">Positive Reviews</div>
        <p className="text-xs text-gray-400 max-w-[200px] mx-auto">{stats.ratingVerbalization}</p>
      </div>
      <div className="p-4">
        <div className="font-heading text-5xl text-[#10284B] mb-2">{stats.satisfactionRate}%</div>
        <div className="text-sm font-bold uppercase tracking-widest text-[#FF9E00] mb-2">{stats.satisfactionLabel}</div>
        <p className="text-xs text-gray-400 max-w-[200px] mx-auto">{stats.satisfactionVerbalization}</p>
      </div>
      <div className="p-4">
        <div className="font-heading text-5xl text-[#10284B] mb-2">{stats.casesHandled}+</div>
        <div className="text-sm font-bold uppercase tracking-widest text-[#FF9E00] mb-2">{stats.casesLabel}</div>
        <p className="text-xs text-gray-400 max-w-[200px] mx-auto">{stats.casesVerbalization}</p>
      </div>
    </div>
  )
}

export default StatsBanner
