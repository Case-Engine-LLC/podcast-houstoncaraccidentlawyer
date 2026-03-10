import React from 'react'
import { Episode } from '@/lib/data'
import { TranscriptSegment } from '@/lib/rss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EpisodeHero from '../components/EpisodeHero'
import EpisodeContent from '../components/EpisodeContent'
import OtherEpisodes from '../components/OtherEpisodes'

interface V2EpisodePageProps {
  episodeId: string
  episode?: Episode | null
  allEpisodes?: Episode[]
  transcript?: TranscriptSegment[]
}

function V2EpisodePage({ episodeId, episode, allEpisodes, transcript }: V2EpisodePageProps) {
  return (
    <div className="bg-[#f4f2ed] text-[#091830] min-h-screen overflow-x-hidden selection:bg-[#FF9E00] selection:text-white">
      <Header />

      <main>
        <EpisodeHero episode={episode} />
        <EpisodeContent episode={episode} transcript={transcript} />
        <OtherEpisodes episodes={allEpisodes} />
      </main>

      <Footer />
    </div>
  )
}

export default V2EpisodePage
