'use client'

import React from 'react'
import { Award, Clock, MapPin } from 'lucide-react'
import { awards, stats } from '@/data/siteData'

const AwardsSection = () => {
  const cards = [
    {
      icon: <Award className="w-8 h-8 text-black" />,
      title: `${stats.satisfactionRate}% Satisfaction`,
      description: awards[0]?.description || 'Recognition for outstanding client satisfaction and legal excellence.'
    },
    {
      icon: <Clock className="w-8 h-8 text-black" />,
      title: '24/7 Availability',
      description: 'Round-the-clock support through phone, text, email, and AI chat for all clients.'
    },
    {
      icon: <MapPin className="w-8 h-8 text-black" />,
      title: `${stats.casesHandled}+ Cases/Year`,
      description: 'Over 200 personal injury cases handled annually with dedicated teams of 3-7 people per client.'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-[#eeeef0] rounded-[12px] p-12 text-center flex flex-col items-center border border-white/10"
          >
            <div className="w-[88px] h-[88px] rounded-full bg-white flex items-center justify-center mb-8 shadow-sm">
              {card.icon}
            </div>
            <h3 className="text-[28px] font-bold text-black mb-4 tracking-[-0.28px]">
              {card.title}
            </h3>
            <p className="text-[16px] leading-[1.4] text-[#676767] tracking-[0.32px] max-w-[340px]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AwardsSection
