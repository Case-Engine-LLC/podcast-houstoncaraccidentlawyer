'use client'

import React from 'react'
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
import type { Episode } from '@/lib/data'

interface V3HomeProps {
  episodes?: Episode[]
}

const V3Home = ({ episodes }: V3HomeProps) => {
  return (
    <div className="bg-[#050505] text-[#e2e8f0] min-h-screen overflow-x-hidden selection:bg-amber-500 selection:text-black">
      <Header />

      <main>
        {/* Hero */}
        <Hero />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Stats */}
        <StatsBanner />

        {/* About the Host */}
        <About />

        {/* Latest Episodes */}
        <LatestEpisodes episodes={episodes} />

        {/* Testimonials */}
        <Testimonials />

        {/* Subscribe CTA */}
        <PodcastSubscribeCTA />

        {/* FAQ + Legal Guides (side by side) */}
        <section id="resources" className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <FAQ />
            <TopicalEntryGrid />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default V3Home
