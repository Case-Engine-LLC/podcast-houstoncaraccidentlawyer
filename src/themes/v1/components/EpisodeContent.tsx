'use client'

import React, { useState } from 'react'
import { Play } from 'lucide-react'
import { content, attorney } from '@/data/siteData'
import { episodeTranscript as staticTranscript } from '@/data/transcript'
import type { Episode } from '@/lib/data'
import type { TranscriptSegment } from '@/lib/rss'
import AudioPlayer from '@/components/AudioPlayer'

interface EpisodeContentProps {
  episode?: Episode | null
  transcript?: TranscriptSegment[]
}

const EpisodeContent = ({ episode, transcript }: EpisodeContentProps) => {
  const episodeTranscript = transcript && transcript.length > 0 ? transcript : staticTranscript
  const [activeTab, setActiveTab] = useState('Overview')
  const [isExpanded, setIsExpanded] = useState(false)

  const tabs = ['Overview', 'Transcript', 'Key Takeaways']

  return (
    <section id="episode-content" className="py-16 md:py-20 bg-white">
      <div className="w-[90%] mx-auto bg-primary rounded-[30px] py-12 md:py-16">
        <div className="max-w-container mx-auto px-6 md:px-12">
          {/* Audio Player */}
          {episode?.audioUrl ? (
            <div className="mb-12">
              <AudioPlayer
                audioUrl={episode.audioUrl}
                duration={episode.duration}
                title={episode.title}
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video bg-[#3a3a3a] rounded-3xl overflow-hidden mb-12 flex items-center justify-center group cursor-pointer">
              <div className="relative z-10 w-20 h-20 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={32} className="text-white fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex items-center gap-8 md:gap-12 border-b border-white/10 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`pb-4 text-base md:text-lg font-bold transition-all relative ${
                  activeTab === tab ? 'text-white' : 'text-white/40'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="max-w-5xl">
            {/* Overview Tab */}
            {activeTab === 'Overview' && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {content.articleTitle}
                </h2>

                <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-6 mb-8">
                  {content.articleParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="bg-[#2a2a3e] rounded-3xl p-8 md:p-12 mb-8 relative">
                  <div className="text-white/20 text-[80px] md:text-[100px] font-bold leading-[0.7] -mb-2">"</div>
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    {content.featuredQuote}
                  </p>
                  <p className="text-white/50 mt-4">— {attorney.name}</p>
                </div>

                {content.additionalParagraphs.length > 0 && (
                  <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-6 mb-8">
                    {content.additionalParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Transcript Tab */}
            {activeTab === 'Transcript' && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Episode Transcript
                </h2>

                <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-6 mb-8">
                  {episodeTranscript.slice(0, isExpanded ? episodeTranscript.length : 8).map((segment, index) => (
                    <p key={index}>
                      <span className="text-white font-semibold">[{segment.timestamp}]</span>{' '}
                      <span className="text-secondary font-semibold">{segment.speaker}:</span>{' '}
                      {segment.text}
                    </p>
                  ))}
                </div>

                {episodeTranscript.length > 8 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-base md:text-lg font-bold text-white hover:text-white/80 transition-colors"
                  >
                    {isExpanded ? 'Show Less' : `Read Full Transcript (${episodeTranscript.length} segments)`}
                  </button>
                )}
              </>
            )}

            {/* Key Takeaways Tab */}
            {activeTab === 'Key Takeaways' && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Key Takeaways
                </h2>

                <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-6 mb-8">
                  <p>
                    In this episode with {attorney.name}, we cover the important aspects of personal injury law and what clients should know when seeking representation.
                  </p>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  What You'll Learn
                </h3>

                <div className="text-base md:text-lg leading-relaxed text-white/70 space-y-4 mb-8">
                  <p>• The importance of specialization in personal injury law</p>
                  <p>• How to choose the right attorney for your case</p>
                  <p>• What to expect during the legal process</p>
                  <p>• How insurance companies approach claims</p>
                  <p>• The value of client-centric representation</p>
                </div>

                <div className="bg-[#2a2a3e] rounded-3xl p-8 md:p-12 mb-8 relative">
                  <div className="text-white/20 text-[80px] md:text-[100px] font-bold leading-[0.7] -mb-2">"</div>
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    {content.featuredQuote}
                  </p>
                  <p className="text-white/50 mt-4">— {attorney.name}, {attorney.firm}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EpisodeContent
