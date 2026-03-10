'use client'

import React from 'react'
import Header from '../components/Header'
import EpisodeHero from '../components/EpisodeHero'
import EpisodeContent from '../components/EpisodeContent'
import OtherEpisodes from '../components/OtherEpisodes'
import Footer from '../components/Footer'
import type { Episode } from '@/lib/data'
import type { TranscriptSegment } from '@/lib/rss'

interface V3EpisodePageProps {
  episodeId: string
  episode?: Episode | null
  allEpisodes?: Episode[]
  transcript?: TranscriptSegment[]
}

const V3EpisodePage = ({ episodeId, episode, allEpisodes, transcript }: V3EpisodePageProps) => {
  return (
    <div className="bg-[#050505] text-[#e2e8f0] min-h-screen overflow-x-hidden selection:bg-amber-500 selection:text-black">
      <Header />

      <main>
        <EpisodeHero episodeId={episodeId} episode={episode} />
        <EpisodeContent episodeId={episodeId} episode={episode} transcript={transcript} />
        <OtherEpisodes currentEpisodeId={episodeId} episodes={allEpisodes} />
      </main>

      <Footer />
    </div>
  )
}

export default V3EpisodePage
