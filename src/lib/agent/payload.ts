/**
 * Server-side payload builders for the /api/agent/* endpoints.
 *
 * These are the single source of truth for what this site exposes to an AI
 * agent. The WebMCP tools in ./tools.ts are thin client wrappers that fetch
 * these endpoints — so there is one definition of "an episode, as an agent
 * sees it", not two that can drift.
 *
 * Everything here reads through src/lib/data.ts, which means an agent sees the
 * same episodes the page renders, including the RSS-or-static fallback. There
 * is no separate agent dataset to go stale.
 */

import {
  getAllEpisodes,
  getEpisodeTranscript,
  getEpisodeTopics,
  type Episode,
} from '@/lib/data'
import { siteConfig, attorney, contact, about } from '@/data/siteData'
import { SITE_URL } from './site-url'

/**
 * How an episode is addressed in a URL and in tool input.
 *
 * `main` addresses episodes by number today. The SEO layer (PR #6) adds a
 * title-derived `slug` and makes it the canonical URL segment. Reading slug
 * first and falling back to the id means this layer emits the right identifier
 * under either revision with no edit — and never emits a slug that the page
 * routes cannot resolve.
 */
function episodeKey(ep: Episode): string {
  const slug = (ep as Episode & { slug?: string }).slug
  return slug && slug.length > 0 ? slug : String(ep.id)
}

/** Resolve an agent-supplied identifier against either addressing scheme. */
async function findEpisode(idOrSlug: string): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  const bySlug = episodes.find((ep) => episodeKey(ep) === idOrSlug)
  if (bySlug) return bySlug
  const n = Number(idOrSlug)
  if (Number.isFinite(n)) return episodes.find((ep) => ep.id === n) ?? null
  return null
}

/** Transcripts run to thousands of segments; an unbounded default would blow an agent's context. */
export const TRANSCRIPT_PAGE_DEFAULT = 200
export const TRANSCRIPT_PAGE_MAX = 1000
export const EPISODE_PAGE_DEFAULT = 50
export const EPISODE_PAGE_MAX = 200

/** Rejects empty, placeholder and unsubstituted-token values for outbound links. */
function isRealUrl(value: string | null | undefined): boolean {
  if (!value) return false
  const v = value.trim()
  if (v === '' || v === '#') return false
  if (v.includes('{{') || v.includes('}}')) return false
  return true
}

function episodeUrl(ep: Episode): string {
  return `${SITE_URL}/episode/${episodeKey(ep)}`
}

/** Summary shape — what list and search return. Deliberately excludes transcripts. */
export function episodeSummary(ep: Episode) {
  return {
    number: ep.number,
    slug: episodeKey(ep),
    title: ep.title,
    subtitle: ep.subtitle || null,
    description: ep.description || null,
    date: ep.date || null,
    duration: ep.duration || null,
    topic: ep.topic || null,
    concepts: ep.concepts?.length ? ep.concepts : [],
    url: episodeUrl(ep),
  }
}

/** Full shape — adds the media and chapter fields a summary omits. */
export function episodeDetail(ep: Episode) {
  return {
    ...episodeSummary(ep),
    category: ep.category || null,
    featured: Boolean(ep.featured),
    chapters: ep.chapters?.length ? ep.chapters : [],
    audioUrl: ep.audioUrl || null,
    youtubeUrl: ep.youtubeUrl || null,
    hasTranscript: Boolean(ep.transcriptUrl) || ep.id === 1,
    transcriptUrl: `${SITE_URL}/api/agent/episodes/${episodeKey(ep)}/transcript`,
  }
}

function clampLimit(raw: string | null, fallback: number, max: number): number {
  const n = Number(raw)
  if (!Number.isFinite(n) || n <= 0) return fallback
  return Math.min(Math.floor(n), max)
}

function clampOffset(raw: string | null): number {
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.floor(n)
}

/**
 * Substring match over the fields that carry meaning — title, subtitle,
 * description, topic, concepts.
 *
 * Deliberately NOT a transcript search. Searching transcript bodies means
 * fetching every episode's transcript per query, which on an RSS-backed site
 * is one network round trip per episode. If transcript search is wanted it
 * needs a real index, not a loop.
 */
