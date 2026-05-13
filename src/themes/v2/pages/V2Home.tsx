'use client'

import React from 'react'
import { Episode } from '@/lib/data'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustBadges from '../components/TrustBadges'
import StatsBanner from '../components/StatsBanner'
import About from '../components/About'
import LatestEpisodes from '../components/LatestEpisodes'
import Testimonials from '../components/Testimonials'
import PodcastSubscribeCTA from '../components/PodcastSubscribeCTA'
import FAQ from '../components/FAQ'
import TopicalEntryGrid from '../components/TopicalEntryGrid'
import Footer from '../components/Footer'
import { trustBadges, stats } from '@/data/siteData'

interface V2HomeProps {
  episodes?: Episode[]
}

const V2Home = ({ episodes }: V2HomeProps) => {
  const hasTrustBadges = Array.isArray(trustBadges) && trustBadges.length > 0
  const hasStats = Boolean(
    stats &&
      (stats.rating ||
        stats.satisfactionRate ||
        stats.casesHandled)
  )
  const showTrustSection = hasTrustBadges || hasStats

  return (
    <div className="bg-[#f4f2ed] text-primary min-h-screen overflow-x-hidden selection:bg-secondary selection:text-white">
      <Header />

      <main>
        {/* Hero */}
        <Hero />

        {/* Trust Badges + Stats (white section) — only render when there's content */}
        {showTrustSection && (
          <section className="py-10 mt-10 bg-white border-y border-gray-100">
            {hasTrustBadges && <TrustBadges />}
            {hasStats && <StatsBanner />}
          </section>
        )}

        {/* About the Host */}
        <About />

        {/* Latest Episodes */}
        <LatestEpisodes episodes={episodes} />

        {/* Testimonials */}
        <Testimonials />

        {/* Subscribe CTA */}
        <PodcastSubscribeCTA />

        {/* FAQ + Legal Guides (side by side) */}
        <section id="resources" className="py-24 bg-[#f4f2ed]">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
            <FAQ />
            <TopicalEntryGrid />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default V2Home
