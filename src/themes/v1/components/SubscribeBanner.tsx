'use client'

import React from 'react'
import Link from 'next/link'
import { PlayCircle } from 'lucide-react'

const SubscribeBanner = () => {
  return (
    <section className="py-24 bg-[#070519] overflow-hidden relative">
      {/* Decorative Gradient/Shape */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full" />
      
      <div className="max-w-container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Podcast Mockup */}
          <div className="w-full md:w-1/3 order-2 md:order-1">
            <div className="aspect-[377/486] bg-[#6f6f6f] rounded-[12px] relative shadow-2xl overflow-hidden border border-white/10 group">
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="bg-white text-black px-6 py-2 rounded-full font-bold">Listen Now</span>
               </div>
               {/* Placeholder for Podcast Image */}
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <PlayCircle className="w-16 h-16 text-white" />
               </div>
            </div>
          </div>

          {/* CTA Content */}
          <div className="w-full md:w-2/3 text-left order-1 md:order-2">
            <div className="inline-block bg-white/10 px-6 py-1.5 rounded-[6px] text-[12px] font-bold text-white uppercase tracking-[0.96px] mb-8">
              SUBSCRIBE TO OUR PODCAST
            </div>
            <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6 leading-none">
              Get Every Episode Delivered To Your Inbox
            </h2>
            <p className="text-[20px] md:text-[24px] leading-[1.3] text-white/70 mb-12 max-w-[600px]">
              Subscribe for our free podcast and learn how to protect your rights after a car accident.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-[500px]">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white/10 border border-white/20 rounded-[8px] px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
                required
              />
              <button 
                type="submit"
                className="bg-white text-black px-8 py-4 rounded-[8px] font-bold hover:bg-white/90 transition-all shrink-0"
              >
                Get It Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubscribeBanner
