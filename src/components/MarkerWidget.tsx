'use client'

import { useEffect } from 'react'

export function MarkerWidget() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_MARKER_PROJECT_ID
    if (!projectId) return

    let cancelled = false
    let widget: { unload?: () => void } | null = null

    import('@marker.io/browser').then(async (mod) => {
      if (cancelled) return
      try {
        widget = await mod.default.loadWidget({ project: projectId })
      } catch (e) {
        console.error('Marker.io load failed:', e)
      }
    })

    return () => {
      cancelled = true
      widget?.unload?.()
    }
  }, [])

  return null
}
