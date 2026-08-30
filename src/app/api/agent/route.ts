import { NextResponse } from 'next/server'
import { buildManifest } from '@/lib/agent/payload'
import { REVALIDATE } from '@/lib/data'

export const revalidate = 3600

/** Discovery index for the agent-readable API. See src/lib/agent/payload.ts. */
export async function GET() {
  return NextResponse.json(buildManifest(), {
    headers: { 'Cache-Control': `public, s-maxage=${REVALIDATE}, stale-while-revalidate=86400` },
  })
}
