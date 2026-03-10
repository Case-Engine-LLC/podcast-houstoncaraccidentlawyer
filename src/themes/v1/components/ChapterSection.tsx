'use client'

import React from 'react'
import Link from 'next/link'
import { chapters, chaptersDescription, attorney } from '@/data/siteData'

const ChapterSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#c9c9c9] px-6 py-1.5 rounded-[6px] text-[12px] font-bold text-black uppercase tracking-[0.96px] mb-6">
            TOPICS INSIDE
          </div>
          <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.48px] text-black mb-8">
            What We Cover in This Episode
          </h2>
          <p className="text-[18px] leading-[1.3] text-black max-w-[926px] mx-auto opacity-70">
            {chaptersDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Chapter Image/Graphics */}
          <div className="relative">
            <div className="aspect-square bg-[#c9c9c9] rounded-[20px] flex items-center justify-center relative overflow-hidden">
               <img src={attorney.photo} alt={attorney.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-64 p-6 bg-white shadow-xl rounded-[12px] hidden md:block border border-black/5 animate-in slide-in-from-left-4">
               <p className="text-[14px] leading-[1.4] text-[#151823]">
                {attorney.name}, {attorney.title} at {attorney.firm}
               </p>
            </div>
          </div>

          {/* Chapter List */}
          <div className="flex flex-col gap-0 relative">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/10" />

            {chapters.map((chapter, index) => (
              <div
                key={index}
                className="relative pl-8 py-6 flex flex-col justify-center min-h-[80px]"
              >
                {/* Active Indicator Line */}
                {chapter.active && (
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black" />
                )}

                <h3 className={`text-[20px] md:text-[24px] font-bold ${chapter.active ? 'text-black' : 'text-black/40'}`}>
                  {chapter.title}
                </h3>

                {chapter.active && (
                  <div className="mt-8">
                    <Link
                      href="#episode-content"
                      className="bg-black text-white px-8 py-4 rounded-[3px] font-bold text-[14px] uppercase tracking-[0.7px] hover:bg-black/80 transition-all inline-block"
                    >
                      Listen Now
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChapterSection
