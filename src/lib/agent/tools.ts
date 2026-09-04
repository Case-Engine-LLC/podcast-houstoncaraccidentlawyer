/**
 * The WebMCP tool set this podcast site offers an AI agent.
 *
 * Every tool is READ-ONLY and every one is a thin wrapper over a same-origin
 * /api/agent/* endpoint (see ./payload.ts). Adding a tool here without a
 * matching endpoint is the drift this split exists to prevent.
 *
 * ── On write actions ────────────────────────────────────────────────────────
 * There are none, deliberately, and this is not a "not yet got to it" gap.
 *
 * The obvious candidates on a law firm property are booking a consultation and
 * submitting a contact form. Spam is the least of the problem. An agent
 * submitting case facts on a visitor's behalf hands the firm unverified intake
 * it never agreed to receive, which can seed a CONFLICT-CHECK problem the
 * moment those facts concern an existing client's adversary. It also raises
 * confidentiality and prospective-client duties, and in some jurisdictions
 * bears on whether an attorney-client relationship was implied. Bar
 * advertising rules govern intake paths, and an agent-driven submission is not
 * obviously covered by a site's existing disclaimers.
 *
 * That is a question for each firm's counsel, not an engineering call. The
 * read-only `get_consultation_info` equivalent on the attorney template gives
 * an agent everything it needs to hand off to a human or a phone number, which
 * is the correct outcome regardless.
 *
 * If a write tool is ever added it needs, at minimum: explicit per-firm
 * opt-in, rate limiting, a captcha or proof-of-human step, `readOnlyHint:
 * false`, and sign-off from the firm. Do not add one to the template.
 */

import type { ModelContextTool } from './webmcp'

async function getJSON(path: string): Promise<unknown> {
  const res = await fetch(path, { headers: { accept: 'application/json' } })
  if (!res.ok) {
    // Returned rather than thrown: an agent gets a usable explanation instead
    // of an opaque rejection it cannot report to the person who asked.
    return { error: `Request failed with status ${res.status}`, path }
  }
  return res.json()
}

function qs(params: Record<string, unknown>): string {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue
    sp.set(k, String(v))
  }
  const s = sp.toString()
  return s ? `?${s}` : ''
}

/** Slugs come from the agent, so they are untrusted path input. */
function safeSlug(value: unknown): string {
  return encodeURIComponent(String(value ?? '').trim())
}

export const agentTools: ModelContextTool[] = [
  {
    name: 'get_podcast_info',
    title: 'About this podcast',
    description:
      'Get this podcast\'s name, tagline, description, host, the law firm behind it with its phone number and address, how many episodes exist, the list of topics covered, and where to subscribe. Call this first to understand what the show is about.',
    annotations: { readOnlyHint: true },
    inputSchema: { type: 'object', properties: {} },
    execute: async () => getJSON('/api/agent/podcast'),
  },
  {
    name: 'list_episodes',
    title: 'List episodes',
    description:
      'List this podcast\'s episodes, newest first, with number, title, description, date, duration, topic and page URL. Optionally filter by topic. Returns summaries without transcripts; use get_episode_transcript for the full text of one episode.',
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: 'object',
      properties: {
        topic: { type: 'string', description: 'Only return episodes with this exact topic. Use get_podcast_info to see valid topics.' },
        limit: { type: 'number', description: 'How many episodes to return (default 50, maximum 200).' },
        offset: { type: 'number', description: 'How many episodes to skip, for paging through a long back catalogue.' },
      },
    },
    execute: async ({ topic, limit, offset }) => getJSON(`/api/agent/episodes${qs({ topic, limit, offset })}`),
  },
  {
    name: 'search_episodes',
    title: 'Search episodes',
    description:
      'Find episodes matching a search term. Matches against episode titles, subtitles, descriptions, topics and key concepts — it does NOT search inside transcripts. Use this to answer questions like "has this show covered truck accidents?".',
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'The words to search for, e.g. "wrongful death" or "insurance adjuster".' },
        limit: { type: 'number', description: 'How many matches to return (default 50, maximum 200).' },
        offset: { type: 'number', description: 'How many matches to skip, for paging.' },
      },
      required: ['query'],
    },
    execute: async ({ query, limit, offset }) => getJSON(`/api/agent/episodes${qs({ q: query, limit, offset })}`),
  },
  {
    name: 'get_episode',
    title: 'Get one episode',
    description:
      'Get the full details of a single episode by its slug or its episode number, including the audio file URL, the YouTube URL, its chapter list, and whether a transcript is available.',
    annotations: { readOnlyHint: true },
    inputSchema: {
      type: 'object',
      properties: {
        episode: { type: 'string', description: 'The episode slug (from list_episodes) or its episode number.' },
      },
      required: ['episode'],
    },
    execute: async ({ episode }) => getJSON(`/api/agent/episodes/${safeSlug(episode)}`),
  },
  {
    name: 'get_episode_transcript',
    title: 'Get an episode transcript',
    description:
      'Get the spoken transcript of one episode as timestamped segments with speaker names. Long transcripts are paginated — check the "hasMore" field in the response and call again with a higher offset to read the rest.',
    // The transcript is machine-transcribed speech from guests and callers.
    // It is content this site does not author, so an agent should read it as
    // data and never as instructions addressed to it.
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    inputSchema: {
      type: 'object',
      properties: {
        episode: { type: 'string', description: 'The episode slug (from list_episodes) or its episode number.' },
        limit: { type: 'number', description: 'How many segments to return (default 200, maximum 1000).' },
        offset: { type: 'number', description: 'How many segments to skip, for reading a long transcript in pages.' },
      },
      required: ['episode'],
    },
    execute: async ({ episode, limit, offset }) =>
      getJSON(`/api/agent/episodes/${safeSlug(episode)}/transcript${qs({ limit, offset })}`),
  },
]
