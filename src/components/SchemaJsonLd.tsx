import React from 'react'
import {
  about,
  attorney,
  authorProfiles,
  compliance,
  contact,
  episode,
  faqGroups,
  footer,
  siteConfig,
  stats,
} from '@/data/siteData'
import { getAllEpisodes, type Episode } from '@/lib/data'

type SchemaEpisode = Pick<Episode, 'id' | 'number' | 'slug' | 'title' | 'description' | 'date' | 'duration' | 'audioUrl' | 'audioType'>

// schema.org `timeRequired` must be an ISO 8601 Duration. Feed/static values
// arrive as "36 min", "51:09", "01:20:59", seconds, or the placeholder "TBD";
// anything unparseable returns undefined so the key is dropped rather than
// emitting an invalid value.
function toIsoDuration(raw: unknown): string | undefined {
  if (raw === undefined || raw === null) return undefined
  const s = String(raw).trim()
  if (!s || /^tbd$/i.test(s)) return undefined
  if (/^\d+$/.test(s)) {
    const total = Number(s)
    return `PT${Math.floor(total / 60)}M${total % 60}S`
  }
  if (s.includes(':')) {
    const parts = s.split(':').map(Number)
    if (parts.length >= 2 && parts.every((n) => Number.isFinite(n))) {
      const [h, m, sec] = parts.length === 3 ? parts : [0, parts[0], parts[1]]
      return `PT${h ? `${h}H` : ''}${m}M${sec}S`
    }
  }
  const mins = s.match(/^(\d+)\s*min/i)
  if (mins) return `PT${mins[1]}M`
  const hrs = s.match(/^(\d+)\s*h(?:ou)?rs?$/i)
  if (hrs) return `PT${hrs[1]}H`
  return undefined
}

const SchemaJsonLd = async () => {
  const podcastUrl = siteConfig.podcastUrl?.replace(/\/$/, '') || ''
  const firmUrl = (contact.website || '').replace(/\/$/, '')
  const platformLinks = siteConfig.platformLinks || {}
  const sameAs = [platformLinks.spotify, platformLinks.apple]
    .filter((u): u is string => !!u && u !== '#')

  const podcastSeries = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    '@id': `${podcastUrl}/#podcast`,
    name: siteConfig.podcastName,
    url: podcastUrl,
    description: about.description,
    image: `${podcastUrl}/logo.svg`,
    inLanguage: 'en-US',
    author: { '@id': `${podcastUrl}/#host` },
    publisher: { '@id': `${podcastUrl}/#organization` },
    sameAs,
    webFeed: siteConfig.rssFeedUrl,
  }

  const allEpisodes = await getAllEpisodes()
  const schemaEpisodes: SchemaEpisode[] = allEpisodes.length > 0
    ? allEpisodes
    : [{ ...episode, id: episode.number }]
  const podcastEpisodes = schemaEpisodes.map((ep, idx) => {
    const slugPart = ep.slug || ep.id || ep.number || idx + 1
    return {
      '@context': 'https://schema.org',
      '@type': 'PodcastEpisode',
      '@id': `${podcastUrl}/#episode-${ep.number || idx + 1}`,
      episodeNumber: ep.number,
      name: ep.title,
      description: ep.description,
      datePublished: ep.date,
      timeRequired: toIsoDuration(ep.duration),
      url: `${podcastUrl}/episode/${slugPart}`,
      partOfSeries: { '@id': `${podcastUrl}/#podcast` },
      associatedMedia: ep.audioUrl
        ? {
            '@type': 'MediaObject',
            contentUrl: ep.audioUrl,
            encodingFormat: ep.audioType || 'audio/mpeg',
          }
        : undefined,
    }
  })

  const hostProfile = authorProfiles && Object.values(authorProfiles)[0]
  const hostSchema = hostProfile
    ? {
        '@context': 'https://schema.org',
        '@type': ['Person', 'Attorney'],
        '@id': `${podcastUrl}/#host`,
        name: hostProfile.name,
        jobTitle: hostProfile.title,
        description: hostProfile.bio?.[0] || attorney.bio?.[0],
        image: hostProfile.photo ? `${podcastUrl}${hostProfile.photo}` : undefined,
        url: firmUrl || podcastUrl,
        worksFor: { '@id': `${podcastUrl}/#organization` },
        alumniOf: (hostProfile.education || []).map((edu) => ({
          '@type': 'EducationalOrganization',
          name: edu.school,
        })),
        award: (hostProfile.awards || []).map((a) => a.name),
        knowsAbout: hostProfile.practiceAreas || [],
      }
    : null

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    '@id': `${podcastUrl}/#organization`,
    name: attorney.firm || compliance.firm,
    url: firmUrl,
    telephone: contact.phone,
    email: contact.email,
    image: `${podcastUrl}/logo.svg`,
    logo: `${podcastUrl}/logo.svg`,
    description: footer.description,
    address: contact.address
      ? (() => {
          const parts = contact.address.split(',').map(s => s.trim()).filter(Boolean)
          const addressLocality = parts[0] || undefined
          return {
            '@type': 'PostalAddress',
            ...(addressLocality ? { addressLocality } : {}),
            addressRegion: compliance.jurisdiction || parts[1] || undefined,
            addressCountry: 'US',
          }
        })()
      : undefined,
    aggregateRating: stats?.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: String(stats.rating),
          bestRating: '5',
          ratingCount: String(stats.reviewCount || 0),
          reviewCount: String(stats.reviewCount || 0),
        }
      : undefined,
    sameAs,
  }

  const faqMainEntities = (faqGroups || [])
    .flatMap((g) => g.questions || [])
    .map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    }))

  const faqSchema =
    faqMainEntities.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqMainEntities,
        }
      : null

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${podcastUrl}/#website`,
    url: podcastUrl,
    name: siteConfig.podcastName,
    description: about.description,
    publisher: { '@id': `${podcastUrl}/#organization` },
    about: { '@id': `${podcastUrl}/#podcast` },
  }

  const schemas = [
    podcastSeries,
    ...podcastEpisodes,
    hostSchema,
    orgSchema,
    websiteSchema,
    faqSchema,
  ].filter(Boolean)

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

export default SchemaJsonLd
