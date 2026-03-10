'use client'

import React, { useState } from 'react'
import { testimonials, stats, reviewsInstruction } from '@/data/siteData'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prev = () => setCurrentIndex(Math.max(0, currentIndex - 1))
  const next = () => setCurrentIndex(Math.min(testimonials.length - 1, currentIndex + 1))

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-heading text-4xl text-white mb-4">Reviews</h2>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-bold text-lg">{stats.rating}</span>
              <span className="text-slate-500 text-sm">({stats.reviewCount} Google Reviews)</span>
            </div>
            <p className="text-slate-500 text-xs mt-3 max-w-md">{reviewsInstruction}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= testimonials.length - 1}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-zinc-900 p-8 rounded-2xl border border-white/5 relative">
              {/* Quote mark */}
              <div className="absolute top-8 right-8 text-amber-500/20">
                <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center text-lg font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google"
                  className="w-5 h-5 ml-auto opacity-70"
                />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex text-amber-400 gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
