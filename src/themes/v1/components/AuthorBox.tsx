'use client'

import React from 'react'
import { attorney } from '@/data/siteData'

const AuthorBox = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Author Content */}
          <div className="order-2 md:order-1">
            <div className="inline-block bg-[#c9c9c9] px-6 py-1.5 rounded-[6px] text-[12px] font-bold text-black uppercase tracking-[0.96px] mb-6">
              ABOUT THE AUTHOR
            </div>
            <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.48px] text-black mb-8 max-w-[571px]">
              {attorney.name}
            </h2>
            <div className="text-[18px] leading-[1.3] text-black space-y-6">
              {attorney.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-12">
               <img src={attorney.signature} alt="Author Signature" className="h-[84px] object-contain" />
            </div>
          </div>

          {/* Author Image */}
          <div className="order-1 md:order-2">
            <div className="aspect-[454/526] bg-[#c9c9c9] rounded-[20px] relative overflow-hidden">
               <img src={attorney.photo} alt={attorney.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthorBox
