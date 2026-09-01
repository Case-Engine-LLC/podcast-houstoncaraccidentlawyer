'use client'

import Script from 'next/script'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { useEffect } from 'react'

/**
 * Unified, env-driven analytics bundle for the site fleet.
 *
 * Best-practice loaders:
 *   - GTM + GA4 via the official @next/third-parties/google components
 *     (correct script strategy, dataLayer, and GTM <noscript> handled for us).
 *   - Meta/Facebook Pixel via next/script (no official package exists).
 *   - Microsoft Clarity via the official @microsoft/clarity package.
 *
 * Every tracker is a no-op unless its NEXT_PUBLIC_* var is set on the
 * deployment, so this is safe to ship to every site and light up per-site by
 * setting the relevant Vercel env var. IDs map 1:1 to Supabase
 * `client_integrations` columns:
 *
 *   NEXT_PUBLIC_GTM_ID             -> gtm_container_id     (e.g. GTM-XXXXXXX)
 *   NEXT_PUBLIC_GA4_MEASUREMENT_ID -> ga4_measurement_id   (e.g. G-XXXXXXXXXX)
 *   NEXT_PUBLIC_FB_PIXEL_ID        -> facebook_pixel_id     (numeric)
 *   NEXT_PUBLIC_CLARITY_PROJECT_ID -> microsoft_clarity_id  (e.g. gujq334he8)
 *
 * Mounted once in the root layout, mirroring the MarkerWidget pattern. IDs
 * default to the NEXT_PUBLIC_* env vars but can be passed as props for sites
 * where the value is known and committed (matches the inline-fallback pattern
 * already used for Marker.io on some sites).
 */

type AnalyticsProps = {
  gtmId?: string
  ga4Id?: string
  fbPixelId?: string
  clarityProjectId?: string
}

export function Analytics({
  gtmId = process.env.NEXT_PUBLIC_GTM_ID,
  ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
}: AnalyticsProps = {}) {
  const GTM_ID = gtmId
  const GA4_ID = ga4Id
  const FB_PIXEL_ID = fbPixelId

  // Microsoft Clarity — official package, browser-only.
  useEffect(() => {
    if (!clarityProjectId) return
    let cancelled = false
    import('@microsoft/clarity').then((mod) => {
      if (cancelled) return
      try {
        mod.default.init(clarityProjectId)
      } catch (e) {
        console.error('Clarity init failed:', e)
      }
    })
    return () => {
      cancelled = true
    }
  }, [clarityProjectId])

  return (
    <>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      {GA4_ID && <GoogleAnalytics gaId={GA4_ID} />}

      {FB_PIXEL_ID && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${FB_PIXEL_ID}');fbq('track', 'PageView');`}
        </Script>
      )}
      {FB_PIXEL_ID && (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
    </>
  )
}
