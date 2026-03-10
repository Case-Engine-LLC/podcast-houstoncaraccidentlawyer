'use client'

import React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/data/siteData'
import { subscribeCTA } from '@/lib/site-compat'

const PodcastSubscribe = () => {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-container mx-auto bg-gradient-to-br from-[#070519] via-[#1a1444] to-[#070519] rounded-[24px] overflow-hidden relative min-h-[400px] flex items-center">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ce5743]/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 py-16">
          {/* Phone Mockup Column */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
             <div className="relative w-[280px] aspect-[9/19] bg-black rounded-[40px] border-[8px] border-[#1a1835] shadow-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                <img
                  src="/palceholder.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=500';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="w-12 h-12 bg-[#ce5743] rounded-full flex items-center justify-center mb-4">
                      <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1" />
                   </div>
                   <div className="h-1 w-full bg-white/20 rounded-full mb-2">
                      <div className="h-full w-1/3 bg-[#ce5743] rounded-full" />
                   </div>
                   <div className="flex justify-between text-[10px] text-white/50">
                      <span>12:45</span>
                      <span>-45:00</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Content Column */}
          <div className="md:col-span-7">
            <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-6 leading-none">
              {subscribeCTA.title}
            </h2>
            <p className="text-[18px] text-white/60 mb-10 max-w-[500px]">
              {subscribeCTA.description}
            </p>
            <button className="bg-white text-black px-10 py-4 rounded-[6px] font-bold text-[18px] hover:bg-white/90 transition-all">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PodcastSubscribe
