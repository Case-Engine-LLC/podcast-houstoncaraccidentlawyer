'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, CheckCircle, FileText } from 'lucide-react'
import { about, attorney, siteConfig } from '@/data/siteData'

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [shouldShowToggle, setShouldShowToggle] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      // Measure the actual content height
      const contentHeight = contentRef.current.scrollHeight
      setShouldShowToggle(contentHeight > 300)
    }
  }, [])

  return (
    <section id="about" className="bg-white py-16 md:py-20">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-none">
              {about.title}
            </h2>

            {/* First paragraph - always visible */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              {about.description}
            </p>

            {/* Expandable content */}
            <div
              ref={contentRef}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                shouldShowToggle
                  ? isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  : 'max-h-[1000px] opacity-100'
              }`}
            >
              <ul className="space-y-3 mb-4">
                {about.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-secondary mt-1 flex-shrink-0" />
                    <span className="text-base md:text-lg text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Read More / Read Less Button - Auto-shown based on content height */}
            {shouldShowToggle && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-base font-semibold text-black hover:opacity-70 transition-opacity mt-4 mx-auto md:mx-0"
              >
                {isExpanded ? 'Read Less' : 'Read More'}
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
            )}

            {/* CTA/Form */}
            <div className="mt-6 flex justify-center md:justify-start">
              <Link
                href={siteConfig.formCTA?.href || '#form'}
                className="inline-flex items-center gap-3 bg-secondary text-black px-8 py-4 rounded-2xl transition-transform hover:scale-105 font-bold"
              >
                <FileText className="w-5 h-5" />
                <span>{siteConfig.formCTA?.text || 'Free Consultation'}</span>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full h-[480px] md:h-[580px] rounded-2xl overflow-hidden">
            <img
              src="/about-bg.jpg"
              alt={about.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
