'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Episode } from '@/lib/data'
import { episodes as staticEpisodesData, episodeTopics, episodeLocations, siteConfig } from '@/data/siteData'
import { subscribeCTA } from '@/lib/site-compat'

interface LatestEpisodesProps {
  episodes?: Episode[]
}

const LatestEpisodes = ({ episodes: propEpisodes }: LatestEpisodesProps) => {
  const episodesData = propEpisodes ?? staticEpisodesData
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [topicFilter, setTopicFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All')

  const filteredEpisodes = episodesData.filter(ep => {
    if (topicFilter !== 'All' && ep.topic !== topicFilter) return false
    return true
  })

  return (
    <section id="episodes" className="py-24 px-6 bg-[#f4f2ed]">
      <div className="max-w-7xl mx-auto">
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-[#10284B] mb-6 leading-tight">
            Seasons and Episodes of {siteConfig.podcastName}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            {subscribeCTA.description}
          </p>
        </div>

        {/* Filter Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div className="flex flex-wrap items-center gap-6">
            {/* Topic Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#10284B] whitespace-nowrap">Filter By Topic:</span>
              <div className="relative">
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  className="appearance-none bg-white pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#10284B] cursor-pointer"
                >
                  {episodeTopics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>

            {/* Location Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#10284B] whitespace-nowrap">Filter by location:</span>
              <div className="relative">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="appearance-none bg-white pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#10284B] cursor-pointer"
                >
                  {episodeLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#10284B] text-white' : 'bg-white text-gray-400 hover:text-[#10284B]'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#10284B] text-white' : 'bg-white text-gray-400 hover:text-[#10284B]'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
            </button>
          </div>
        </div>

        {/* List View — Table Style */}
        {viewMode === 'list' && (
          <div>
            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 pb-4 border-b border-gray-300">
              <div className="col-span-1 text-sm font-bold text-[#10284B]">Cover</div>
              <div className="col-span-4 text-sm font-bold text-[#10284B]">Name</div>
              <div className="col-span-2 text-sm font-bold text-[#10284B]">Topic</div>
              <div className="col-span-1 text-sm font-bold text-[#10284B]">Length</div>
              <div className="col-span-4 text-sm font-bold text-[#10284B]">Mentioned Concepts</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200">
              {filteredEpisodes.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/v2/episode/${ep.id}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 items-center px-4 py-6 hover:bg-white/60 transition-colors rounded-lg"
                >
                  {/* Cover */}
                  <div className="col-span-1">
                    <div className="w-16 h-16 md:w-full md:aspect-square flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      {ep.logo ? (
                        <img src={ep.logo} alt={ep.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#d4d4d4] flex items-center justify-center">
                          <span className="text-xs text-gray-500">Ep {ep.number}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="col-span-4">
                    <h3 className="font-heading text-base font-bold text-[#10284B] group-hover:text-[#FF9E00] transition-colors leading-snug">
                      {ep.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">{ep.subtitle}</p>
                  </div>

                  {/* Topic */}
                  <div className="col-span-2">
                    {ep.topic && (
                      <span className="inline-block px-3 py-1 bg-[#10284B]/10 rounded-full text-xs font-semibold text-[#10284B]">
                        {ep.topic}
                      </span>
                    )}
                  </div>

                  {/* Length */}
                  <div className="col-span-1">
                    <span className="text-sm font-medium text-[#10284B]">{ep.duration}</span>
                  </div>

                  {/* Concepts */}
                  <div className="col-span-4">
                    <div className="flex flex-wrap gap-2">
                      {ep.concepts?.map((concept, i) => (
                        <span key={i} className="px-3 py-1 bg-[#10284B]/10 rounded-full text-xs font-medium text-[#10284B]">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Grid View — Full-width horizontal cards */}
        {viewMode === 'grid' && (
          <div className="space-y-6">
            {filteredEpisodes.map((ep) => (
              <div
                key={ep.id}
                className="group bg-[#10284B] rounded-2xl overflow-hidden flex flex-col md:flex-row"
              >
                {/* Cover Image */}
                <div className="relative w-full md:w-[340px] flex-shrink-0 aspect-square md:aspect-auto">
                  {ep.logo ? (
                    <img src={ep.logo} alt={ep.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#091830] flex items-center justify-center">
                      <span className="text-3xl font-heading text-white/30">Ep {ep.number}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                  {ep.topic && (
                    <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold text-[#FF9E00] border border-[#FF9E00]/40 mb-4">
                      {ep.topic}
                    </span>
                  )}

                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                    {ep.title}
                  </h3>

                  <p className="text-base text-white/60 leading-relaxed mb-6 max-w-2xl">
                    {ep.description}
                  </p>

                  {/* Concept Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {ep.concepts?.map((concept, i) => (
                      <span key={i} className="px-4 py-1.5 rounded-full text-xs font-medium text-white/70 border border-white/20">
                        {concept}
                      </span>
                    ))}
                  </div>

                  {/* Play Button */}
                  <Link
                    href={`/v2/episode/${ep.id}`}
                    className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity mb-4"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <span className="text-lg font-semibold">Play Episode</span>
                  </Link>

                  {/* Episode Meta */}
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>Episode {String(ep.number).padStart(2, '0')} &bull; {ep.subtitle} &bull; {ep.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestEpisodes
