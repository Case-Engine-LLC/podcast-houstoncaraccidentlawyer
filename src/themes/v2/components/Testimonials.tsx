'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { testimonials as testimonialsData, reviewsInstruction } from '@/data/siteData'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const cardsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, testimonialsData.length - cardsPerView)

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1))
  const handleNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))

  const getTransform = () => {
    if (isMobile) return `translateX(-${currentIndex * 100}%)`
    return `translateX(-${currentIndex * (100 / cardsPerView)}%)`
  }

  return (
    <section id="reviews" className="py-24 bg-[#f4f2ed] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-[#FF9E00] font-bold uppercase tracking-widest text-xs">Testimonials</span>
            <h2 className="font-heading text-4xl md:text-5xl text-[#10284B] mt-2 leading-tight">
              What Our Clients Say
            </h2>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#10284B] hover:text-white hover:border-[#10284B] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 rounded-full bg-[#10284B] text-white flex items-center justify-center hover:bg-[#091830] transition-all shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Reviews Instruction */}
        {reviewsInstruction && (
          <p className="text-sm text-gray-500 mb-12 max-w-2xl">{reviewsInstruction}</p>
        )}

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex items-stretch transition-transform duration-500 ease-in-out md:gap-6"
            style={{ transform: getTransform() }}
          >
            {testimonialsData.map((t) => (
              <div
                key={t.id}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
              >
                <div className="bg-white rounded-2xl p-8 h-full flex flex-col relative">
                  {/* Quote mark */}
                  <div className="absolute top-6 right-8 text-6xl font-heading text-[#FF9E00]/30 leading-none">&ldquo;</div>

                  {/* Author Row */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-[#10284B]/10 flex items-center justify-center text-[#10284B] font-bold text-sm border-2 border-white shadow-sm flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-[#10284B]">{t.name}</div>
                      <div className="text-xs uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
                          <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                          <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                          <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
                          <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                        </svg>
                        {t.role}
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={20} fill="#FF9E00" stroke="#FF9E00" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-[#10284B] text-[15px] leading-relaxed flex-grow">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
