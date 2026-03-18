import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EpisodeHero from '../components/EpisodeHero'
import EpisodeContent from '../components/EpisodeContent'
import OtherEpisodes from '../components/OtherEpisodes'
import FAQ from '../components/FAQ'
import { siteConfig, episode as staticEpisode, podcastTeam } from '@/data/siteData'
import type { Episode } from '@/lib/data'
import type { TranscriptSegment } from '@/lib/rss'
import {
  PODCAST_SITE_URL,
  generateOrganizationEntity,
  generatePodcastSeriesEntity,
  generateBreadcrumbList,
  generateFAQPageEntity,
  truncateToSentence,
  formatDurationISO8601,
} from '@/lib/schema-helpers'

export function generateEpisodeSchema(episodeId: string, rssEp?: Episode | null) {
  const ep = rssEp ?? staticEpisode
  const episodeUrl = `${PODCAST_SITE_URL}/episode/${episodeId}`
  const host = podcastTeam[0]

  const title = ep.title
  const description = typeof ep.description === 'string' ? ep.description : ''
  const duration = ep.duration
  const number = ('number' in ep ? ep.number : undefined) ?? ('id' in ep ? (ep as Episode).id : 1)

  const datePublished = rssEp?.date
    ? (() => {
        // RSS dates come as "MM.DD.YY" — convert to ISO
        const parts = rssEp.date.split('.')
        if (parts.length === 3) {
          const [mm, dd, yy] = parts
          return `20${yy}-${mm}-${dd}`
        }
        return rssEp.date
      })()
    : undefined

  const episodeEntity: Record<string, unknown> = {
    '@type': 'PodcastEpisode',
    '@id': `${episodeUrl}#episode`,
    'name': title,
    'description': truncateToSentence(description),
    'url': episodeUrl,
    'episodeNumber': number,
    'duration': formatDurationISO8601(duration),
    'inLanguage': 'en',
    'partOfSeries': { '@id': `${PODCAST_SITE_URL}/#podcast` },
    'productionCompany': { '@id': `${PODCAST_SITE_URL}/#org` },
  }

  if (datePublished) {
    episodeEntity['datePublished'] = datePublished
  }

  if (host) {
    episodeEntity['author'] = { '@type': 'Person', 'name': host.name }
  }

  if (rssEp && 'concepts' in rssEp && rssEp.concepts?.length > 0) {
    episodeEntity['keywords'] = rssEp.concepts.join(', ')
  }

  if (rssEp && 'audioUrl' in rssEp && rssEp.audioUrl) {
    episodeEntity['associatedMedia'] = {
      '@type': 'MediaObject',
      'contentUrl': rssEp.audioUrl,
      'encodingFormat': rssEp.audioType || 'audio/mpeg',
      'name': title,
    }
  }

  if (rssEp?.logo) {
    episodeEntity['image'] = {
      '@type': 'ImageObject',
      'url': rssEp.logo.startsWith('http')
        ? rssEp.logo
        : `${PODCAST_SITE_URL}${rssEp.logo}`,
    }
  }

  if (rssEp && 'transcriptUrl' in rssEp && rssEp.transcriptUrl) {
    episodeEntity['transcript'] = rssEp.transcriptUrl
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${episodeUrl}#webpage`,
        'url': episodeUrl,
        'name': `${title} | ${siteConfig.podcastName}`,
        'headline': title,
        'description': truncateToSentence(description),
        'inLanguage': 'en',
        'isPartOf': { '@id': `${PODCAST_SITE_URL}/#website` },
        'breadcrumb': { '@id': `${episodeUrl}#breadcrumb` },
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['h1', '.episode-description'],
        },
      },
      episodeEntity,
      generatePodcastSeriesEntity(),
      generateOrganizationEntity(),
      generateBreadcrumbList(
        [
          { name: 'Home', item: `${PODCAST_SITE_URL}/` },
          { name: 'Episodes', item: `${PODCAST_SITE_URL}/#episodes` },
          { name: title },
        ],
        episodeUrl,
      ),
      generateFAQPageEntity(episodeUrl),
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

      <Footer episodes={allEpisodes} />
    </div>
  )
}

export default V1EpisodePage
