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
import ContactSection from '../components/ContactSection'
import { generateHomeSchema } from '@/lib/schema-helpers'
import type { Episode } from '@/lib/data'

const homeSchema = generateHomeSchema()

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
        <Hero latestEpisode={episodes?.[0]} />
        <TrustBadges />
        <StatsBanner />
        <About />
        <PodcastTeam />
        <LatestEpisodes episodes={episodes} />
        <Testimonials />
        <PodcastSubscribeCTA />
        <FAQ />
        <TopicalEntryGrid />
        <ContactSection />
      </main>

      <Footer episodes={episodes} />
    </div>
  )
}

export default V1Home
