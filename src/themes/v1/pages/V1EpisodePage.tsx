import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EpisodeHero from '../components/EpisodeHero'
import EpisodeContent from '../components/EpisodeContent'
import OtherEpisodes from '../components/OtherEpisodes'
import FAQ from '../components/FAQ'
import { siteConfig, attorney, contact, episode } from '@/data/siteData'
import type { Episode } from '@/lib/data'
import type { TranscriptSegment } from '@/lib/rss'

const SITE_URL = contact.website

export function generateEpisodeSchema(episodeId: string) {
  const episodeUrl = `${SITE_URL}/episode/${episodeId}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${episodeUrl}#webpage`,
        'url': episodeUrl,
        'name': `${episode.title} | ${siteConfig.podcastName}`,
        'headline': episode.title,
        'description': episode.description,
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
        'name': episode.title,
        'description': episode.description,
        'url': episodeUrl,
        'episodeNumber': episode.number,
        'duration': `PT${episode.duration.replace(':', 'H').replace(':', 'M')}S`,
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
  const schema = generateEpisodeSchema(episodeId)

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
