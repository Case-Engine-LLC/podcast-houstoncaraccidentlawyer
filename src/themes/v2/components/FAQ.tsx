'use client'

import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { faqGroups } from '@/data/siteData'

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [openItem, setOpenItem] = useState<string | null>('0-0')
  const tabsRef = useRef<HTMLDivElement>(null)

  const handleTabChange = (index: number) => {
    setActiveTab(index)
    setOpenItem(null)
  }

  const toggleItem = (key: string) => {
    setOpenItem(openItem === key ? null : key)
  }

  const scrollTabs = (dir: 'left' | 'right') => {
    if (!tabsRef.current) return
    tabsRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
  }

  const activeGroup = faqGroups[activeTab]

  return (
    <div>
      <h2 className="font-heading text-3xl text-[#10284B] mb-8">Frequently Asked Questions</h2>

      {/* Horizontal Tabs with Scroll Arrows */}
      <div className="relative mb-8">
        {/* Left arrow */}
        <button
          onClick={() => scrollTabs('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-8 flex items-center justify-center bg-gradient-to-r from-[#f4f2ed] via-[#f4f2ed] to-transparent"
        >
          <ChevronLeft size={16} className="text-gray-400" />
        </button>

        {/* Scrollable tabs */}
        <div ref={tabsRef} className="overflow-x-auto scrollbar-hide mx-8">
          <div className="flex gap-0 border-b border-gray-200 min-w-max">
            {faqGroups.map((group, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`pb-3 px-4 whitespace-nowrap text-sm font-bold transition-all ${
                  activeTab === index
                    ? 'text-[#10284B] border-b-2 border-[#10284B]'
                    : 'text-gray-400 hover:text-[#10284B]'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scrollTabs('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-8 flex items-center justify-center bg-gradient-to-l from-[#f4f2ed] via-[#f4f2ed] to-transparent"
        >
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Accordion */}
      <div className="divide-y divide-gray-200">
        {activeGroup.questions.map((q, i) => {
          const itemKey = `${activeTab}-${i}`
          return (
            <div key={i}>
              <button
                onClick={() => toggleItem(itemKey)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="font-bold text-[#10284B] pr-8 text-base leading-snug group-hover:text-[#FF9E00] transition-colors">
                  {q.question}
                </span>
                <span className="flex-shrink-0 text-[#10284B] text-2xl font-light leading-none">
                  {openItem === itemKey ? '−' : '+'}
                </span>
              </button>
              {openItem === itemKey && (
                <div className="pb-6 text-gray-500 text-sm leading-relaxed">
                  {q.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FAQ
