import { NextRequest, NextResponse } from 'next/server'
import { buildTranscript } from '@/lib/agent/payload'
import { REVALIDATE } from '@/lib/data'

export const revalidate = 3600

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await buildTranscript(slug, request.nextUrl.searchParams)
  if (!payload) {
    return NextResponse.json({ error: 'Episode not found', slug }, { status: 404 })
  }
  return NextResponse.json(payload, {
    headers: { 'Cache-Control': `public, s-maxage=${REVALIDATE}, stale-while-revalidate=86400` },
  })
}
