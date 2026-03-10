'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { topicalEntryGrid } from '@/data/siteData'

const TopicalEntryGrid = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-16 md:py-20 bg-[#EBF3F7]">
      <div className="max-w-container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 leading-none">
            {topicalEntryGrid.title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {topicalEntryGrid.tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all ${
                activeTab === index
                  ? 'bg-[#FAA31A] text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Link Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {topicalEntryGrid.tabs[activeTab].links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all group flex flex-col md:flex-row"
            >
              {/* Image Placeholder - Alternates left/right on desktop */}
              <div className={`w-full md:w-1/3 bg-gray-400 flex-shrink-0 ${
                index % 2 === 1 ? 'md:order-2' : ''
              }`}>
                <div className="w-full h-48 md:h-full bg-gray-400 flex items-center justify-center">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="20" r="6" stroke="white" strokeWidth="2" strokeOpacity="0.4"/>
                    <path d="M10 50 L25 35 L40 45 L50 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4"/>
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                  {link.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                  {link.description}
                </p>
                <div className="flex items-center text-black font-semibold group-hover:text-[#FAA31A] transition-colors">
                  <span className="text-sm md:text-base">Read More</span>
                  <ChevronRight className="w-5 h-5 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopicalEntryGrid
