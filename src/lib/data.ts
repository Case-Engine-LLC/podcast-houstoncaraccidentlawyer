import { fetchPodcastFeed, fetchTranscript as fetchRssTranscript, type RSSEpisode, type TranscriptSegment } from './rss'
import { episodes as staticEpisodes } from '@/data/siteData'
import { episodeTranscript as staticTranscript } from '@/data/transcript'

const RSS_URL = process.env.PODCAST_RSS_URL

export function slugifyEpisode(title: string, fallback: string = 'episode'): string {
  if (!title) return fallback
  const s = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return s.slice(0, 80) || fallback
}
export const REVALIDATE = parseInt(process.env.REVALIDATE_SECONDS || '3600', 10)

export interface Episode {
  id: number
  slug?: string
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
  youtubeUrl?: string
}

function rssEpisodeToEpisode(ep: RSSEpisode): Episode {
  const staticEpisode = (staticEpisodes as Record<string, unknown>[]).find(item => {
    const id = (item.id as number) ?? (item.number as number)
    return id === ep.id
  })
  const staticConcepts = (staticEpisode?.concepts as string[] | undefined) ?? []
  const staticChapters = ((staticEpisode?.chapters as string[] | undefined) ?? []).filter(Boolean)
  const title = (staticEpisode?.title as string) || ep.title

  return {
    id: ep.id,
    slug: (staticEpisode?.slug as string) || slugifyEpisode(title, String(ep.id)),
    number: ep.id,
    title,
    subtitle: (staticEpisode?.subtitle as string) || ep.subtitle,
    description: (staticEpisode?.description as string) || ep.description,
    duration: ep.duration,
    date: ep.date,
    category: (staticEpisode?.category as string) || ep.category,
    featured: ep.featured,
    topic: (staticEpisode?.topic as string) || ep.topic,
    concepts: staticConcepts.length > 0 ? staticConcepts : ep.concepts,
    chapters: staticChapters.length > 0 ? staticChapters : ep.chapters,
    logo: (staticEpisode?.logo as string) || ep.logo,
    audioUrl: ep.audioUrl || undefined,
    audioType: ep.audioType || undefined,
    transcriptUrl: ep.transcriptUrl,
    transcriptType: ep.transcriptType,
  }
}

function normalizeStaticEpisode(ep: Record<string, unknown>): Episode {
  return {
    id: (ep.id as number) ?? 1,
    slug: (ep.slug as string) || slugifyEpisode((ep.title as string) || '', String((ep.id as number) ?? 1)),
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
    youtubeUrl: (ep.youtubeUrl as string) ?? undefined,
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
    if (episodes.length === 0) {
      // Feed exists but has no episodes yet — fall back to static data
      return (staticEpisodes as Record<string, unknown>[]).map(normalizeStaticEpisode)
    }
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

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  return episodes.find(ep => ep.slug === slug) ?? null
}

export async function getEpisodeByIdOrSlug(idOrSlug: string): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  const bySlug = episodes.find(ep => ep.slug === idOrSlug)
  if (bySlug) return bySlug
  const n = Number(idOrSlug)
  if (Number.isFinite(n)) return episodes.find(ep => ep.id === n) ?? null
  return null
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
