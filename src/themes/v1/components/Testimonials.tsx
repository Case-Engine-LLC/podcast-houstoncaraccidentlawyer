'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { testimonials as testimonialsData, reviewsInstruction, siteConfig } from '@/data/siteData'

interface Testimonial {
  id: number
  name: string
  initials: string
  role: string
  rating: number
  text: string
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const testimonials: Testimonial[] = testimonialsData

  const cardsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, testimonials.length - cardsPerView)

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const progressPercentage = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 0

  const getTransform = () => {
    if (isMobile) {
      return `translateX(-${currentIndex * 100}%)`
    }
    return `translateX(-${currentIndex * (100 / cardsPerView)}%)`
  }

  return (
    <section className="testimonails-home bg-white py-16 md:py-20">
      <div className="max-w-container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-10 text-center">
          {/* Rating SVG */}
          <div className="flex justify-center mb-4">
            <img
              src="/icons/rating.svg"
              alt="Rating"
              className="h-8 md:h-10"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-none">
            Reviews of {siteConfig.podcastName}
          </h2>
          {reviewsInstruction && (
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              {reviewsInstruction}
            </p>
          )}
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Cards Container */}
          <div className="overflow-hidden">
            <ul
              className="flex items-stretch transition-transform duration-500 ease-in-out md:gap-6"
              style={{
                transform: getTransform()
              }}
            >
              {testimonials.map((testimonial) => (
                <li
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] flex flex-col"
                >
                  {/* Testimonial Card with Speech Bubble */}
                  <div className="relative mb-6 flex-grow flex flex-col">
                    <div className="bg-[#EBF9FF] rounded-2xl p-6 md:p-8 relative flex flex-col flex-grow">
                      {/* Quote Icon */}
                      <svg
                        className="w-12 h-12 text-cyan-200 mb-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                      </svg>

                      {/* Testimonial Text */}
                      <p className="text-base text-gray-900 leading-relaxed mb-6 flex-grow">
                        {testimonial.text}
                      </p>

                      {/* Star Rating with Google Icon */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, index) => (
                            <Star
                              key={index}
                              size={24}
                              fill="#FAA31A"
                              stroke="#FAA31A"
                            />
                          ))}
                        </div>
                        {/* Google Icon */}
                        <svg className="w-8 h-8" viewBox="0 0 48 48">
                          <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                          <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                          <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
                          <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                        </svg>
                      </div>

                      {/* Speech Bubble Triangle */}
                      <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#EBF9FF]"></div>
                    </div>
                  </div>

                  {/* Reviewer Info - Outside Card */}
                  <div className="flex items-center gap-3 pl-2">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-700 font-bold text-lg">
                        {testimonial.initials}
                      </span>
                    </div>

                    {/* Name and Role */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 mt-8">
            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={24} stroke="white" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={24} stroke="white" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex-grow h-1 bg-black/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500 ease-in-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
