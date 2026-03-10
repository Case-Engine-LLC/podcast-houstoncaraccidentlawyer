'use client'

import React from 'react'
import Header from './Header'
import Hero from './Hero'
import TrustBadges from './TrustBadges'
import StatsBanner from './StatsBanner'
import About from './About'
import PodcastTeam from './PodcastTeam'
import LatestEpisodes from './LatestEpisodes'
import PodcastSubscribeCTA from './PodcastSubscribeCTA'
import Testimonials from './Testimonials'
import FAQ from './FAQ'
import TopicalEntryGrid from './TopicalEntryGrid'
import Footer from './Footer'

const HomePodcast = () => {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <Header />

      <main>
        <Hero />
        <TrustBadges />
        <StatsBanner />
        <About />
        <PodcastTeam />
        <LatestEpisodes />
        <Testimonials />
        <PodcastSubscribeCTA />
        <FAQ />
        <TopicalEntryGrid />
      </main>

      <Footer />
    </div>
  )
}

export default HomePodcast
