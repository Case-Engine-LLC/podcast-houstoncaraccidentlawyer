import { NextResponse, type NextRequest } from 'next/server'

/**
 * Host-aware indexing guard.
 *
 * Preview/staging deployments are served from `*.vercel.app` hosts; the live
 * client domain is not. We emit `X-Robots-Tag: noindex` only on the Vercel
 * hosts, so the preview URLs we hand clients for review stay out of search
 * results while the production domain (once connected) indexes normally.
 *
 * No env flips, no post-launch toggle: connect the real domain and it indexes.
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const host = req.headers.get('host') ?? ''
  if (host.endsWith('.vercel.app')) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  return res
}

export const config = {
  // Run on everything except Next internals/static assets.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
