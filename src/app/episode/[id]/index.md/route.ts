import { buildEpisodeMarkdown } from '@/lib/agent/markdown'
import { getEpisodeByIdOrSlug, REVALIDATE } from '@/lib/data'

export const revalidate = 3600

/**
 * One episode as markdown, transcript included in full.
 *
 * The rendered page is the same content wrapped in a player, navigation and
 * schema; a non-JS crawler gets the words here with nothing to strip.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const episode = await getEpisodeByIdOrSlug(id)

  if (!episode) {
    return new Response(`# Not found\n\nNo episode matches "${id}".\n`, {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    })
  }

  const body = await buildEpisodeMarkdown(episode)
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': `public, s-maxage=${REVALIDATE}, stale-while-revalidate=86400`,
    },
  })
}
