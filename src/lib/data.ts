import { fetchPodcastFeed, fetchTranscript as fetchRssTranscript, type RSSEpisode, type TranscriptSegment } from './rss'
import { episodes as staticEpisodes } from '@/data/siteData'
import { episodeTranscript as staticTranscript } from '@/data/transcript'

const RSS_URL = process.env.PODCAST_RSS_URL
export const REVALIDATE = parseInt(process.env.REVALIDATE_SECONDS || '3600', 10)

export interface Episode {
  id: number
  number: number
  title: string
  subtitle: string
  description: string
  duration: string
  date: string
  category: string
  featured: boolean
  topic: string
  concepts: string[]
  chapters: string[]
  logo: string
  audioUrl?: string
  audioType?: string
  transcriptUrl?: string | null
  transcriptType?: string | null
}

function rssEpisodeToEpisode(ep: RSSEpisode): Episode {
  return {
    id: ep.id,
    number: ep.id,
    title: ep.title,
    subtitle: ep.subtitle,
    description: ep.description,
    duration: ep.duration,
    date: ep.date,
    category: ep.category,
    featured: ep.featured,
    topic: ep.topic,
    concepts: ep.concepts,
    chapters: ep.chapters,
    logo: ep.logo,
    audioUrl: ep.audioUrl || undefined,
    audioType: ep.audioType || undefined,
    transcriptUrl: ep.transcriptUrl,
    transcriptType: ep.transcriptType,
  }
}

function normalizeStaticEpisode(ep: Record<string, unknown>): Episode {
  return {
    id: (ep.id as number) ?? 1,
    number: (ep.number as number) ?? (ep.id as number) ?? 1,
    title: (ep.title as string) ?? '',
    subtitle: (ep.subtitle as string) ?? '',
    description: (ep.description as string) ?? '',
    duration: (ep.duration as string) ?? '',
    date: (ep.date as string) ?? '',
    category: (ep.category as string) ?? '',
    featured: (ep.featured as boolean) ?? false,
    topic: (ep.topic as string) ?? '',
    concepts: (ep.concepts as string[]) ?? [],
    chapters: (ep.chapters as string[]) ?? [],
    logo: (ep.logo as string) ?? '',
    audioUrl: (ep.audioUrl as string) ?? undefined,
    audioType: (ep.audioType as string) ?? undefined,
    transcriptUrl: (ep.transcriptUrl as string) ?? null,
    transcriptType: (ep.transcriptType as string) ?? null,
  }
}

let feedCache: { episodes: Episode[]; fetchedAt: number } | null = null

export async function getAllEpisodes(): Promise<Episode[]> {
  if (!RSS_URL) {
    return (staticEpisodes as Record<string, unknown>[]).map(normalizeStaticEpisode)
  }

  // Simple in-memory cache for same request cycle
  if (feedCache && Date.now() - feedCache.fetchedAt < 30_000) {
    return feedCache.episodes
  }

  try {
    const feed = await fetchPodcastFeed(RSS_URL)
    const episodes = feed.episodes.map(rssEpisodeToEpisode)
    feedCache = { episodes, fetchedAt: Date.now() }
    return episodes
  } catch (e) {
    console.error('RSS fetch failed, falling back to static data:', e)
    return (staticEpisodes as Record<string, unknown>[]).map(normalizeStaticEpisode)
  }
}

export async function getEpisodeById(id: number): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  return episodes.find(ep => ep.id === id) ?? null
}

export async function getEpisodeTranscript(episode: Episode): Promise<TranscriptSegment[]> {
  if (!RSS_URL) {
    return staticTranscript
  }

  if (episode.transcriptUrl && episode.transcriptType) {
    const segments = await fetchRssTranscript(episode.transcriptUrl, episode.transcriptType)
    if (segments.length > 0) return segments
  }

  // Fall back to static transcript for episode 1
  if (episode.id === 1) return staticTranscript
  return []
}

export async function getEpisodeTopics(episodes: Episode[]): Promise<string[]> {
  const topics = new Set<string>(['All'])
  episodes.forEach(ep => {
    if (ep.topic) topics.add(ep.topic)
  })
  return Array.from(topics)
}
