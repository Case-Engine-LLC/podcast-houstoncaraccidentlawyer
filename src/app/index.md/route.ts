import { buildSiteMarkdown } from '@/lib/agent/markdown'
import { REVALIDATE } from '@/lib/data'

export const revalidate = 3600

/** The show as markdown. Linked from /llms.txt. */
export async function GET() {
  const body = await buildSiteMarkdown()
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': `public, s-maxage=${REVALIDATE}, stale-while-revalidate=86400`,
    },
  })
}
