'use client'

import React from 'react'
import Link from 'next/link'
import { Play, Volume2, ChevronRight } from 'lucide-react'
import { episode as defaultEpisode } from '@/data/siteData'

interface FeaturedEpisodePlayerProps {
  episodeNumber?: string
  title?: string
  description?: string
  duration?: string
  episodeLink?: string
  imageUrl?: string
}

const FeaturedEpisodePlayer = ({
  episodeNumber = String(defaultEpisode.number),
  title = defaultEpisode.title,
  description = defaultEpisode.description.replace(/\*\*/g, ''),
  duration = defaultEpisode.duration,
  episodeLink = `/episode/${defaultEpisode.number}`,
  imageUrl
}: FeaturedEpisodePlayerProps) => {
  return (
    <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Top: Image + Title + Link */}
        <div className="flex gap-4 mb-4 items-center">
          {/* Episode Image */}
          <div className="w-24 h-24 bg-gray-200 rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src={imageUrl || '/cover-placeholder.jpg'}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title and Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-black leading-tight mb-1">
              {title}
            </h3>
            <div className="text-xs text-gray-500">
              Episode {episodeNumber} • {duration}
            </div>
          </div>

          {/* Episode Page Arrow */}
          <Link
            href={episodeLink}
            className="text-black hover:opacity-70 transition-opacity shrink-0"
          >
            <ChevronRight size={28} />
          </Link>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Audio Player */}
        <div className="flex items-center gap-3">
          {/* Play Button */}
          <button className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0">
            <Play size={20} fill="white" className="text-white ml-0.5" />
          </button>

          {/* Progress Bar and Time */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden cursor-pointer group">
              <div className="h-full w-0 bg-black transition-all group-hover:bg-gray-800" />
            </div>
            <span className="text-xs text-gray-400">
              0:00 / {duration}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex gap-6">
        {/* Episode Image */}
        <div className="w-[12rem] h-[12rem] bg-gray-200 rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl || '/cover-placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Episode Content */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Top Section */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-black leading-tight pr-4">
                {title}
              </h3>
              <Link
                href={episodeLink}
                className="flex items-center gap-1 text-sm text-black hover:opacity-70 transition-opacity shrink-0"
              >
                Episode Page
                <ChevronRight size={16} />
              </Link>
            </div>

            <p className="text-sm md:text-base text-gray-600 mb-3 leading-relaxed">
              {description}
            </p>

            <div className="text-sm text-gray-500 mb-4">
              Episode {episodeNumber} • {duration}
            </div>
          </div>

          {/* Audio Player */}
          <div className="flex items-center gap-4">
            {/* Play Button */}
            <button className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0">
              <Play size={18} fill="white" className="text-white ml-0.5" />
            </button>

            {/* Progress Bar */}
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden cursor-pointer group">
              <div className="h-full w-0 bg-black transition-all group-hover:bg-gray-800" />
            </div>

            {/* Time Display */}
            <span className="text-xs text-gray-400 shrink-0 min-w-[3.5rem] text-right">
              00/00
            </span>

            {/* Volume Icon */}
            <button className="text-gray-600 hover:text-black transition-colors shrink-0">
              <Volume2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedEpisodePlayer
