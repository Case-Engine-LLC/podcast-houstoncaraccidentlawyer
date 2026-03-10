'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface AudioPlayerProps {
  audioUrl: string
  duration?: string
  title?: string
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2]

const AudioPlayer = ({ audioUrl, duration, title }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onDurationChange = () => setTotalDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const bar = progressRef.current
    if (!audio || !bar) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * audio.duration
  }, [])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  const cyclePlaybackRate = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    const idx = PLAYBACK_RATES.indexOf(playbackRate)
    const next = PLAYBACK_RATES[(idx + 1) % PLAYBACK_RATES.length]
    audio.playbackRate = next
    setPlaybackRate(next)
  }, [playbackRate])

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0

  return (
    <div className="bg-[#2a2a3e] rounded-2xl p-6">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {title && (
        <div className="text-white/60 text-sm mb-3 truncate">{title}</div>
      )}

      <div className="flex items-center gap-4">
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:scale-105 transition-transform shrink-0"
        >
          {isPlaying ? (
            <Pause size={20} className="text-white fill-white" />
          ) : (
            <Play size={20} className="text-white fill-white ml-0.5" />
          )}
        </button>

        {/* Progress */}
        <div className="flex-1 flex flex-col gap-1">
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer group"
          >
            <div
              className="h-full bg-secondary rounded-full transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/40">
            <span>{formatTime(currentTime)}</span>
            <span>{totalDuration > 0 ? formatTime(totalDuration) : (duration || '0:00')}</span>
          </div>
        </div>

        {/* Speed */}
        <button
          onClick={cyclePlaybackRate}
          className="text-xs text-white/50 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 shrink-0"
        >
          {playbackRate}x
        </button>

        {/* Volume */}
        <button
          onClick={toggleMute}
          className="text-white/50 hover:text-white transition-colors shrink-0"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </div>
  )
}

export default AudioPlayer
