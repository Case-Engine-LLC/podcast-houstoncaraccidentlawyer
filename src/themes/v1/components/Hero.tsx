'use client'

import React from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import FeaturedEpisodePlayer from './FeaturedEpisodePlayer'
import { siteConfig, episode, content } from '@/data/siteData'
import type { Episode } from '@/lib/data'

interface HeroProps {
  latestEpisode?: Episode | null
}

const Hero = ({ latestEpisode }: HeroProps) => {
  const ep = latestEpisode ?? episode
  return (
    <>
    <section className="hero-section relative pt-[4rem] md:pt-[6rem] pb-12 md:pb-0 md:h-[90vh]">
      {/* Hero Background Image - indexable - Desktop */}
      <figure className="hidden md:block absolute inset-0 z-0 m-0">
        <img
          src="/hero-placeholder.jpg"
          alt={content.heroTitle}
          className="w-full h-full object-cover object-[center_right]"
        />
      </figure>

      {/* Hero Background Image - Mobile/Tablet */}
      <figure className="md:hidden absolute inset-0 z-0 m-0">
        <img
          src="/mob-bg.jpg"
          alt={content.heroTitle}
          className="w-full h-full object-cover object-center"
        />
      </figure>

      {/* Marquee Banner */}
      <div className="relative z-[1] bg-secondary py-3 md:py-4 overflow-hidden whitespace-nowrap -rotate-[2deg] transform origin-center">
        <div className="flex animate-marquee">
          <span className="text-black font-bold uppercase tracking-[0.3em] text-xs md:text-sm inline-block">
            {siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="text-black font-bold uppercase tracking-[0.3em] text-xs md:text-sm inline-block">
            {siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-[1] max-w-container mx-auto px-4 md:px-12 pt-6 md:pt-12 pb-0 md:pb-12">
        {/* Text Content */}
        <div className="md:w-[55%] pb-6 md:pb-16 text-center md:text-left">
          {/* Heading */}
          <h1 className="text-[2.25rem] leading-[1.2] md:text-5xl font-bold md:leading-tighter text-white mb-3 md:mb-4">
            {content.heroTitle}
          </h1>

          {/* Description */}
          <p className="podcast-description text-sm md:text-lg text-white/80 leading-relaxed mb-5 md:mb-8 max-w-xl mx-auto md:mx-0">
            {content.heroDescription}
          </p>

          {/* Available On Buttons */}
          <div id="listen" className="flex flex-row gap-2 md:gap-4 items-center justify-center md:justify-start scroll-mt-24">
            <a
              href={siteConfig.platformLinks.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 md:gap-3 px-2 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl transition-all hover:scale-105 flex-1 sm:flex-initial sm:min-w-[15rem]"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5.85px)'
              }}
            >
              <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/></svg>
              </div>
              <div className="text-left">
                <div className="text-[0.6rem] md:text-xs text-white/60">Available on</div>
                <div className="text-sm md:text-lg font-bold text-white">YouTube</div>
              </div>
            </a>

            <a
              href={siteConfig.platformLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Spotify"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md"
            >
              <img
                src="/badges/listen-on-spotify.svg"
                alt="Listen on Spotify"
                className="h-10 md:h-12 w-auto"
              />
            </a>
          </div>
        </div>

      </div>
    </section>

    {/* Featured Episode Player - Outside hero with negative margin */}
    <div className="relative z-10 -mt-8 md:-mt-16">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <FeaturedEpisodePlayer
          episodeNumber={String(ep.number ?? 1)}
          title={ep.title}
          description={(ep.description ?? '').replace(/\*\*/g, '')}
          duration={ep.duration}
          episodeLink={`/episode/${(ep as { slug?: string; number?: number }).slug ?? ep.number ?? 1}`}
          imageUrl={(latestEpisode as any)?.logo || undefined}
          audioUrl={(latestEpisode as any)?.audioUrl || undefined}
        />
      </div>
    </div>
    </>
  )
}

export default Hero
