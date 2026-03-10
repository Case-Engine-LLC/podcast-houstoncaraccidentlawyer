/**
 * Compatibility layer for AI-generated siteData.
 *
 * Re-exports normalized versions of siteData objects that may have
 * different field names when AI-generated vs hand-crafted.
 *
 * Import from here instead of @/data/siteData for objects that have
 * known schema variations (about, subscribeCTA).
 */

import { about as rawAbout, subscribeCTA as rawSubscribeCTA } from '@/data/siteData'
import { normalizeTitledBlock } from './normalize-sitedata'

export const about = normalizeTitledBlock(rawAbout as Record<string, unknown>)
export const subscribeCTA = normalizeTitledBlock(rawSubscribeCTA as Record<string, unknown>)
