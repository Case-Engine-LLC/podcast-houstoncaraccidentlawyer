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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="font-heading text-3xl text-primary">{topicalEntryGrid.title}</h2>
        <select
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
          className="bg-white border border-gray-200 rounded px-3 py-1 text-sm text-gray-600 self-start sm:self-auto"
        >
          {topicalEntryGrid.tabs.map(tab => (
            <option key={tab.label} value={tab.label}>Topic: {tab.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6">
        {activeTab.links.slice(0, 3).map((link, i) => {
          const linkImage = (link as { image?: string }).image
          return (
            <Link
              key={i}
              href={link.href}
              className="group flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-secondary/20 min-w-0"
            >
              {linkImage ? (
                <div className="w-24 h-24 flex-shrink-0 bg-[#FBE9E9] rounded-lg overflow-hidden flex items-center justify-center p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={linkImage}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={images[i % images.length]}
                    alt={link.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1 block">{activeTab.label}</span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-primary leading-tight break-words">{link.title}</h3>
                <p className="text-sm text-gray-400 mt-1 group-hover:text-primary transition-colors">Read More &rarr;</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TopicalEntryGrid
