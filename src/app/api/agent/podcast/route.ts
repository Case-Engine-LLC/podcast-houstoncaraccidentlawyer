import { NextResponse } from 'next/server'
import { buildPodcastInfo } from '@/lib/agent/payload'
import { REVALIDATE } from '@/lib/data'

export const revalidate = 3600

export async function GET() {
  const info = await buildPodcastInfo()
  return NextResponse.json(info, {
    headers: { 'Cache-Control': `public, s-maxage=${REVALIDATE}, stale-while-revalidate=86400` },
  })
}
