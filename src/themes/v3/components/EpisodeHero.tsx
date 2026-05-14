'use client'

import React from 'react'
import Link from 'next/link'
import { episode as staticEpisode, siteConfig, episodes as episodesData } from '@/data/siteData'
import type { Episode } from '@/lib/data'

interface EpisodeHeroProps {
  episodeId: string
  episode?: Episode | null
}

const EpisodeHero = ({ episodeId, episode: propEpisode }: EpisodeHeroProps) => {
  const staticFallback = episodesData.find((e) => e.id === Number(episodeId)) || {
    ...episodesData[0],
    title: staticEpisode.title,
    description: staticEpisode.description,
    duration: staticEpisode.duration,
    date: staticEpisode.date,
    number: staticEpisode.number,
    topic: 'Personal Injury',
    logo: episodesData[0]?.logo || '',
  }
  const ep = propEpisode ?? staticFallback

  return (
    <section className="relative pt-32 pb-20 bg-[#050505] overflow-hidden">
      {/* Amber glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-12">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="#episodes" className="hover:text-white transition-colors">Episodes</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-white">Episode {ep.number}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium tracking-wide uppercase">
              Episode {ep.number} &bull; {ep.date}
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              {ep.title}
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed">
              {ep.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-slate-300 border border-white/5">
                {ep.topic}
              </span>
              <span className="text-sm text-slate-500 font-mono">{ep.duration}</span>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a
                href={siteConfig.platformLinks.spotify}
                className="flex items-center gap-2 bg-[#1DB954] text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-[#1ed760] transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Listen on Spotify
              </a>
              <a
                href={siteConfig.platformLinks.apple}
                className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/20 transition-all border border-white/10"
              >
                Listen on Apple
              </a>
            </div>
          </div>

          {/* Cover Art */}
          <div className="relative group">
            <div className="absolute inset-0 border border-amber-500/20 translate-x-4 translate-y-4 rounded-2xl" />
            <div className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-square">
              {ep.logo ? (
                <img src={ep.logo} alt={ep.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                  <svg className="w-24 h-24 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EpisodeHero
