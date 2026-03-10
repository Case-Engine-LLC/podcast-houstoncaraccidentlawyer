'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Episode } from '@/lib/data'
import { episode as staticEpisode, siteConfig, episodes as episodesData } from '@/data/siteData'

interface EpisodeHeroProps {
  episode?: Episode | null
}

function EpisodeHero({ episode: propEpisode }: EpisodeHeroProps) {
  const ep = propEpisode ?? staticEpisode
  const coverImage = propEpisode?.logo ?? episodesData[0]?.logo

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 bg-[#f4f2ed]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#091830]/50 mb-10">
          <Link href="/v2" className="hover:text-[#10284B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/v2#episodes" className="hover:text-[#10284B] transition-colors">
            Episodes
          </Link>
          <span>/</span>
          <span className="text-[#10284B] font-medium">Episode {ep.number}</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Episode details */}
          <div className="space-y-6">
            {/* Episode badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF9E00]/15 text-[#10284B] text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF9E00]" />
              Episode {ep.number}
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-[#10284B]">
              {ep.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-[#091830]/60 leading-relaxed max-w-xl">
              {ep.description}
            </p>

            {/* Date + Duration */}
            <div className="flex items-center gap-6 text-sm text-[#091830]/50">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{ep.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{ep.duration}</span>
              </div>
            </div>

            {/* Platform buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={siteConfig.platformLinks.spotify}
                className="flex items-center gap-3 bg-[#091830] text-white px-6 py-3 rounded-xl hover:bg-black transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase opacity-70 leading-none">Listen on</div>
                  <div className="font-bold leading-none">Spotify</div>
                </div>
              </a>
              <a
                href={siteConfig.platformLinks.apple}
                className="flex items-center gap-3 bg-white border border-gray-200 text-[#091830] px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.77.74 3.55 1.91-2.9 1.67-2.43 5.48.51 6.71-.57 1.69-1.44 3.25-2.65 4.41zM11.96 4.96c.64-1.09.43-2.32.41-2.56-1.09.11-2.36.78-2.95 1.81-.55.95-.36 2.22-.36 2.44 1.23.14 2.34-.69 2.9-1.69z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase opacity-70 leading-none">Listen on</div>
                  <div className="font-bold leading-none">Apple Podcasts</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Cover image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-[480px] mx-auto lg:ml-auto">
              {/* Decorative background element */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-[#10284B]/10 rounded-3xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#FF9E00]/20 rounded-full blur-2xl" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-[#10284B]">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt={ep.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/20">
                      <circle cx="45" cy="35" r="12" stroke="currentColor" strokeWidth="2" />
                      <path d="M15 105 L45 65 L75 90 L105 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-4 right-4 bg-[#091830]/80 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full">
                {ep.duration}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EpisodeHero
