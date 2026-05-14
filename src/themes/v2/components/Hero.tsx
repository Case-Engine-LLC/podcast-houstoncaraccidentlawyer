'use client'

import React from 'react'
import Link from 'next/link'
import { siteConfig, episode, content, podcastTeam } from '@/data/siteData'

const Hero = () => {
  const host = podcastTeam[0]

  return (
    <header className="relative pt-32 pb-24 px-6 overflow-hidden bg-[#f4f2ed]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Column */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-primary text-xs font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {siteConfig.tagline || 'New Episodes Weekly'}
          </div>

          <h1 className="font-heading text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] text-primary">
            {content.heroTitle}
          </h1>

          <p className="text-lg md:text-xl text-primary/60 max-w-lg leading-relaxed">
            {content.heroDescription}
          </p>

          {/* Platform Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
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
            <a
              href={siteConfig.platformLinks.apple}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Apple Podcasts"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md"
            >
              <img
                src="/badges/listen-on-apple-podcasts.svg"
                alt="Listen on Apple Podcasts"
                className="h-10 md:h-12 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className="relative h-[500px] lg:h-[600px] w-full">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-3/4 h-full bg-primary rounded-t-[160px] opacity-10" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />

          {/* Main Image */}
          <div className="absolute inset-0 rounded-t-[200px] overflow-hidden border-8 border-white shadow-2xl">
            <img
              src="/hero-placeholder.jpg"
              alt="Hero background"
              className="w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Episode Player Card */}
          <div className="absolute -bottom-12 -left-6 lg:left-12 bg-white p-6 rounded-2xl shadow-xl max-w-sm w-[90%] border-l-4 border-secondary">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">Latest Episode</span>
              <span className="text-xs text-gray-400">Episode {episode.number} • {episode.duration}</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-primary mb-2">{episode.title}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{episode.description}</p>

            <div className="flex items-center gap-4">
              <Link href={`/episode/${(episode as { slug?: string; number?: number }).slug ?? episode.number}`} className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors shadow-lg">
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </Link>
              <div className="flex-1">
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-primary" />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                  <span>12:45</span>
                  <span>{episode.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
