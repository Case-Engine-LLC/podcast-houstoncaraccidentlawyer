'use client'

/**
 * Registers this site's WebMCP tools when a supporting agent is present.
 *
 * Mounted once from the root layout. On every browser without WebMCP — which
 * today is nearly all of them, including Firefox and Safari entirely — this
 * renders nothing, registers nothing, and costs one feature-detect.
 *
 * This component is intentionally the ONLY wiring point. Everything it needs
 * lives under src/lib/agent/, so adding the layer to an existing site is that
 * directory plus src/app/api/agent/ plus one line in the layout.
 */

import { useEffect } from 'react'
import { agentTools } from '@/lib/agent/tools'
import { registerTools } from '@/lib/agent/webmcp'

export function AgentTools() {
  useEffect(() => {
    let cancelled = false

    registerTools(agentTools)
      .then((names) => {
        // Only speak when something actually happened: an unconditional log
        // fires on every page load in every browser to say "no", which is
        // noise in a client's console.
        if (!cancelled && names.length > 0) {
          console.info(`[webmcp] registered ${names.length} tools: ${names.join(', ')}`)
        }
      })
      .catch((err) => {
        if (!cancelled) console.warn('[webmcp] registration failed:', err)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
