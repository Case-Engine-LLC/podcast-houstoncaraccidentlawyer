'use client'

import React from 'react'
import Link from 'next/link'
import { episode as staticEpisode, siteConfig, episodes as staticEpisodesData } from '@/data/siteData'
import type { Episode } from '@/lib/data'

interface EpisodeHeroProps {
  episode?: Episode | null
}

const EpisodeHero = ({ episode: propEpisode }: EpisodeHeroProps) => {
  const ep = propEpisode ?? staticEpisode
  const episodesData = propEpisode ? [propEpisode] : staticEpisodesData
  return (
    <>
      {/* Marquee Banner */}
      <div className="bg-secondary py-4 overflow-hidden whitespace-nowrap -rotate-[2deg] transform origin-center">
        <div className="flex animate-marquee">
          <span className="text-black font-bold uppercase tracking-[0.3em] text-sm inline-block">
            {siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="text-black font-bold uppercase tracking-[0.3em] text-sm inline-block">
            {siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Episode Badge */}
              <div className="inline-block bg-gray-200 px-4 py-2 rounded-md text-xs font-bold text-black uppercase tracking-widest mb-6">
                EPISODE {ep.number}
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black mb-6">
                {ep.title}
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
                {(() => { const d = (ep.description ?? ''); return d.length > 250 ? d.slice(0, 250) + '...' : d; })()}
              </p>

              {/* Platform Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={siteConfig.platformLinks.apple}
                  className="flex items-center gap-3 px-6 py-4 bg-black text-white rounded-2xl transition-all hover:scale-105 w-full sm:w-auto sm:min-w-[15rem]"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/></svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white/60 uppercase">Available on</div>
                    <div className="text-base font-bold text-white">YouTube</div>
                  </div>
                </Link>

                <Link
                  href={siteConfig.platformLinks.spotify}
                  className="flex items-center gap-3 px-6 py-4 bg-black text-white rounded-2xl transition-all hover:scale-105 w-full sm:w-auto sm:min-w-[15rem]"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg width="30" height="30" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <div className="text-xs text-white/60 uppercase">Available on</div>
                    <div className="text-base font-bold text-white">Spotify</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Image — Episode Thumbnail */}
            <div className="relative w-full h-[280px] md:h-[380px] flex items-center justify-center">
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={episodesData[0]?.logo || '/cover-placeholder.jpg'}
                  alt={ep.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EpisodeHero
