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
    <section className="hero-section pt-[4rem] md:pt-[6rem] h-[120vh] md:h-[90vh]">
      {/* Hero Background Image - indexable - Desktop */}
      <figure className="hidden md:block absolute inset-0 z-0 m-0">
        <img
          src="/Hero.jpg"
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
          <p className="text-sm md:text-lg text-white/80 leading-relaxed mb-5 md:mb-8 max-w-xl mx-auto md:mx-0">
            {content.heroDescription}
          </p>

          {/* Available On Buttons */}
          <div className="flex flex-row gap-2 md:gap-4 items-center justify-center md:justify-start">
            <Link
              href={siteConfig.platformLinks.apple}
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
            </Link>

            <Link
              href={siteConfig.platformLinks.spotify}
              className="flex items-center gap-1.5 md:gap-3 px-2 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl transition-all hover:scale-105 flex-1 sm:flex-initial sm:min-w-[15rem]"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5.85px)'
              }}
            >
              <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_132_42)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M30.2385 16.8439C24.1148 13.2073 14.0125 12.8725 8.16429 14.6471C7.22569 14.9302 6.23389 14.4019 5.94889 13.4614C5.66389 12.5228 6.194 11.531 7.1326 11.246C13.8453 9.2073 25.0021 9.60043 32.053 13.7861C32.8966 14.2877 33.174 15.3788 32.6724 16.2224C32.1746 17.066 31.0802 17.3455 30.2385 16.8439ZM30.039 22.2304C29.6096 22.9277 28.6976 23.1459 28.0003 22.7184C22.895 19.5796 15.1088 18.6713 9.0687 20.5048C8.284 20.7404 7.45751 20.2995 7.22001 19.5167C6.98441 18.7339 7.4252 17.9071 8.208 17.6696C15.1069 15.5758 23.6854 16.5906 29.5507 20.1949C30.248 20.6224 30.4665 21.535 30.039 22.2304ZM27.7134 27.4034C27.3714 27.962 26.6437 28.1388 26.0851 27.7968C21.6239 25.0703 16.0075 24.4549 9.3936 25.9654C8.7571 26.1117 8.1206 25.7123 7.9762 25.0739C7.8299 24.4374 8.227 23.8035 8.8673 23.6572C16.1044 22.0023 22.3117 22.7143 27.3201 25.7752C27.8787 26.1172 28.0554 26.8448 27.7134 27.4034ZM19 0C8.5063 0 0 8.5063 0 19C0 29.4937 8.5063 38 19 38C29.4937 38 38 29.4937 38 19C38 8.5082 29.4937 0 19 0Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_132_42">
                      <rect width="38" height="38" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[0.6rem] md:text-xs text-white/60">Available on</div>
                <div className="text-sm md:text-lg font-bold text-white">Spotify</div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </section>

    {/* Featured Episode Player - Outside hero with negative margin */}
    <div className="relative z-10 -mt-16">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <FeaturedEpisodePlayer
          episodeNumber={String(ep.number ?? 1)}
          title={ep.title}
          description={(ep.description ?? '').replace(/\*\*/g, '')}
          duration={ep.duration}
          episodeLink={`/episode/${ep.number ?? 1}`}
          imageUrl={(latestEpisode as any)?.logo || undefined}
          audioUrl={(latestEpisode as any)?.audioUrl || undefined}
        />
      </div>
    </div>
    </>
  )
}

export default Hero
