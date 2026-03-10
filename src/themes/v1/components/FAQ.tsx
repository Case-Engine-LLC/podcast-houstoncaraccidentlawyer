'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqGroups } from '@/data/siteData'

const levelStyles: Record<string, string> = {
  h2: 'text-lg md:text-xl font-bold',
  h3: 'text-base md:text-lg font-semibold',
  h4: 'text-sm md:text-base font-medium',
}

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>('0-0')
  const [activeTab, setActiveTab] = useState(0)

  const toggleItem = (key: string) => {
    setOpenItem(openItem === key ? null : key)
  }

  const handleTabChange = (index: number) => {
    setActiveTab(index)
    setOpenItem(null) // Close all items when switching tabs
  }

  const activeGroup = faqGroups[activeTab]

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Common questions about the podcast, personal injury law, and working with an attorney.
          </p>
        </div>

        {/* Horizontal Scrollable Tabs */}
        <div className="mb-8 md:mb-12 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 md:gap-4 border-b border-gray-200 min-w-max md:min-w-0 md:justify-center px-6 md:px-0">
            {faqGroups.map((group, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`pb-3 px-4 whitespace-nowrap text-sm md:text-base font-semibold transition-all ${
                  activeTab === index
                    ? 'text-[#FAA31A] border-b-2 border-[#FAA31A]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto">
          {/* Questions for Active Tab */}
          <div className="flex flex-col gap-3">
            {activeGroup.questions.map((faq, faqIndex) => {
              const itemKey = `${activeTab}-${faqIndex}`
              const level = faq.level || 'h3'
              const style = levelStyles[level] || levelStyles.h3
              return (
                <div
                  key={faqIndex}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                >
                  <button
                    className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    onClick={() => toggleItem(itemKey)}
                  >
                    <span className={`${style} text-black pr-4`}>
                      {faq.question}
                    </span>
                    <span className="shrink-0">
                      {openItem === itemKey ? (
                        <Minus size={24} className="text-black" strokeWidth={2} />
                      ) : (
                        <Plus size={24} className="text-black" strokeWidth={2} />
                      )}
                    </span>
                  </button>

                  {openItem === itemKey && (
                    <div className="px-6 md:px-8 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-base text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
