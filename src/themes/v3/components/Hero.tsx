'use client'

import React from 'react'
import Link from 'next/link'
import { siteConfig, episode, content, podcastTeam, attorney } from '@/data/siteData'

const Hero = () => {
  return (
    <header className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 px-6 overflow-hidden bg-[#050505]">
      {/* Amber glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-400/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-wide mb-8 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {siteConfig.tagline || 'New Episodes Weekly'}
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
          {content.heroTitle}
        </h1>

        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
          {content.heroDescription}
        </p>

        {/* Platform Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
              href={siteConfig.platformLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Spotify"
              className="inline-block transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md"
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

        {/* Latest Episode Card */}
        <div className="mx-auto max-w-2xl bg-[#141414]/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 text-left relative group cursor-pointer transition-all border border-white/[0.08] hover:border-amber-500/50">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start gap-6 relative z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <img
                src="/hero-placeholder.jpg"
                alt={episode.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">
                  Latest Episode &bull; Ep {episode.number}
                </span>
                <span className="text-xs text-slate-500">{episode.duration}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors">
                {episode.title}
              </h3>
              <p className="text-sm text-slate-400 line-clamp-2 mb-6">
                {episode.description}
              </p>

              <div className="flex items-center gap-4">
                <Link
                  href={`/episode/${(episode as { slug?: string; number?: number }).slug ?? episode.number}`}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Link>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-amber-500 rounded-full" />
                </div>
                <span className="text-xs text-slate-500 font-mono">24:12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
