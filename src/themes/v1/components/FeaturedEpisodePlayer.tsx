'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Play, Pause, Volume2, VolumeX, ChevronRight } from 'lucide-react'
import { episode as defaultEpisode } from '@/data/siteData'

interface FeaturedEpisodePlayerProps {
  episodeNumber?: string
  title?: string
  description?: string
  duration?: string
  episodeLink?: string
  imageUrl?: string
  audioUrl?: string
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

const FeaturedEpisodePlayer = ({
  episodeNumber = String(defaultEpisode.number),
  title = defaultEpisode.title,
  description = defaultEpisode.description.replace(/\*\*/g, ''),
  duration = defaultEpisode.duration,
  episodeLink = `/episode/${(defaultEpisode as { slug?: string; number?: number; id?: number | string }).slug ?? defaultEpisode.number ?? 1}`,
  imageUrl,
  audioUrl,
}: FeaturedEpisodePlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrentTime(audio.currentTime)
    const onDur = () => setTotalDuration(audio.duration)
    const onEnd = () => setIsPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('durationchange', onDur)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('durationchange', onDur)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause() } else { audio.play() }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const bar = progressRef.current
    if (!audio || !bar || !totalDuration) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * totalDuration
  }, [totalDuration])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0
  const coverSrc = imageUrl || '/episode-art.avif'

  return (
    <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex gap-4 mb-4 items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
            <img src={coverSrc} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-black leading-tight mb-1">{title}</h3>
            <div className="text-xs text-gray-500">Episode {episodeNumber} • {duration}</div>
          </div>
          <Link href={episodeLink} className="text-black hover:opacity-70 transition-opacity shrink-0">
            <ChevronRight size={28} />
          </Link>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
        <div className="flex items-center gap-3">
          {audioUrl ? (
            <button onClick={togglePlay} aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`} className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0">
              {isPlaying ? <Pause size={20} fill="white" className="text-white" /> : <Play size={20} fill="white" className="text-white ml-0.5" />}
            </button>
          ) : (
            <Link href={episodeLink} aria-label={`Play ${title}`} className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0">
              <Play size={20} fill="white" className="text-white ml-0.5" />
            </Link>
          )}
          {audioUrl ? (
            <div className="flex-1 flex flex-col gap-1">
              <div ref={progressRef} onClick={handleSeek} className="h-1.5 bg-gray-200 rounded-full overflow-hidden cursor-pointer group">
                <div className="h-full bg-black transition-all group-hover:bg-gray-800" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs text-gray-400">
                {formatTime(currentTime)} / {totalDuration > 0 ? formatTime(totalDuration) : duration}
              </span>
            </div>
          ) : (
            <Link href={episodeLink} className="flex-1 flex flex-col gap-1 cursor-pointer">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden group">
                <div className="h-full w-0 bg-black transition-all group-hover:bg-gray-800" />
              </div>
              <span className="text-xs text-gray-400">
                0:00 / {duration}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex gap-6">
        <div className="w-[12rem] h-[12rem] bg-gray-200 rounded-lg shrink-0 overflow-hidden">
          <img src={coverSrc} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-black leading-tight pr-4">{title}</h3>
              <Link href={episodeLink} className="flex items-center gap-1 text-sm text-black hover:opacity-70 transition-opacity shrink-0">
                Episode Page <ChevronRight size={16} />
              </Link>
            </div>
            <p className="text-sm md:text-base text-gray-600 mb-3 leading-relaxed">{description}</p>
            <div className="text-sm text-gray-500 mb-4">Episode {episodeNumber} • {duration}</div>
          </div>
          <div className="flex items-center gap-4">
            {audioUrl ? (
              <button onClick={togglePlay} aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`} className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0">
                {isPlaying ? <Pause size={18} fill="white" className="text-white" /> : <Play size={18} fill="white" className="text-white ml-0.5" />}
              </button>
            ) : (
              <Link href={episodeLink} aria-label={`Play ${title}`} className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0">
                <Play size={18} fill="white" className="text-white ml-0.5" />
              </Link>
            )}
            {audioUrl ? (
              <div ref={progressRef} onClick={handleSeek} className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden cursor-pointer group">
                <div className="h-full bg-black transition-all group-hover:bg-gray-800" style={{ width: `${progress}%` }} />
              </div>
            ) : (
              <Link href={episodeLink} className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden cursor-pointer group">
                <div className="h-full w-0 bg-black transition-all group-hover:bg-gray-800" />
              </Link>
            )}
            <span className="text-xs text-gray-400 shrink-0 min-w-[3.5rem] text-right">
              {totalDuration > 0 ? formatTime(totalDuration - currentTime) : duration}
            </span>
            {audioUrl ? (
              <button onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'} className="text-gray-600 hover:text-black transition-colors shrink-0">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            ) : (
              <Link href={episodeLink} aria-label="Open episode page for full player" className="text-gray-600 hover:text-black transition-colors shrink-0">
                <Volume2 size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedEpisodePlayer
