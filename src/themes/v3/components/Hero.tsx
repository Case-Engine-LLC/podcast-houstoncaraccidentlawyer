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
            className="flex items-center gap-3 bg-[#1DB954] hover:bg-[#1ed760] text-black px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span>Spotify</span>
          </a>
          <a
            href={siteConfig.platformLinks.apple}
            className="flex items-center gap-3 bg-white hover:bg-slate-200 text-black px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.68-.83 1.14-1.99 1.01-3.15-1.09.05-2.4.74-3.17 1.68-.69.85-1.28 2.21-1.11 3.27 1.19.09 2.4-.6 3.27-1.8z" />
            </svg>
            <span>Apple Podcasts</span>
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
                  href={`/episode/${episode.slug}`}
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
