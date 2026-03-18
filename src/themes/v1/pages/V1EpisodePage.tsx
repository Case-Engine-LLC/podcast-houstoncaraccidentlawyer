import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EpisodeHero from '../components/EpisodeHero'
import EpisodeContent from '../components/EpisodeContent'
import OtherEpisodes from '../components/OtherEpisodes'
import FAQ from '../components/FAQ'
import { siteConfig, attorney, contact, episode as staticEpisode } from '@/data/siteData'
import type { Episode } from '@/lib/data'
import type { TranscriptSegment } from '@/lib/rss'

const SITE_URL = contact.website

/** Convert "MM:SS" or "HH:MM:SS" to ISO 8601 duration (e.g. "PT47M27S") */
function toIsoDuration(dur: string): string {
  const parts = dur.split(':').map(Number)
  if (parts.length === 3) return `PT${parts[0]}H${parts[1]}M${parts[2]}S`
  if (parts.length === 2) return `PT${parts[0]}M${parts[1]}S`
  return `PT${dur}S`
}

export function generateEpisodeSchema(episodeId: string, ep?: Episode | null) {
  const episodeUrl = `${SITE_URL}/episode/${episodeId}`
  const title = ep?.title || staticEpisode.title
  const description = ep?.description || staticEpisode.description
  const number = ep?.number || staticEpisode.number
  const duration = toIsoDuration(ep?.duration || staticEpisode.duration)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${episodeUrl}#webpage`,
        'url': episodeUrl,
        'name': `${title} | ${siteConfig.podcastName}`,
        'headline': title,
        'description': description,
        'inLanguage': 'en',
        'isPartOf': { '@id': `${SITE_URL}/#website` },
        'speakable': {
          '@type': 'SpeakableSpecification',
          'name': ['headline', 'description'],
        },
      },
      {
        '@type': 'PodcastEpisode',
        '@id': `${episodeUrl}#episode`,
        'name': title,
        'description': description,
        'url': episodeUrl,
        'episodeNumber': number,
        'duration': duration,
        ...(ep?.audioUrl ? { 'associatedMedia': { '@type': 'MediaObject', 'contentUrl': ep.audioUrl, 'encodingFormat': ep.audioType || 'audio/mpeg' } } : {}),
        'partOfSeries': { '@id': `${SITE_URL}/#podcast` },
        'productionCompany': { '@id': `${SITE_URL}/#org` },
        'speakable': {
          '@type': 'SpeakableSpecification',
          'name': ['name', 'description'],
        },
      },
      {
        '@type': 'PodcastSeries',
        '@id': `${SITE_URL}/#podcast`,
        'name': siteConfig.podcastName,
        'url': SITE_URL,
        'inLanguage': 'en',
      },
      {
        '@type': ['LegalService', 'Organization'],
        '@id': `${SITE_URL}/#org`,
        'name': attorney.firm,
        'url': contact.website,
        'telephone': contact.phone,
        'email': contact.email,
      },
    ],
  }
}

interface V1EpisodePageProps {
  episodeId: string
  episode?: Episode | null
  allEpisodes?: Episode[]
  transcript?: TranscriptSegment[]
}

const V1EpisodePage = ({ episodeId, episode: rssEpisode, allEpisodes, transcript }: V1EpisodePageProps) => {
  const schema = generateEpisodeSchema(episodeId, rssEpisode)

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header variant="light" />

      <main className="pt-[6rem]">
        <EpisodeHero episode={rssEpisode} />
        <EpisodeContent episode={rssEpisode} transcript={transcript} />
        <OtherEpisodes episodes={allEpisodes} />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}

export default V1EpisodePage
