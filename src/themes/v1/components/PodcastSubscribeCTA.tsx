'use client'

import React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/data/siteData'
import { subscribeCTA } from '@/lib/site-compat'

const PodcastSubscribeCTA = () => {
  return (
    <section className="bg-white py-4 md:py-2">
      <div className="max-w-container mx-auto px-6 md:px-12">
        {/* Background Container with Image */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/hero-placeholder.jpg"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Yellow CTA Card */}
          <div className="relative bg-secondary/95 rounded-3xl mx-4 md:mx-8 overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-5 items-end relative">
              {/* Left Side - Image */}
              <div className="relative md:col-span-2 md:absolute md:left-0 md:bottom-0 md:w-2/5 flex justify-center md:justify-start order-2 md:order-1">
                <img
                  src="/about-placehoder.jpg"
                  alt="Attorneys"
                  className="w-full max-w-[450px] md:max-w-[420px] h-auto object-contain"
                />
              </div>

              {/* Right Side - Content */}
              <div className="md:col-span-3 md:col-start-3 py-12 md:py-14 px-6 md:px-12 order-1 md:order-2">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {subscribeCTA.title}
                </h3>
                <p className="text-sm md:text-base text-white leading-relaxed mb-6">
                  {subscribeCTA.description}
                </p>
                {subscribeCTA.highlights && (
                  <ul className="space-y-3 mb-6">
                    {subscribeCTA.highlights.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-white">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href="#subscribe"
                  className="inline-block px-8 py-4 bg-white text-black rounded-xl font-semibold text-base hover:bg-white/90 transition-all"
                >
                  Subscribe Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PodcastSubscribeCTA
