import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f0f0f',
          color: '#ed1c2d',
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', lineHeight: 1 }}>B</div>
        <div
          style={{
            display: 'flex',
            fontSize: 14,
            color: '#ffffff',
            opacity: 0.9,
            fontWeight: 600,
            letterSpacing: '0.18em',
            marginTop: 6,
          }}
        >
          DOMINGUEZ
        </div>
      </div>
    ),
    { ...size }
  )
}
