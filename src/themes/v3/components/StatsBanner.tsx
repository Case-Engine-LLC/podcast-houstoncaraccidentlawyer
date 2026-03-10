'use client'

import React from 'react'
import { stats } from '@/data/siteData'

const StatsBanner = () => {
  return (
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 text-center group hover:border-amber-500/30 transition-colors">
            <div className="text-6xl font-serif text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-500 inline-block">
              {stats.rating}
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Positive Reviews</h3>
            <p className="text-sm text-slate-500">{stats.ratingVerbalization}</p>
          </div>

          <div className="p-10 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 text-center group hover:border-amber-500/30 transition-colors">
            <div className="text-6xl font-serif text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-500 inline-block">
              {stats.satisfactionRate}%
            </div>
            <h3 className="text-xl font-medium text-white mb-2">{stats.satisfactionLabel}</h3>
            <p className="text-sm text-slate-500">{stats.satisfactionVerbalization}</p>
          </div>

          <div className="p-10 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 text-center group hover:border-amber-500/30 transition-colors">
            <div className="text-6xl font-serif text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-500 inline-block">
              {stats.casesHandled}+
            </div>
            <h3 className="text-xl font-medium text-white mb-2">{stats.casesLabel}</h3>
            <p className="text-sm text-slate-500">{stats.casesVerbalization}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsBanner
