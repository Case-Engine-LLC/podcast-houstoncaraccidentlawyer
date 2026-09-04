import { NextRequest, NextResponse } from 'next/server'
import { buildEpisodeList } from '@/lib/agent/payload'
import { REVALIDATE } from '@/lib/data'

export const revalidate = 3600

export async function GET(request: NextRequest) {
  const payload = await buildEpisodeList(request.nextUrl.searchParams)
  return NextResponse.json(payload, {
    headers: { 'Cache-Control': `public, s-maxage=${REVALIDATE}, stale-while-revalidate=86400` },
  })
}
