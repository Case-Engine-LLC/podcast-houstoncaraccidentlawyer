/**
 * Markdown renderings of this site, for AI agents.
 *
 * Why this exists alongside the rendered pages: HTML is the right shape for a
 * person and the wrong shape for a model. An agent handed an episode page gets
 * hundreds of kilobytes of nav, player, schema blocks and utility classes to
 * dig a transcript out of. The same episode as markdown is the words and
 * nothing else, and every model reads markdown natively.
 *
 * It also matters for reach: the crawlers that feed AI answers (GPTBot,
 * ClaudeBot, CCBot, PerplexityBot) do not execute JavaScript, so a markdown
 * route is the one view of an episode guaranteed to carry the complete
 * transcript no matter what the page component does with it.
 *
 * Routes that serve these:
 *   /llms.txt                  — the index a model reads first (llmstxt.org)
 *   /index.md                  — the show, as markdown
 *   /episode/<slug>/index.md   — one episode plus its full transcript
 *
 * Everything reads through src/lib/data.ts, the same source the pages use, so
 * the markdown and the rendered page cannot disagree about what an episode is.
 *
 * Self-contained by design: it imports only from `@/lib/data` and
 * `@/data/siteData`, both of which exist in every fork of this template.
 */

import {
  getAllEpisodes,
  getEpisodeTranscript,
  getEpisodeTopics,
  type Episode,
} from '@/lib/data'
import { siteConfig, attorney, contact, about } from '@/data/siteData'

/**
 * Set false in forks that do not ship the /api/agent JSON endpoints, so this
 * file never advertises a URL that 404s.
 */
const HAS_AGENT_API = true

/** A value still shaped like {{TOKEN}} was never filled in by the build. */
function isUnfilled(v: unknown): boolean {
  return typeof v !== 'string' || v.trim() === '' || /^\{\{[A-Z0-9_]+\}\}$/.test(v.trim())
}

/** '#' is the not-configured placeholder for a link. */
function isRealUrl(value: unknown): value is string {
  if (isUnfilled(value)) return false
  const v = (value as string).trim()
  return v !== '#' && /^https?:\/\//i.test(v)
}

/**
 * The site's own origin.
 *
 * Same resolution order the SEO layer uses — the client's real domain first,
 * the deployment origin second — and never a baked-in default, which would
 * brand one client's markdown with another client's URLs.
 */
export const SITE_URL: string = (() => {
  const candidates = [
    (siteConfig as { podcastUrl?: string }).podcastUrl,
    (contact as { website?: string }).website,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
  ]
  for (const c of candidates) {
    if (isRealUrl(c)) return (c as string).replace(/\/$/, '')
  }
  return ''
})()

/** Absolute when we know the origin, root-relative when we do not. */
function url(path: string): string {
  return SITE_URL ? `${SITE_URL}${path}` : path
}

/** Same addressing rule as the page routes: slug when there is one, else id. */
export function episodeKey(ep: Episode): string {
  const slug = (ep as Episode & { slug?: string }).slug
  return slug && slug.length > 0 ? slug : String(ep.id)
}

/** Descriptions arrive from RSS and can carry markup and entities. */
function clean(value: unknown): string {
  if (typeof value !== 'string') return ''
  const v = value.trim()
  if (/^\{\{[A-Z0-9_]+\}\}$/.test(v)) return ''
  return v
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&hellip;/g, '…')
    .replace(/\s+/g, ' ')
    .trim()
}

function fact(label: string, value: unknown): string | null {
  const v = clean(value)
  return v ? `- **${label}:** ${v}` : null
}

const DISCLAIMER =
  'Law firm podcast. Nothing here is legal advice and no attorney-client relationship is created by reading or citing it.'

/** The show as markdown: who it is, where to subscribe, every episode. */
export async function buildSiteMarkdown(): Promise<string> {
  const episodes = await getAllEpisodes()
  const topics = (await getEpisodeTopics(episodes)).filter((t) => t.toLowerCase() !== 'all')
  const platformLinks = ((siteConfig as { platformLinks?: Record<string, string> }).platformLinks ?? {})

  const out: string[] = []
  out.push(`# ${clean(siteConfig.podcastName) || 'Podcast'}`)

  const tagline = clean((siteConfig as { tagline?: string }).tagline)
  if (tagline) out.push('', `> ${tagline}`)

  const description = clean((about as { description?: string }).description)
  if (description) out.push('', description)

  const facts = [
    fact('Host', attorney.name),
    fact('Title', (attorney as { title?: string }).title),
    fact('Firm', (attorney as { firm?: string }).firm),
    fact('Firm website', (siteConfig as { firmUrl?: string }).firmUrl || contact.website),
    fact('Phone', contact.phone),
    fact('Email', contact.email),
    fact('Address', (contact as { address?: string }).address),
    `- **Episodes:** ${episodes.length}`,
    topics.length ? `- **Topics:** ${topics.join(', ')}` : null,
  ].filter(Boolean) as string[]
  out.push('', '## The show', '', ...facts)

  const subscribe = Object.entries(platformLinks).filter(([, u]) => isRealUrl(u))
  if (subscribe.length) {
    out.push('', '## Subscribe', '')
    for (const [platform, u] of subscribe) out.push(`- [${platform}](${u})`)
  }

  if (episodes.length) {
    out.push('', '## Episodes', '')
    for (const ep of episodes) {
      const key = episodeKey(ep)
      const desc = clean(ep.description || ep.subtitle)
      out.push(
        `### ${ep.number ? `Episode ${ep.number}: ` : ''}${clean(ep.title)}`,
        '',
        [
          fact('Published', ep.date),
          fact('Duration', ep.duration),
          `- **Page:** ${url(`/episode/${key}`)}`,
          `- **Transcript (markdown):** ${url(`/episode/${key}/index.md`)}`,
        ]
          .filter(Boolean)
          .join('\n'),
        '',
        desc,
        '',
      )
    }
  }

  out.push('## For agents', '')
  out.push(`- Index for language models: ${url('/llms.txt')}`)
  if (HAS_AGENT_API) out.push(`- Structured JSON API: ${url('/api/agent')}`)
  out.push('', '---', '', DISCLAIMER)

  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n'
}

