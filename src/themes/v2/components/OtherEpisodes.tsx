'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Episode } from '@/lib/data'
import { episodes as staticEpisodesData } from '@/data/siteData'
import { subscribeCTA } from '@/lib/site-compat'

interface EpisodeCard {
  id: string
  title: string
  episodeNumber: string
  category: string
  duration: string
  isComingSoon: boolean
}

interface OtherEpisodesProps {
  episodes?: Episode[]
}

function OtherEpisodes({ episodes: propEpisodes }: OtherEpisodesProps) {
  const episodesData = propEpisodes ?? staticEpisodesData
  const [currentIndex, setCurrentIndex] = useState(0)

  const episodes: EpisodeCard[] = [
    ...episodesData.map((ep) => ({
      id: String(ep.id),
      title: ep.title,
      episodeNumber: `Episode ${ep.number}`,
      category: ep.category,
      duration: ep.duration,
      isComingSoon: false,
    })),
    {
      id: 'coming-2',
      title: 'Coming Soon: New Attorney Interview',
      episodeNumber: 'Episode 2',
      category: 'Personal Injury',
      duration: 'TBA',
      isComingSoon: true,
    },
    {
      id: 'coming-3',
      title: 'Coming Soon: New Attorney Interview',
      episodeNumber: 'Episode 3',
      category: 'Personal Injury',
      duration: 'TBA',
      isComingSoon: true,
    },
  ]

  const maxIndex = Math.max(0, episodes.length - 3)

  function handlePrevious() {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  function handleNext() {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const progressPercentage = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 0

  return (
    <section className="py-16 md:py-24 bg-[#f4f2ed]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#10284B] mb-4">
            Other Episodes
          </h2>
          <p className="text-base md:text-lg text-[#091830]/50 max-w-3xl mx-auto leading-relaxed">
            {subscribeCTA.description}
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden mb-8">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {episodes.map((ep) => {
              const href = ep.isComingSoon ? '#subscribe' : `/v2/episode/${ep.id}`

              return (
                <Link
                  key={ep.id}
                  href={href}
                  className="group flex flex-col flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
                >
                  {/* Image placeholder */}
                  <div className="aspect-video bg-[#10284B] rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center">
                    {ep.isComingSoon ? (
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto mb-3">
                          <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm text-white/30 font-medium">Coming Soon</span>
                      </div>
                    ) : (
                      <svg width="60" height="60" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/20">
                        <circle cx="45" cy="35" r="12" stroke="currentColor" strokeWidth="2" />
                        <path d="M15 105 L45 65 L75 90 L105 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}

                    {/* Hover play overlay for non-coming-soon cards */}
                    {!ep.isComingSoon && (
                      <div className="absolute inset-0 bg-[#FF9E00]/0 group-hover:bg-[#FF9E00]/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                          <svg className="w-5 h-5 text-[#10284B] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Episode number badge */}
                  <div className="inline-block self-start bg-[#10284B]/10 px-3 py-1.5 rounded-full text-xs font-bold text-[#10284B] uppercase tracking-widest mb-3">
                    {ep.episodeNumber}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold text-[#10284B] mb-2 group-hover:text-[#FF9E00] transition-colors leading-snug">
                    {ep.title}
                  </h3>

                  {/* Meta */}
                  <p className="text-sm text-[#091830]/40">
                    {ep.category} &bull; {ep.duration}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full bg-[#10284B] flex items-center justify-center hover:bg-[#091830] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous episodes"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-12 h-12 rounded-full bg-[#10284B] flex items-center justify-center hover:bg-[#091830] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next episodes"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Progress Bar */}
          <div className="flex-grow h-1 bg-[#10284B]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#10284B] transition-all duration-500 ease-in-out rounded-full"
              style={{ width: `${Math.max(progressPercentage, 5)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default OtherEpisodes
