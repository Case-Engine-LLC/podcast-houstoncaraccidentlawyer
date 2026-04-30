import React from 'react'
import {
  about,
  attorney,
  authorProfiles,
  compliance,
  contact,
  episode,
  episodes,
  faqGroups,
  footer,
  siteConfig,
  stats,
} from '@/data/siteData'

const SchemaJsonLd = () => {
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
    webFeed: platformLinks.apple,
  }

  type EpisodeLike = {
    number?: number
    title: string
    description: string
    date: string
    duration: string
    audioUrl?: string
  }
  const allEpisodes: EpisodeLike[] =
    episodes && episodes.length > 0 ? (episodes as unknown as EpisodeLike[]) : [episode as EpisodeLike]
  const podcastEpisodes = allEpisodes.map((ep, idx) => ({
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    '@id': `${podcastUrl}/#episode-${ep.number || idx + 1}`,
    episodeNumber: ep.number,
    name: ep.title,
    description: ep.description,
    datePublished: ep.date,
    timeRequired: ep.duration,
    url: `${podcastUrl}/#episodes`,
    partOfSeries: { '@id': `${podcastUrl}/#podcast` },
    associatedMedia: ep.audioUrl
      ? {
          '@type': 'MediaObject',
          contentUrl: ep.audioUrl,
          encodingFormat: 'audio/mpeg',
        }
      : undefined,
  }))

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
      ? {
          '@type': 'PostalAddress',
          streetAddress: contact.address,
          addressRegion: compliance.jurisdiction,
          addressCountry: 'US',
        }
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