/** One episode as markdown, including the complete transcript. */
export async function buildEpisodeMarkdown(episode: Episode): Promise<string> {
  const transcript = await getEpisodeTranscript(episode)
  const key = episodeKey(episode)

  const out: string[] = []
  out.push(`# ${clean(episode.title)}`)

  const facts = [
    fact('Podcast', siteConfig.podcastName),
    episode.number ? `- **Episode:** ${episode.number}` : null,
    fact('Published', episode.date),
    fact('Duration', episode.duration),
    fact('Host', attorney.name),
    fact('Firm', (attorney as { firm?: string }).firm),
    fact('Topic', episode.topic),
    episode.concepts?.length
      ? `- **Concepts:** ${episode.concepts.map(clean).filter(Boolean).join(', ')}`
      : null,
    isRealUrl(episode.audioUrl) ? `- **Audio:** ${episode.audioUrl}` : null,
    isRealUrl((episode as { youtubeUrl?: string }).youtubeUrl)
      ? `- **Video:** ${(episode as { youtubeUrl?: string }).youtubeUrl}`
      : null,
    `- **Page:** ${url(`/episode/${key}`)}`,
  ].filter(Boolean) as string[]
  out.push('', ...facts)

  const subtitle = clean(episode.subtitle)
  if (subtitle) out.push('', `> ${subtitle}`)

  const description = clean(episode.description)
  if (description) out.push('', '## Summary', '', description)

  if (episode.chapters?.length) {
    out.push('', '## Chapters', '')
    for (const c of episode.chapters) {
      const t = clean(c)
      if (t) out.push(`- ${t}`)
    }
  }

  out.push('', '## Transcript', '')
  if (transcript.length === 0) {
    // Stated plainly rather than left blank: an agent has to be able to tell
    // "no transcript published" from "the transcript failed to load".
    out.push('_No transcript is published for this episode._')
  } else {
    for (const seg of transcript) {
      const text = clean(seg.text)
      if (!text) continue
      const speaker = clean(seg.speaker)
      const ts = clean(seg.timestamp)
      const prefix = [ts ? `[${ts}]` : '', speaker ? `**${speaker}:**` : ''].filter(Boolean).join(' ')
      out.push(prefix ? `${prefix} ${text}` : text, '')
    }
  }

  out.push('---', '', `Source: ${url(`/episode/${key}`)} · All episodes: ${url('/llms.txt')}`, '', DISCLAIMER)

  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n'
}

/**
 * llms.txt — https://llmstxt.org
 *
 * Curated, not a sitemap dump: what the show is, who hosts it, and one line
 * per episode pointing at the markdown that holds the actual words. A model
 * that reads only this file can answer who the host is, what the show covers,
 * and where to find the transcript for any episode.
 */
export async function buildLlmsTxt(): Promise<string> {
  const episodes = await getAllEpisodes()
  const topics = (await getEpisodeTopics(episodes)).filter((t) => t.toLowerCase() !== 'all')

  const host = clean(attorney.name)
  const firm = clean((attorney as { firm?: string }).firm)
  const summary = [
    clean((siteConfig as { tagline?: string }).tagline),
    host ? `Hosted by ${host}${firm ? ` of ${firm}` : ''}.` : '',
    episodes.length
      ? `${episodes.length} episode${episodes.length === 1 ? '' : 's'}, each with a full transcript in markdown.`
      : '',
  ]
    .filter(Boolean)
    .join(' ')

  const out: string[] = []
  out.push(`# ${clean(siteConfig.podcastName) || 'Podcast'}`)
  if (summary) out.push('', `> ${summary}`)
  if (topics.length) out.push('', `Topics covered: ${topics.join(', ')}.`)

  if (episodes.length) {
    out.push('', '## Episodes', '')
    for (const ep of episodes) {
      const key = episodeKey(ep)
      const desc = clean(ep.subtitle || ep.description).slice(0, 220)
      out.push(
        `- [${ep.number ? `Episode ${ep.number}: ` : ''}${clean(ep.title)}](${url(`/episode/${key}/index.md`)})` +
          (desc ? `: ${desc}` : ''),
      )
    }
  }

  out.push('', '## About', '')
  out.push(`- [The show, as markdown](${url('/index.md')}): host, firm, contact details and every episode.`)
  const firmUrl = (siteConfig as { firmUrl?: string }).firmUrl || contact.website
  if (isRealUrl(firmUrl)) out.push(`- [${firm || 'The law firm'}](${firmUrl}): the firm behind the podcast.`)

  if (HAS_AGENT_API) {
    out.push('', '## Optional', '')
    out.push(`- [Structured JSON API](${url('/api/agent')}): the same content as JSON, for tool calls.`)
  }

  return out.join('\n') + '\n'
}
