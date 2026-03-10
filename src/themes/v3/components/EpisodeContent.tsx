'use client'

import React, { useState } from 'react'
import { content, attorney, episode as staticEpisodeData, chapters, chaptersDescription, episodes as episodesData } from '@/data/siteData'
import type { Episode } from '@/lib/data'
import type { TranscriptSegment } from '@/lib/rss'
import AudioPlayer from '@/components/AudioPlayer'

interface EpisodeContentProps {
  episodeId: string
  episode?: Episode | null
  transcript?: TranscriptSegment[]
}

const EpisodeContent = ({ episodeId, episode: propEpisode, transcript }: EpisodeContentProps) => {
  const [activeTab, setActiveTab] = useState('overview')

  const staticEp = episodesData.find((e) => e.id === Number(episodeId))
  const ep = propEpisode ?? staticEp

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'transcript', label: 'Transcript' },
    { id: 'takeaways', label: 'Key Takeaways' },
  ]

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Audio Player / Video Placeholder */}
            {propEpisode?.audioUrl ? (
              <div className="mb-10">
                <AudioPlayer audioUrl={propEpisode.audioUrl} title={propEpisode.title} duration={propEpisode.duration} />
              </div>
            ) : (
              <div className="aspect-video bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center mb-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                <button className="relative z-10 w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:bg-amber-400 transition-colors shadow-2xl">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 mb-8 bg-zinc-900 p-1 rounded-xl border border-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white'
                      : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="font-heading text-2xl text-white">{content.articleTitle}</h2>
                {content.articleParagraphs.map((p, i) => (
                  <p key={i} className="text-slate-400 leading-relaxed">{p}</p>
                ))}
                {content.featuredQuote && (
                  <blockquote className="border-l-4 border-amber-500 pl-6 py-4 my-8 bg-white/[0.02] rounded-r-xl">
                    <p className="text-white italic font-serif text-lg leading-relaxed">
                      &ldquo;{content.featuredQuote}&rdquo;
                    </p>
                    <cite className="text-amber-500 text-sm mt-2 block not-italic">
                      &mdash; {attorney.name}, {attorney.firm}
                    </cite>
                  </blockquote>
                )}
              </div>
            )}

            {activeTab === 'transcript' && (
              <div className="bg-zinc-900 rounded-2xl p-8 border border-white/5">
                {transcript && transcript.length > 0 ? (
                  <div className="space-y-4">
                    {transcript.map((seg, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-xs text-amber-500 font-mono shrink-0 mt-1">{seg.timestamp}</span>
                        <div>
                          {seg.speaker && (
                            <span className="text-white font-medium text-sm">{seg.speaker}: </span>
                          )}
                          <span className="text-slate-400 text-sm">{seg.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-center">
                    Full transcript for Episode {episodeId} will be available soon.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'takeaways' && (
              <div className="space-y-4">
                {ep?.concepts?.map((concept, i) => (
                  <div key={i} className="flex items-start gap-4 bg-zinc-900 p-6 rounded-xl border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                      <span className="text-amber-500 font-bold text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{concept}</h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Chapters */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-bold mb-2">Chapters</h3>
              <p className="text-xs text-slate-500 mb-6">{chaptersDescription}</p>
              <div className="space-y-3">
                {chapters.map((ch) => (
                  <button
                    key={ch.number}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      ch.active ? 'bg-amber-500/10 border border-amber-500/20' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className={`text-xs font-mono mt-0.5 ${ch.active ? 'text-amber-500' : 'text-slate-500'}`}>
                      {String(ch.number).padStart(2, '0')}
                    </span>
                    <span className={`text-sm ${ch.active ? 'text-amber-400 font-medium' : 'text-slate-400'}`}>
                      {ch.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* About the Attorney */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-bold mb-4">Featured Attorney</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-zinc-800 overflow-hidden">
                  <img src={attorney.photo} alt={attorney.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-medium">{attorney.name}</p>
                  <p className="text-amber-500 text-xs">{attorney.firm}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{attorney.title}</p>
            </div>

            {/* Concepts */}
            {ep?.concepts && (
              <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5">
                <h3 className="text-white font-bold mb-4">Key Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {ep.concepts.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300 border border-white/5">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EpisodeContent
