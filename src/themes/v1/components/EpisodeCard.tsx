'use client'

import React from 'react'
import Link from 'next/link'
import { PlayCircle } from 'lucide-react'

interface EpisodeCardProps {
  id: string
  title: string
  description: string
  date: string
  episodeNumber: string
  image?: string
}

const EpisodeCard = ({ id, title, description, date, episodeNumber, image }: EpisodeCardProps) => {
  return (
    <div className="bg-transparent group cursor-pointer border-b border-white/10 pb-8 last:border-0">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image */}
        <div className="w-full md:w-[320px] aspect-square bg-[#c9c9c9] rounded-[12px] overflow-hidden shrink-0 relative">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <PlayCircle size={64} className="text-black" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <PlayCircle size={48} className="text-white" />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-grow py-2">
          <h3 className="text-[24px] md:text-[28px] font-bold text-white mb-4 group-hover:text-white/80 transition-colors">
            {title}
          </h3>
          <p className="text-[16px] leading-[1.4] text-white/70 mb-8 max-w-[800px]">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link 
              href={`/episode/${id}`}
              className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold text-[14px] hover:bg-white/90"
            >
              <PlayCircle size={20} />
              Play Episode
            </Link>
            <div className="flex items-center gap-2 text-white/50 text-[14px]">
              <PlayCircle size={16} />
              <span>Episode {episodeNumber} / {date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EpisodeCard
