'use client'

import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustBadges from '../components/TrustBadges'
import StatsBanner from '../components/StatsBanner'
import About from '../components/About'
import PodcastTeam from '../components/PodcastTeam'
import LatestEpisodes from '../components/LatestEpisodes'
import PodcastSubscribeCTA from '../components/PodcastSubscribeCTA'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import TopicalEntryGrid from '../components/TopicalEntryGrid'
import Footer from '../components/Footer'
import { siteConfig, attorney, contact, episode } from '@/data/siteData'
import type { Episode } from '@/lib/data'

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
      '@id': `${SITE_URL}/#webpage`,
      'url': SITE_URL,
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

interface V1HomeProps {
  episodes?: Episode[]
}

const V1Home = ({ episodes }: V1HomeProps) => {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Header />

      <main>
        <Hero />
        <TrustBadges />
        <StatsBanner />
        <About />
        <PodcastTeam />
        <LatestEpisodes episodes={episodes} />
        <Testimonials />
        <PodcastSubscribeCTA />
        <FAQ />
        <TopicalEntryGrid />
      </main>

      <Footer />
    </div>
  )
}

export default V1Home
