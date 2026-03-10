'use client'

import React from 'react'

const BottomMarquee = () => {
  return (
    <section className="bg-black py-16 overflow-hidden">
      <div className="whitespace-nowrap flex">
        <div className="inline-block animate-marquee-slower text-[80px] md:text-[140px] font-black text-white px-4 uppercase">
          SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01
        </div>
        <div className="inline-block animate-marquee-slower text-[80px] md:text-[140px] font-black text-white px-4 uppercase">
          SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01
        </div>
      </div>
    </section>
  )
}

export default BottomMarquee
