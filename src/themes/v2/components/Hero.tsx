'use client'

import React from 'react'
import Link from 'next/link'
import { siteConfig, episode, content, podcastTeam } from '@/data/siteData'

const Hero = () => {
  const host = podcastTeam[0]

  return (
    <header className="relative pt-32 pb-24 px-6 overflow-hidden bg-[#f4f2ed]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Column */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9E00]/20 text-[#10284B] text-xs font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#10284B] animate-pulse" />
            {siteConfig.tagline || 'New Episodes Weekly'}
          </div>

          <h1 className="font-heading text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] text-[#10284B]">
            {content.heroTitle}
          </h1>

          <p className="text-lg md:text-xl text-[#091830]/60 max-w-lg leading-relaxed">
            {content.heroDescription}
          </p>

          {/* Platform Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a href={siteConfig.platformLinks.spotify} className="flex items-center gap-3 bg-[#091830] text-white px-6 py-3 rounded-xl hover:bg-black transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              <div className="text-left">
                <div className="text-[10px] uppercase opacity-70 leading-none">Listen on</div>
                <div className="font-bold leading-none">Spotify</div>
              </div>
            </a>
            <a href={siteConfig.platformLinks.apple} className="flex items-center gap-3 bg-white border border-gray-200 text-[#091830] px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.77.74 3.55 1.91-2.9 1.67-2.43 5.48.51 6.71-.57 1.69-1.44 3.25-2.65 4.41zM11.96 4.96c.64-1.09.43-2.32.41-2.56-1.09.11-2.36.78-2.95 1.81-.55.95-.36 2.22-.36 2.44 1.23.14 2.34-.69 2.9-1.69z"/></svg>
              <div className="text-left">
                <div className="text-[10px] uppercase opacity-70 leading-none">Listen on</div>
                <div className="font-bold leading-none">Apple Podcasts</div>
              </div>
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className="relative h-[500px] lg:h-[600px] w-full">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-3/4 h-full bg-[#10284B] rounded-t-[160px] opacity-10" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#FF9E00]/20 rounded-full blur-2xl" />

          {/* Main Image */}
          <div className="absolute inset-0 rounded-t-[200px] overflow-hidden border-8 border-white shadow-2xl">
            <img
              src="/hero-placeholder.jpg"
              alt="Hero background"
              className="w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Episode Player Card */}
          <div className="absolute -bottom-12 -left-6 lg:left-12 bg-white p-6 rounded-2xl shadow-xl max-w-sm w-[90%] border-l-4 border-[#FF9E00]">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-[#FF9E00] uppercase tracking-wider">Latest Episode</span>
              <span className="text-xs text-gray-400">Episode {episode.number} • {episode.duration}</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-[#10284B] mb-2">{episode.title}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{episode.description}</p>

            <div className="flex items-center gap-4">
              <Link href={`/v2/episode/${episode.number}`} className="w-12 h-12 rounded-full bg-[#10284B] text-white flex items-center justify-center hover:bg-[#FF9E00] transition-colors shadow-lg">
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </Link>
              <div className="flex-1">
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-[#10284B]" />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                  <span>12:45</span>
                  <span>{episode.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