function matchesQuery(ep: Episode, q: string): boolean {
  const haystack = [ep.title, ep.subtitle, ep.description, ep.topic, ...(ep.concepts ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(q)
}

export async function buildEpisodeList(params: URLSearchParams) {
  const all = await getAllEpisodes()
  const q = (params.get('q') || '').trim().toLowerCase()
  const topic = (params.get('topic') || '').trim().toLowerCase()

  let filtered = all
  if (q) filtered = filtered.filter((ep) => matchesQuery(ep, q))
  if (topic && topic !== 'all') {
    filtered = filtered.filter((ep) => (ep.topic || '').toLowerCase() === topic)
  }

  const limit = clampLimit(params.get('limit'), EPISODE_PAGE_DEFAULT, EPISODE_PAGE_MAX)
  const offset = clampOffset(params.get('offset'))
  const page = filtered.slice(offset, offset + limit)

  return {
    total: filtered.length,
    offset,
    limit,
    returned: page.length,
    query: q || null,
    topic: params.get('topic') || null,
    episodes: page.map(episodeSummary),
  }
}

export async function buildEpisodeDetail(slugOrNumber: string) {
  const ep = await findEpisode(slugOrNumber)
  if (!ep) return null
  return episodeDetail(ep)
}

export async function buildTranscript(slugOrNumber: string, params: URLSearchParams) {
  const ep = await findEpisode(slugOrNumber)
  if (!ep) return null

  const segments = await getEpisodeTranscript(ep)
  const limit = clampLimit(params.get('limit'), TRANSCRIPT_PAGE_DEFAULT, TRANSCRIPT_PAGE_MAX)
  const offset = clampOffset(params.get('offset'))
  const page = segments.slice(offset, offset + limit)

  return {
    episode: { number: ep.number, slug: episodeKey(ep), title: ep.title, url: episodeUrl(ep) },
    total: segments.length,
    offset,
    limit,
    returned: page.length,
    // An agent that stops at `returned` without checking this silently reads a
    // partial transcript, so say it outright rather than making it inferable.
    hasMore: offset + page.length < segments.length,
    segments: page.map((s) => ({ timestamp: s.timestamp, speaker: s.speaker, text: s.text })),
  }
}

export async function buildPodcastInfo() {
  const episodes = await getAllEpisodes()
  const topics = await getEpisodeTopics(episodes)
  const platformLinks = (siteConfig.platformLinks ?? {}) as Record<string, string>

  return {
    name: siteConfig.podcastName,
    tagline: siteConfig.tagline || null,
    description: about.description || null,
    host: { name: attorney.name, title: attorney.title || null, firm: attorney.firm || null },
    firm: {
      name: attorney.firm || null,
      website: siteConfig.firmUrl || contact.website || null,
      phone: contact.phone || null,
      email: contact.email || null,
      address: contact.address || null,
    },
    episodeCount: episodes.length,
    // 'All' is a UI filter affordance, not a real topic — an agent offered it
    // as a topic value would filter on a topic no episode carries.
    topics: topics.filter((t) => t.toLowerCase() !== 'all'),
    subscribe: Object.entries(platformLinks)
      // '#' is the template's not-configured-yet placeholder and an
      // unsubstituted {{TOKEN}} means the build never filled it in. Both are
      // truthy, so a plain Boolean check hands an agent a subscribe link that
      // goes nowhere — worse than reporting no link at all.
      .filter(([, url]) => isRealUrl(url))
      .map(([platform, url]) => ({ platform, url })),
    url: SITE_URL,
  }
}

/**
 * Self-describing index. An agent that finds /api/agent can discover the rest
 * without knowing our route names in advance, and a crawler with no WebMCP
 * support at all gets a readable map of the site's structured data.
 */
export function buildManifest() {
  return {
    name: siteConfig.podcastName,
    description: `Agent-readable data for ${siteConfig.podcastName}. Read-only.`,
    site: SITE_URL,
    spec: 'https://webmachinelearning.github.io/webmcp',
    readOnly: true,
    endpoints: [
      { path: '/api/agent/podcast', description: 'Show name, host, firm contact details, topic list, subscribe links.' },
      { path: '/api/agent/episodes', description: 'List or search episodes. Params: q, topic, limit, offset.' },
      { path: '/api/agent/episodes/{slug}', description: 'One episode with audio, video and chapter details.' },
      { path: '/api/agent/episodes/{slug}/transcript', description: 'Paginated transcript segments. Params: limit, offset.' },
    ],
  }
}
