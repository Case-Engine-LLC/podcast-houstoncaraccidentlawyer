'use client'

import React from 'react'
import Link from 'next/link'
import { episodes as staticEpisodesData } from '@/data/siteData'
import { subscribeCTA } from '@/lib/site-compat'
import type { Episode } from '@/lib/data'

interface OtherEpisodesProps {
  currentEpisodeId: string
  episodes?: Episode[]
}

const OtherEpisodes = ({ currentEpisodeId, episodes: propEpisodes }: OtherEpisodesProps) => {
  const episodesData = propEpisodes ?? staticEpisodesData
  const otherEpisodes = episodesData.filter((e) => e.id !== Number(currentEpisodeId))

  // Pad to show at least 3 cards
  const displayEpisodes = [...otherEpisodes]
  while (displayEpisodes.length < 3) {
    displayEpisodes.push({
      id: -(displayEpisodes.length + 1),
      number: displayEpisodes.length + 2,
      title: 'Coming Soon',
      subtitle: '',
      description: subscribeCTA.description,
      duration: '--:--:--',
      date: 'TBD',
      category: '',
      featured: false,
      topic: '',
      concepts: [],
      chapters: [],
      logo: '',
    })
  }

  return (
    <section className="py-20 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-heading text-3xl text-white">More Episodes</h2>
          <Link href="#episodes" className="text-sm text-amber-500 hover:text-amber-400 transition-colors font-medium">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayEpisodes.slice(0, 3).map((ep) => (
            <div
              key={ep.id}
              className="group bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all"
            >
              <div className="aspect-video bg-zinc-800 relative">
                {ep.logo ? (
                  <img src={ep.logo} alt={ep.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                )}
                {ep.id > 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center">
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                    Episode {ep.number}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{ep.duration}</span>
                </div>
                <h3 className="text-lg font-serif text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {ep.id > 0 ? (
                    <Link href={`/episode/${ep.slug}`}>{ep.title}</Link>
                  ) : (
                    ep.title
                  )}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">{ep.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OtherEpisodes
