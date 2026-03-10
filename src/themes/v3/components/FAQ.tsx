'use client'

import React, { useState, useRef } from 'react'
import { faqGroups } from '@/data/siteData'

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  const currentGroup = faqGroups[activeTab]

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <h3 className="font-heading text-3xl text-white mb-8">Common Questions</h3>

      {/* Tab Bar */}
      <div className="relative mb-8">
        <button
          onClick={() => scrollTabs('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-8 flex items-center justify-center bg-gradient-to-r from-[#050505] to-transparent text-slate-400 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div ref={tabsRef} className="flex gap-2 overflow-x-auto px-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {faqGroups.map((group, i) => (
            <button
              key={group.label}
              onClick={() => { setActiveTab(i); setOpenIndex(null) }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                activeTab === i
                  ? 'bg-amber-500 text-black'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTabs('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-8 flex items-center justify-center bg-gradient-to-l from-[#050505] to-transparent text-slate-400 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {currentGroup.questions.slice(0, 5).map((q, i) => (
          <div key={i} className="group border-b border-white/10 pb-4">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex justify-between items-center w-full text-left cursor-pointer"
            >
              <h4 className="text-lg font-medium text-slate-200 group-hover:text-amber-400 transition-colors pr-8">
                {q.question}
              </h4>
              <span className="text-2xl font-light text-slate-500 group-hover:text-amber-400 shrink-0">
                {openIndex === i ? '−' : '+'}
              </span>
            </button>
            {openIndex === i && (
              <div className="pt-4 text-slate-400 text-sm leading-relaxed">
                {q.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
