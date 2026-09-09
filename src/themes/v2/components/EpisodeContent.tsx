'use client'

import React, { useState } from 'react'
import { Episode } from '@/lib/data'
import { TranscriptSegment } from '@/lib/rss'
import AudioPlayer from '@/components/AudioPlayer'
import { content, attorney, chaptersDescription, episodes as episodesData } from '@/data/siteData'

const TABS = ['Overview', 'Transcript', 'Key Takeaways'] as const
type Tab = (typeof TABS)[number]

interface EpisodeContentProps {
  episode?: Episode | null
  transcript?: TranscriptSegment[]
}

function EpisodeContent({ episode: propEpisode, transcript }: EpisodeContentProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [isTranscriptExpanded, setIsTranscriptExpanded] = useState(false)

  const episodeChapters = (propEpisode?.chapters?.length ? propEpisode.chapters : episodesData[0]?.chapters ?? []).filter(Boolean)
  const episodeConcepts = propEpisode?.concepts?.length ? propEpisode.concepts : episodesData[0]?.concepts ?? []

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Audio Player */}
        {propEpisode?.audioUrl ? (
          <div className="mb-12">
            <AudioPlayer audioUrl={propEpisode.audioUrl} title={propEpisode.title} duration={propEpisode.duration} />
          </div>
        ) : (
          <div className="relative w-full aspect-video bg-primary rounded-2xl overflow-hidden mb-12 flex items-center justify-center">
            {/* Decorative grid lines */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
            <span className="relative z-10 text-sm font-medium text-white/50">Episode audio coming soon</span>
          </div>
        )}

        {/* Tab bar */}
        <div className="flex items-center gap-8 md:gap-12 border-b border-white/10 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`pb-4 text-base md:text-lg font-bold transition-all relative ${
                activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/60'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-secondary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Main content + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content area */}
          <div className="lg:col-span-2">
            {activeTab === 'Overview' && (
              <OverviewTab />
            )}
            {activeTab === 'Transcript' && (
              <TranscriptTab
                transcript={transcript}
                isExpanded={isTranscriptExpanded}
                onToggleExpand={() => setIsTranscriptExpanded(!isTranscriptExpanded)}
              />
            )}
            {activeTab === 'Key Takeaways' && (
              <KeyTakeawaysTab />
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Episode Chapters */}
            {episodeChapters.length > 0 && (
              <div className="bg-primary rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  Episode Chapters
                </h3>
                <p className="text-sm text-white/40 mb-6">{chaptersDescription}</p>
                <ul className="space-y-3">
                  {episodeChapters.map((chapter, index) => (
                    <li key={index} className="flex items-start gap-3 group cursor-pointer">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary/15 text-secondary text-xs font-bold flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors leading-snug">
                        {chapter}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Episode Concepts */}
            {episodeConcepts.length > 0 && (
              <div className="bg-primary rounded-2xl p-6 min-w-0 overflow-hidden">
                <h3 className="font-heading text-lg font-bold text-white mb-4">
                  Concepts Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {episodeConcepts.map((concept, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-secondary border border-secondary/30 hover:bg-secondary/10 transition-colors cursor-default break-words max-w-full"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}

function OverviewTab() {
  return (
    <div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
        {content.articleTitle}
      </h2>

      <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-6 mb-10">
        {content.articleParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Featured Quote */}
      <FeaturedQuote showAttribution />

      {content.additionalParagraphs.length > 0 && (
        <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-6 mt-10">
          {content.additionalParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  )
}

interface TranscriptTabProps {
  transcript?: TranscriptSegment[]
  isExpanded: boolean
  onToggleExpand: () => void
}

// How many transcript segments show before the "Read More" expander.
const TRANSCRIPT_PREVIEW_COUNT = 6

function TranscriptTab({ transcript, isExpanded, onToggleExpand }: TranscriptTabProps) {
  const segments = transcript ?? []

  if (segments.length === 0) {
    return (
      <div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
          Episode Transcript
        </h2>
        <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-6 mb-8">
          <p>Transcript not yet available for this episode.</p>
        </div>
        <FeaturedQuote showAttribution={false} />
      </div>
    )
  }

  const preview = segments.slice(0, TRANSCRIPT_PREVIEW_COUNT)
  const rest = segments.slice(TRANSCRIPT_PREVIEW_COUNT)

  return (
    <div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
        Episode Transcript
      </h2>

      <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-6 mb-8">
        {preview.map((segment, index) => (
          <p key={index}>
            {segment.timestamp && (
              <span className="text-secondary font-semibold">[{segment.timestamp}]</span>
            )}{' '}
            {segment.speaker && <span className="font-semibold text-white">{segment.speaker}: </span>}
            {segment.text}
          </p>
        ))}
      </div>

      {/* Featured Quote */}
      <FeaturedQuote showAttribution={false} />

      {/* Expandable section */}
      {rest.length > 0 && (
        <>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? 'max-h-[100000px] opacity-100 mt-8' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-6">
              {rest.map((segment, index) => (
                <p key={index}>
                  {segment.timestamp && (
                    <span className="text-secondary font-semibold">[{segment.timestamp}]</span>
                  )}{' '}
                  {segment.speaker && <span className="font-semibold text-white">{segment.speaker}: </span>}
                  {segment.text}
                </p>
              ))}
            </div>
          </div>

          <button
            onClick={onToggleExpand}
            className="mt-6 text-base font-bold text-secondary hover:text-secondary/80 transition-colors flex items-center gap-2"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

function KeyTakeawaysTab() {
  return (
    <div>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
        Key Takeaways
      </h2>

      <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-6 mb-8">
        <p>
          In this episode with {attorney.name}, we cover the important aspects of
          personal injury law and what clients should know when seeking representation.
        </p>
      </div>

      <h3 className="font-heading text-2xl font-bold text-white mb-6">
        What You&apos;ll Learn
      </h3>

      <ul className="space-y-4 mb-10">
        {[
          'The importance of specialization in personal injury law',
          'How to choose the right attorney for your case',
          'What to expect during the legal process',
          'How insurance companies approach claims',
          'The value of client-centric representation',
        ].map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-base md:text-lg text-white/70">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/15 text-secondary text-xs font-bold flex items-center justify-center mt-0.5">
              {index + 1}
            </span>
            {item}
          </li>
        ))}
      </ul>

      {/* Featured Quote */}
      <FeaturedQuote showAttribution />
    </div>
  )
}

interface FeaturedQuoteProps {
  showAttribution: boolean
}

function FeaturedQuote({ showAttribution }: FeaturedQuoteProps) {
  return (
    <div className="bg-primary rounded-2xl p-8 md:p-10 relative border-l-4 border-secondary">
      <div className="text-secondary/30 text-[80px] md:text-[100px] font-heading leading-[0.7] -mb-4 select-none">
        &ldquo;
      </div>
      <p className="text-lg md:text-xl text-white leading-relaxed">
        {content.featuredQuote}
      </p>
      {showAttribution && (
        <p className="text-white/50 mt-4 text-sm">
          &mdash; {attorney.name}, {attorney.firm}
        </p>
      )}
    </div>
  )
}

export default EpisodeContent
