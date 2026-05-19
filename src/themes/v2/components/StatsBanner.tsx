'use client'

import React from 'react'
import { stats } from '@/data/siteData'

const StatsBanner = () => {
  const cards: Array<{ key: string; value: string; label: string; verb: string }> = []
  if (stats.rating && Number(stats.rating) > 0) {
    cards.push({
      key: 'rating',
      value: String(stats.rating),
      label: 'Positive Reviews',
      verb: stats.ratingVerbalization || '',
    })
  }
  if (stats.satisfactionRate && Number(stats.satisfactionRate) > 0 && stats.satisfactionLabel) {
    cards.push({
      key: 'satisfaction',
      value: `${stats.satisfactionRate}%`,
      label: stats.satisfactionLabel,
      verb: stats.satisfactionVerbalization || '',
    })
  }
  if (stats.casesHandled && Number(stats.casesHandled) > 0 && stats.casesLabel) {
    cards.push({
      key: 'cases',
      value: `${stats.casesHandled}+`,
      label: stats.casesLabel,
      verb: stats.casesVerbalization || '',
    })
  }

  if (cards.length === 0) return null

  const gridCols = cards.length === 1 ? 'md:grid-cols-1' : cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'

  return (
    <div className={`max-w-7xl mx-auto px-6 grid ${gridCols} gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100 py-8`}>
      {cards.map((item) => (
        <div key={item.key} className="p-4">
          <div className="font-heading text-5xl text-primary mb-2">{item.value}</div>
          <div className="text-sm font-bold uppercase tracking-widest text-secondary mb-2">{item.label}</div>
          {item.verb && <p className="text-xs text-gray-400 max-w-[200px] mx-auto">{item.verb}</p>}
        </div>
      ))}
    </div>
  )
}

export default StatsBanner
