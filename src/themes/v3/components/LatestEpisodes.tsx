'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { episodes as staticEpisodesData, episodeTopics, episodeLocations, siteConfig } from '@/data/siteData'
import { subscribeCTA } from '@/lib/site-compat'
import type { Episode } from '@/lib/data'

interface LatestEpisodesProps {
  episodes?: Episode[]
}

const LatestEpisodes = ({ episodes: propEpisodes }: LatestEpisodesProps) => {
  const episodesData = propEpisodes ?? staticEpisodesData
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')

  // Default to list on desktop, grid on mobile
  useEffect(() => {
    if (window.innerWidth >= 768) setViewMode('list')
  }, [])
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')

  const filteredEpisodes = episodesData.filter((ep) => {
    const topicMatch = selectedTopic === 'All' || ep.topic === selectedTopic
    const locationMatch = selectedLocation === 'All'
    return topicMatch && locationMatch
  })

  // Pad to 4 items for display
  const displayEpisodes = [...filteredEpisodes]
  while (displayEpisodes.length < 4) {
    displayEpisodes.push({
      id: -(displayEpisodes.length + 1),
      number: displayEpisodes.length + 1,
      title: 'Coming Soon',
      subtitle: '',
      description: 'New episode dropping soon. Subscribe to get notified.',
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
    <section id="episodes" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
          Seasons & Episodes
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">{subscribeCTA.description}</p>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-8 pb-4 border-b border-white/10">
        <div className="flex gap-4 w-full md:w-auto overflow-x-auto">
          <div className="relative">
            <label className="block text-xs text-slate-500 mb-1 ml-1 uppercase tracking-wider">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="appearance-none bg-[#111] text-white pl-4 pr-10 py-3 rounded-lg border border-white/10 focus:border-amber-500 focus:outline-none min-w-[160px]"
            >
              {episodeTopics.map((t) => (
                <option key={t} value={t}>{t === 'All' ? 'All Topics' : t}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 bottom-3.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs text-slate-500 mb-1 ml-1 uppercase tracking-wider">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="appearance-none bg-[#111] text-white pl-4 pr-10 py-3 rounded-lg border border-white/10 focus:border-amber-500 focus:outline-none min-w-[160px]"
            >
              {episodeLocations.map((l) => (
                <option key={l} value={l}>{l === 'All' ? 'All Locations' : l}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 bottom-3.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* View Toggle - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 bg-[#111] p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* List View - hidden on mobile */}
      {viewMode === 'list' && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-widest border-b border-white/5">
                <th className="py-4 px-4 font-normal">Details</th>
                <th className="py-4 px-4 font-normal">Topic</th>
                <th className="py-4 px-4 font-normal">Length</th>
                <th className="py-4 px-4 font-normal text-right">Listen</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {displayEpisodes.map((ep) => (
                <tr key={ep.id} className="group border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-zinc-800 rounded-lg flex-shrink-0 relative overflow-hidden group-hover:ring-2 ring-amber-500 transition-all">
                        {ep.logo ? (
                          <img src={ep.logo} alt={ep.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-amber-500 mb-1">Episode {ep.number}</div>
                        <h4 className="text-white font-serif text-lg group-hover:text-amber-400 transition-colors">
                          {ep.id > 0 ? (
                            <Link href={`/episode/${ep.id}`}>{ep.title}</Link>
                          ) : (
                            ep.title
                          )}
                        </h4>
                        <div className="text-slate-500 text-xs mt-1">{ep.subtitle || siteConfig.podcastName.split(' w.')[0]}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    {ep.topic && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-slate-300 border border-white/5">
                        {ep.topic}
                      </span>
                    )}
                  </td>
                  <td className="py-6 px-4 text-slate-400 font-mono">{ep.duration}</td>
                  <td className="py-6 px-4 text-right">
                    {ep.id > 0 ? (
                      <Link
                        href={`/episode/${ep.id}`}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors ml-auto"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </Link>
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-600 ml-auto">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View - always visible on mobile, toggled on desktop */}
      {(viewMode === 'grid' || true) && (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${viewMode === 'list' ? 'md:hidden' : ''}`}>
          {displayEpisodes.map((ep) => (
            <div
              key={ep.id}
              className="group bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-start gap-6 p-6">
                <div className="w-24 h-24 bg-zinc-800 rounded-xl flex-shrink-0 overflow-hidden">
                  {ep.logo ? (
                    <img src={ep.logo} alt={ep.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                      Episode {ep.number}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{ep.duration}</span>
                  </div>
                  <h4 className="text-xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {ep.id > 0 ? (
                      <Link href={`/episode/${ep.id}`}>{ep.title}</Link>
                    ) : (
                      ep.title
                    )}
                  </h4>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{ep.description}</p>
                  {ep.topic && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-slate-300 border border-white/5">
                      {ep.topic}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button className="px-8 py-3 bg-zinc-900 border border-zinc-700 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-colors text-white">
          View All Episodes
        </button>
      </div>
    </section>
  )
}

export default LatestEpisodes
