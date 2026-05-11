'use client'

import React from 'react'
import { stats } from '@/data/siteData'

const StatsBanner = () => {
  const statItems = [
    {
      value: stats.rating ? String(stats.rating) : '',
      label: stats.rating ? 'Positive Reviews' : '',
      text: stats.ratingVerbalization,
    },
    {
      value: stats.satisfactionRate ? `${stats.satisfactionRate}%` : '',
      label: stats.satisfactionLabel,
      text: stats.satisfactionVerbalization,
    },
    {
      value: stats.casesHandled ? `${stats.casesHandled}+` : '',
      label: stats.casesLabel,
      text: stats.casesVerbalization,
    },
  ].filter(item => item.value && item.label && item.text)

  if (statItems.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100 py-8">
      {statItems.map((item) => (
        <div key={item.label} className="p-4">
          <div className="font-heading text-5xl text-primary mb-2">{item.value}</div>
          <div className="text-sm font-bold uppercase tracking-widest text-secondary mb-2">{item.label}</div>
          <p className="text-xs text-gray-400 max-w-[200px] mx-auto">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsBanner
