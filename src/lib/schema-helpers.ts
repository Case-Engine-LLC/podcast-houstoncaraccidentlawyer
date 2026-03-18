import {
  siteConfig,
  attorney,
  contact,
  episode,
  stats,
  footer,
  faqGroups,
  podcastTeam,
} from '@/data/siteData'

/** Canonical URL where this podcast site is deployed */
export const PODCAST_SITE_URL = siteConfig.podcastUrl

/** The law firm's website (used for sameAs / external references) */
export const FIRM_SITE_URL = contact.website

/**
 * Truncate text to the last complete sentence within maxLen characters.
 */
export function truncateToSentence(text: string, maxLen = 200): string {
  if (text.length <= maxLen) return text
  const truncated = text.slice(0, maxLen)
  const lastPeriod = truncated.lastIndexOf('.')
  return lastPeriod > 50 ? truncated.slice(0, lastPeriod + 1) : truncated + '...'
}

/**
 * Convert duration string (HH:MM:SS or MM:SS) to ISO 8601 duration.
 * e.g. "01:06:33" -> "PT1H6M33S", "5:30" -> "PT5M30S"
 */
export function formatDurationISO8601(duration: string): string {
  const parts = duration.split(':').map(Number)
  if (parts.length === 3) {
    const [h, m, s] = parts
    let result = 'PT'
    if (h > 0) result += `${h}H`
    if (m > 0) result += `${m}M`
    if (s > 0) result += `${s}S`
    return result || 'PT0S'
  }
  if (parts.length === 2) {
    const [m, s] = parts
    let result = 'PT'
    if (m > 0) result += `${m}M`
    if (s > 0) result += `${s}S`
    return result || 'PT0S'
  }
  return `PT${duration}S`
}

/**
 * Rich Organization / LegalService entity with all available data.
 */
export function generateOrganizationEntity() {
  return {
    '@type': ['LegalService', 'Organization'],
    '@id': `${PODCAST_SITE_URL}/#org`,
    'name': 'MVP Accident Attorneys',
    'legalName': 'Sachs Law, APC',
    'url': FIRM_SITE_URL,
    'telephone': '+1-833-687-9467',
    'email': contact.email,
    'foundingDate': '2017-08-01',
    'logo': {
      '@type': 'ImageObject',
      '@id': `${PODCAST_SITE_URL}/#logo`,
      'url': `${PODCAST_SITE_URL}/logo.svg`,
      'contentUrl': `${PODCAST_SITE_URL}/logo.svg`,
    },
    'image': `${PODCAST_SITE_URL}/logo.svg`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '4 Park Plaza, Suite 850',
      'addressLocality': 'Irvine',
      'addressRegion': 'CA',
      'postalCode': '92614',
      'addressCountry': 'US',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 33.6846,
      'longitude': -117.8265,
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': String(stats.rating),
      'ratingCount': String(stats.reviewCount),
      'bestRating': '5',
      'worstRating': '1',
    },
    'description': `${attorney.firm} was founded by Brett Sachs to fight insurance companies worth $900 billion annually on behalf of California accident victims.`,
    'founder': {
      '@type': 'Person',
      'name': attorney.name,
    },
    'areaServed': [
      { '@type': 'State', 'name': 'California' },
      { '@type': 'Country', 'name': 'United States' },
    ],
    'knowsAbout': [
      'Personal Injury Law',
      'Car Accident Claims',
      'Wrongful Death',
      'Premises Liability',
      'Insurance Negotiations',
    ],
    'sameAs': [
      FIRM_SITE_URL,
      ...Object.values(footer.socialLinks).filter(Boolean),
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+1-833-687-9467',
      'contactType': 'customer service',
      'availableLanguage': ['English', 'Spanish'],
    },
    'potentialAction': {
      '@type': 'CommunicateAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${PODCAST_SITE_URL}/#form`,
        'actionPlatform': 'https://schema.org/DesktopWebPlatform',
      },
      'name': 'Free Consultation',
    },
  }
}

/**
 * FAQPage entity built from all faqGroups in siteData.
 */
export function generateFAQPageEntity(pageUrl: string) {
  const allQuestions = faqGroups.flatMap(group =>
    group.questions.map(q => ({
      '@type': 'Question' as const,
      'name': q.question,
      'acceptedAnswer': {
        '@type': 'Answer' as const,
        'text': q.answer,
      },
    }))
  )

  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    'mainEntity': allQuestions,
  }
}

/**
 * BreadcrumbList entity. Last item should omit `item` per spec.
 */
export function generateBreadcrumbList(
  items: Array<{ name: string; item?: string }>,
  pageUrl: string,
) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    'itemListElement': items.map((entry, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': entry.name,
      ...(entry.item ? { 'item': entry.item } : {}),
    })),
  }
}

/**
 * PodcastSeries entity (reusable across all pages).
 */
export function generatePodcastSeriesEntity() {
  const host = podcastTeam[0]
  return {
    '@type': 'PodcastSeries',
    '@id': `${PODCAST_SITE_URL}/#podcast`,
    'name': siteConfig.podcastName,
    'description': episode.description,
    'url': PODCAST_SITE_URL,
    'inLanguage': 'en',
    'genre': ['Law', 'Personal Injury', 'Legal Education'],
    'productionCompany': { '@id': `${PODCAST_SITE_URL}/#org` },
    ...(host ? { 'host': { '@type': 'Person', 'name': host.name } } : {}),
    ...(siteConfig.rssFeedUrl ? { 'webFeed': siteConfig.rssFeedUrl } : {}),
  }
}

/**
 * Full homepage schema @graph — shared across V1, V2, V3.
 * @param pagePath Optional path suffix for theme variants (e.g. "/v2")
 */
export function generateHomeSchema(pagePath = '') {
  const pageUrl = pagePath
    ? `${PODCAST_SITE_URL}${pagePath}`
    : PODCAST_SITE_URL

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${PODCAST_SITE_URL}/#website`,
        'url': PODCAST_SITE_URL,
        'name': siteConfig.podcastName,
        'inLanguage': 'en',
        'publisher': { '@id': `${PODCAST_SITE_URL}/#org` },
      },
      generateOrganizationEntity(),
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        'url': pageUrl,
        'name': siteConfig.podcastName,
        'headline': siteConfig.podcastName,
        'description': episode.description,
        'inLanguage': 'en',
        'isPartOf': { '@id': `${PODCAST_SITE_URL}/#website` },
        'breadcrumb': { '@id': `${pageUrl}#breadcrumb` },
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['header h1', '.hero-description'],
        },
      },
      generatePodcastSeriesEntity(),
      generateBreadcrumbList(
        [{ name: 'Home' }],
        pageUrl,
      ),
      generateFAQPageEntity(pageUrl),
    ],
  }
}
