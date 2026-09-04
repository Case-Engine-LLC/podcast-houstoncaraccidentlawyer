import { fetchPodcastFeed, fetchTranscript as fetchRssTranscript, type RSSEpisode, type TranscriptSegment } from './rss'
import { generatedTranscripts, TRANSCRIPTS_BY_GUID } from '@/data/transcripts.generated'
import { episodes as staticEpisodes, siteConfig } from '@/data/siteData'

// Prefer env var (Vercel project setting), fall back to siteData.rssFeedUrl
// so the build still has a wired feed if the env var is not set.
const RSS_URL = process.env.PODCAST_RSS_URL || (siteConfig as { rssFeedUrl?: string })?.rssFeedUrl || undefined

export function slugifyEpisode(title: string, fallback: string = 'episode'): string {
  if (!title) return fallback
  const s = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return s.slice(0, 80) || fallback
}
export const REVALIDATE = parseInt(process.env.REVALIDATE_SECONDS || '3600', 10)

export interface Episode {
  id: number
  guid?: string
  slug?: string
  number: number
  season?: number | null
  isExtension?: boolean
  numbered?: boolean
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

function normalizeEpisodeKey(value: string | undefined): string {
  return slugifyEpisode(value || '').toLowerCase()
}

function findStaticEpisodeOverride(ep: RSSEpisode, generatedSlug: string): Episode | null {
  const staticEpisode = (staticEpisodes as Record<string, unknown>[]).find((candidate) => {
    const candidateSlug = candidate.slug as string | undefined
    const candidateTitle = candidate.title as string | undefined
    const candidateGuid = (candidate.guid || candidate.rssGuid || candidate.sourceGuid) as string | undefined

    return (
      (!!candidateGuid && candidateGuid === ep.guid)
      || (!!candidateSlug && candidateSlug === generatedSlug)
      || normalizeEpisodeKey(candidateTitle) === normalizeEpisodeKey(ep.title)
    )
  })

  return staticEpisode ? normalizeStaticEpisode(staticEpisode) : null
}

function rssEpisodeToEpisode(ep: RSSEpisode): Episode {
  const generatedSlug = slugifyEpisode(ep.title, String(ep.id))
  const staticEpisode = findStaticEpisodeOverride(ep, generatedSlug)
  const staticConcepts = (staticEpisode?.concepts as string[] | undefined) ?? []
  const staticChapters = ((staticEpisode?.chapters as string[] | undefined) ?? []).filter(Boolean)
  const title = staticEpisode?.title || ep.title

  return {
    id: ep.id,
    guid: ep.guid,
    slug: staticEpisode?.slug || generatedSlug,
    number: ep.id,
    season: ep.season,
    isExtension: ep.isExtension,
    numbered: ep.numbered,
    title,
    subtitle: staticEpisode?.subtitle || ep.subtitle,
    description: staticEpisode?.description || ep.description,
    duration: ep.duration,
    date: ep.date,
    category: staticEpisode?.category || ep.category,
    featured: ep.featured,
    topic: staticEpisode?.topic || ep.topic,
    concepts: staticConcepts.length > 0 ? staticConcepts : ep.concepts,
    chapters: staticChapters.length > 0 ? staticChapters : ep.chapters,
    logo: staticEpisode?.logo || ep.logo,
    audioUrl: ep.audioUrl || undefined,
    audioType: ep.audioType || undefined,
    transcriptUrl: ep.transcriptUrl,
    transcriptType: ep.transcriptType,
    youtubeUrl: staticEpisode?.youtubeUrl,
  }
}

function normalizeStaticEpisode(ep: Record<string, unknown>): Episode {
  return {
    id: (ep.id as number) ?? 1,
    guid: (ep.guid as string) || undefined,
    slug: (ep.slug as string) || slugifyEpisode((ep.title as string) || '', String((ep.id as number) ?? 1)),
    number: (ep.number as number) ?? (ep.id as number) ?? 1,
    season: (ep.season as number | null) ?? null,
    isExtension: (ep.isExtension as boolean) ?? false,
    numbered: (ep.numbered as boolean) ?? true,
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

// Remove duplicate feed items that share a slug, keeping the best-tagged one:
// a numbered main beats a season-only city extension beats an untagged duplicate.
// (Fixes the case where an accidental untagged copy hijacks an episode's page.)
function dedupeBySlug(episodes: Episode[]): Episode[] {
  const best = new Map<string, Episode>()
  for (const ep of episodes) {
    const key = ep.slug || String(ep.id)
    const cur = best.get(key)
    const epRank = ep.numbered ? 2 : ep.isExtension ? 1 : 0
    const curRank = cur ? (cur.numbered ? 2 : cur.isExtension ? 1 : 0) : -1
    if (!cur || epRank > curRank) best.set(key, ep)
  }
  return episodes.filter(ep => best.get(ep.slug || String(ep.id)) === ep)
}

export async function getAllEpisodes(): Promise<Episode[]> {
  if (!RSS_URL) {
    return dedupeBySlug((staticEpisodes as Record<string, unknown>[]).map(normalizeStaticEpisode))
  }

  // Simple in-memory cache for same request cycle
  if (feedCache && Date.now() - feedCache.fetchedAt < 30_000) {
    return feedCache.episodes
  }

  try {
    const feed = await fetchPodcastFeed(RSS_URL)
    const episodes = dedupeBySlug(feed.episodes.map(rssEpisodeToEpisode))
    if (episodes.length === 0) {
      // Feed exists but has no episodes yet — fall back to static data
      return dedupeBySlug((staticEpisodes as Record<string, unknown>[]).map(normalizeStaticEpisode))
    }
    feedCache = { episodes, fetchedAt: Date.now() }
    return episodes
  } catch (e) {
    console.error('RSS fetch failed, falling back to static data:', e)
    return dedupeBySlug((staticEpisodes as Record<string, unknown>[]).map(normalizeStaticEpisode))
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
  if (episode.guid && TRANSCRIPTS_BY_GUID[episode.guid]) {
    return TRANSCRIPTS_BY_GUID[episode.guid]
  }

  // Prefer a slug-keyed transcript: the slug is a stable identity that works for
  // city extensions (which have no episode number to key on). Fall back to the
  // legacy numeric-id key so existing main-episode transcripts keep working.
  const bySlug = episode.slug ? generatedTranscripts[episode.slug] : undefined
  if (bySlug && bySlug.length) return bySlug

  if (RSS_URL && episode.transcriptUrl && episode.transcriptType) {
    const segments = await fetchRssTranscript(episode.transcriptUrl, episode.transcriptType)
    if (segments.length > 0) return segments
  }

  return generatedTranscripts[episode.id] ?? []
}

export async function getEpisodeTopics(episodes: Episode[]): Promise<string[]> {
  const topics = new Set<string>(['All'])
  episodes.forEach(ep => {
    if (ep.topic) topics.add(ep.topic)
  })
  return Array.from(topics)
}
