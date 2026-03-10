import V2Home from '@/themes/v2/pages/V2Home'
import { getAllEpisodes } from '@/lib/data'
import { siteConfig, attorney, contact, episode } from '@/data/siteData'

export const revalidate = 3600

const SITE_URL = contact.website

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      'url': SITE_URL,
      'name': siteConfig.podcastName,
      'inLanguage': 'en',
      'publisher': { '@id': `${SITE_URL}/#org` },
    },
    {
      '@type': ['LegalService', 'Organization'],
      '@id': `${SITE_URL}/#org`,
      'name': attorney.firm,
      'url': contact.website,
      'telephone': contact.phone,
      'email': contact.email,
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/v2#webpage`,
      'url': `${SITE_URL}/v2`,
      'name': siteConfig.podcastName,
      'headline': siteConfig.podcastName,
      'description': episode.description,
      'inLanguage': 'en',
      'isPartOf': { '@id': `${SITE_URL}/#website` },
      'speakable': {
        '@type': 'SpeakableSpecification',
        'name': ['headline', 'description'],
      },
    },
    {
      '@type': 'PodcastSeries',
      '@id': `${SITE_URL}/#podcast`,
      'name': siteConfig.podcastName,
      'description': episode.description,
      'url': SITE_URL,
      'inLanguage': 'en',
      'genre': ['Law', 'Personal Injury', 'Legal Education'],
      'productionCompany': { '@id': `${SITE_URL}/#org` },
      'speakable': {
        '@type': 'SpeakableSpecification',
        'name': ['name', 'description'],
      },
    },
  ],
}

export default async function Page() {
  const episodes = await getAllEpisodes()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <V2Home episodes={episodes} />
    </>
  )
}
