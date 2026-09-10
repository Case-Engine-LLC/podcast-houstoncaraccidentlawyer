import { buildLlmsTxt } from '@/lib/agent/markdown'
import { REVALIDATE } from '@/lib/data'

export const revalidate = 3600

/** https://llmstxt.org — the file a language model reads first. */
export async function GET() {
  const body = await buildLlmsTxt()
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': `public, s-maxage=${REVALIDATE}, stale-while-revalidate=86400`,
    },
  })
}
