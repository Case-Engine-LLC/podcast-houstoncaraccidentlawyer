'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { topicalEntryGrid } from '@/data/siteData'

const images = [
  'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1589578527966-fd7105698a39?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
]

const TopicalEntryGrid = () => {
  const [selectedTab, setSelectedTab] = useState(topicalEntryGrid.tabs[0].label)
  const activeTab = topicalEntryGrid.tabs.find(t => t.label === selectedTab) || topicalEntryGrid.tabs[0]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading text-3xl text-[#10284B]">{topicalEntryGrid.title}</h2>
        <select
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          className="bg-white border border-gray-200 rounded px-3 py-1 text-sm text-gray-600"
        >
          {topicalEntryGrid.tabs.map(tab => (
            <option key={tab.label} value={tab.label}>Topic: {tab.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {activeTab.links.slice(0, 3).map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="group flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-[#FF9E00]/20"
          >
            <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={images[i % images.length]}
                alt={link.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF9E00] mb-1 block">{activeTab.label}</span>
              <h3 className="font-heading text-lg font-bold text-[#10284B] leading-tight">{link.title}</h3>
              <p className="text-sm text-gray-400 mt-1 group-hover:text-[#10284B] transition-colors">Read More &rarr;</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TopicalEntryGrid
