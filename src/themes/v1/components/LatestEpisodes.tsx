'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Play, Info, ArrowRight, LayoutList, LayoutGrid } from 'lucide-react'
import { episodes as staticEpisodesData, episodeTopics, episodeLocations } from '@/data/siteData'
import { subscribeCTA } from '@/lib/site-compat'
import type { Episode } from '@/lib/data'

interface LatestEpisodesProps {
  episodes?: Episode[]
}

const LatestEpisodes = ({ episodes: propEpisodes }: LatestEpisodesProps) => {
  const episodesData = propEpisodes ?? staticEpisodesData
  const [activeTopic, setActiveTopic] = useState('All')
  const [activeLocation, setActiveLocation] = useState('All')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [showAll, setShowAll] = useState(false)

  const defaultEpisodes = episodesData.map(ep => ({
    id: String(ep.id),
    number: String(ep.number).padStart(2, '0'),
    title: ep.title,
    subtitle: ep.subtitle,
    description: ep.description,
    duration: ep.duration,
    topic: ep.topic || '',
    concepts: ep.concepts || [],
    chapters: ep.chapters || [],
    logo: ep.logo,
  }))

  const filteredEpisodes = defaultEpisodes.filter(ep => {
    if (activeTopic !== 'All' && ep.topic !== activeTopic) return false
    return true
  })

  const visibleEpisodes = showAll ? filteredEpisodes : filteredEpisodes.slice(0, 3)

  return (
    <section id="episodes" className="bg-primary py-16 md:py-20">
      <div className="max-w-container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-none">
            Seasons and Episodes of The You Interview
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            {subscribeCTA.description}
          </p>
        </div>

        {/* Controls: Filters + View Toggle */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8 md:gap-6">
          <div className="flex items-center gap-3">
            {/* Topic Filter */}
            <div className="flex items-center gap-2 md:gap-3">
              <span className="hidden md:inline text-white font-medium whitespace-nowrap">Filter By Topic:</span>
              <div className="relative">
                <select
                  value={activeTopic}
                  onChange={(e) => setActiveTopic(e.target.value)}
                  className="appearance-none w-auto bg-white/10 text-white pl-3 pr-8 py-2 md:pl-4 md:pr-10 md:py-2.5 rounded-lg border border-white/20 text-sm focus:outline-none focus:border-white cursor-pointer"
                >
                  {episodeTopics.map(topic => (
                    <option key={topic} value={topic} className="text-black bg-white">{topic}</option>
                  ))}
                </select>
                <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            {/* Location Filter */}
            <div className="flex items-center gap-2 md:gap-3">
              <span className="hidden md:inline text-white font-medium whitespace-nowrap">Filter By Location:</span>
              <div className="relative">
                <select
                  value={activeLocation}
                  onChange={(e) => setActiveLocation(e.target.value)}
                  className="appearance-none w-auto bg-white/10 text-white pl-3 pr-8 py-2 md:pl-4 md:pr-10 md:py-2.5 rounded-lg border border-white/20 text-sm focus:outline-none focus:border-white cursor-pointer"
                >
                  {episodeLocations.map(loc => (
                    <option key={loc} value={loc} className="text-black bg-white">{loc}</option>
                  ))}
                </select>
                <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
              aria-label="Grid view"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
              aria-label="List view"
            >
              <LayoutList size={20} />
            </button>
          </div>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div className="relative">
            <div className="space-y-0">
            {visibleEpisodes.map((episode) => (
              <div key={episode.id} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-8 md:py-12 items-center">
                  {/* Episode Image */}
                  <div className="md:col-span-4">
                    <div className="w-full aspect-square bg-gray-700 rounded-2xl flex items-center justify-center overflow-hidden">
                      <img
                        src={episode.logo || '/cover-placeholder.jpg'}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Episode Content */}
                  <div className="md:col-span-8">
                    {episode.topic && (
                      <span className="text-xs px-3 py-1 bg-secondary/20 text-secondary rounded-full mb-3 inline-block">{episode.topic}</span>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                      {episode.title}
                    </h3>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed mb-4">
                      {episode.description}
                    </p>
                    {episode.concepts.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {episode.concepts.map((concept, i) => (
                          <span key={i} className="text-xs px-3 py-1 bg-white/5 rounded-full text-white/50">{concept}</span>
                        ))}
                      </div>
                    )}

                    {/* Play Button */}
                    <Link href={`/episode/${episode.id}`} className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity mb-3">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <Play size={20} fill="black" stroke="black" className="ml-0.5" />
                      </div>
                      <span className="text-lg font-semibold">Play Episode</span>
                    </Link>

                    {/* Episode Info */}
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Info size={16} />
                      <span>Episode {episode.number} • {episode.subtitle} • {episode.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Border with Episode Number */}
                <div className="relative pt-4">
                  <div className="border-b border-white/10" />
                  <span className="absolute right-0 bottom-0 text-lg font-bold text-white/40 pb-1">
                    {episode.number}
                  </span>
                </div>
              </div>
            ))}
            </div>
            {!showAll && filteredEpisodes.length > 3 && (
              <div className="relative mt-0">
                <div className="absolute bottom-full left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
                <div className="text-center pt-8">
                  <button
                    onClick={() => setShowAll(true)}
                    className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/90 transition-all"
                  >
                    Show All {filteredEpisodes.length} Episodes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Grid/Table View */}
        {viewMode === 'grid' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-white/10">
                  <th className="py-4 pr-4 text-sm font-bold text-white/40 uppercase tracking-wide">#</th>
                  <th className="py-4 pr-4 text-sm font-bold text-white/40 uppercase tracking-wide">Episode</th>
                  <th className="py-4 pr-4 text-sm font-bold text-white/40 uppercase tracking-wide hidden md:table-cell">Topic</th>
                  <th className="py-4 pr-4 text-sm font-bold text-white/40 uppercase tracking-wide hidden md:table-cell">Duration</th>
                  <th className="py-4 text-sm font-bold text-white/40 uppercase tracking-wide hidden lg:table-cell">Concepts</th>
                </tr>
              </thead>
              <tbody>
                {visibleEpisodes.map((episode) => (
                  <tr key={episode.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-5 pr-4 text-base font-bold text-white/30">{episode.number}</td>
                    <td className="py-5 pr-4">
                      <Link href={`/episode/${episode.id}`} className="hover:opacity-80">
                        <div className="text-base font-bold text-white">{episode.title}</div>
                        <div className="text-sm text-white/50 mt-1">{episode.subtitle}</div>
                      </Link>
                    </td>
                    <td className="py-5 pr-4 hidden md:table-cell">
                      {episode.topic && (
                        <span className="text-xs px-3 py-1 bg-secondary/20 text-secondary rounded">{episode.topic}</span>
                      )}
                    </td>
                    <td className="py-5 pr-4 text-sm text-white/50 hidden md:table-cell">{episode.duration}</td>
                    <td className="py-5 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {episode.concepts.map((c, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 bg-white/5 rounded-full text-white/40">{c}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!showAll && filteredEpisodes.length > 3 && (
              <div className="relative mt-0">
                <div className="absolute bottom-full left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
                <div className="text-center pt-8">
                  <button
                    onClick={() => setShowAll(true)}
                    className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/90 transition-all"
                  >
                    Show All {filteredEpisodes.length} Episodes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* View All Button */}
        {/* <div className="flex justify-center mt-12 md:mt-16">
          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-semibold text-base hover:bg-white/90 transition-all"
          >
            View All Episodes
            <ArrowRight size={20} />
          </Link>
        </div> */}
      </div>
    </section>
  )
}

export default LatestEpisodes
