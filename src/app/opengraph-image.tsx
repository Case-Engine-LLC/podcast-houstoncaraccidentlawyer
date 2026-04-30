import { ImageResponse } from 'next/og'
import { attorney, siteConfig } from '@/data/siteData'

export const runtime = 'edge'
export const alt = `${siteConfig.podcastName} — hosted by ${attorney.name}, ${attorney.firm}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function podcastDomain(): string {
  try {
    return new URL(siteConfig.podcastUrl).host.replace(/^www\./, '')
  } catch {
    return 'podcast-houstoncaraccidentlawyer.vercel.app'
  }
}

export default function OgImage() {
  const domain = podcastDomain()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0f0f0f',
          color: '#ffffff',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            background:
              'radial-gradient(circle at 70% 30%, rgba(237,28,45,0.35) 0%, rgba(15,15,15,0) 60%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 56,
          }}
        >
          <div
            style={{
              width: 48,
              height: 2,
              background: '#ed1c2d',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#ed1c2d',
              fontWeight: 600,
              display: 'flex',
            }}
          >
            BEN DOMINGUEZ LAW FIRM
          </div>
        </div>

        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 32,
          }}
        >
          <div style={{ display: 'flex' }}>{attorney.name}</div>
        </div>

        <div
          style={{
            fontSize: 30,
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.35,
            maxWidth: 920,
            display: 'flex',
            marginBottom: 48,
          }}
        >
          {attorney.title}. Solo-practice Houston attorney representing
          accident victims across the Greater Houston area in English and
          Spanish.
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 64,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.18)',
            fontSize: 22,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <span style={{ display: 'flex' }}>Houston, TX</span>
            <span style={{ display: 'flex', color: '#ed1c2d' }}>·</span>
            <span style={{ display: 'flex' }}>Bilingual representation</span>
            <span style={{ display: 'flex', color: '#ed1c2d' }}>·</span>
            <span style={{ display: 'flex' }}>Personal injury</span>
          </div>
          <div style={{ display: 'flex', color: '#ed1c2d', fontWeight: 600 }}>
            {domain}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
