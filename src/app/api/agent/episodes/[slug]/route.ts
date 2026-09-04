import { NextResponse } from 'next/server'
import { buildEpisodeDetail } from '@/lib/agent/payload'
import { REVALIDATE } from '@/lib/data'

export const revalidate = 3600

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const episode = await buildEpisodeDetail(slug)
  if (!episode) {
    return NextResponse.json({ error: 'Episode not found', slug }, { status: 404 })
  }
  return NextResponse.json(episode, {
    headers: { 'Cache-Control': `public, s-maxage=${REVALIDATE}, stale-while-revalidate=86400` },
  })
}
