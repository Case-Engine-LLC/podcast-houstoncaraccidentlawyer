/**
 * Absolute site origin, for the URLs the agent API hands back.
 *
 * Deliberately local to src/lib/agent/ rather than imported from elsewhere:
 * this whole directory is meant to drop into a site as a unit, and the
 * template's own SITE_URL helper arrives with the SEO layer (PR #6) which is
 * not merged yet. If that lands, this can be swapped for it — the shape is the
 * same. Until then the layer must not depend on a file that may not exist in
 * the repo it is copied into.
 *
 * A relative URL is not an option here: an agent may be reading the JSON out
 * of band and has nothing to resolve it against.
 */
function normalize(raw: string): string {
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  return withProtocol.replace(/\/+$/, '')
}

export const SITE_URL: string = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return normalize(explicit)
  // Vercel supplies the deploy host but not the scheme.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return normalize(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  if (process.env.VERCEL_URL) return normalize(process.env.VERCEL_URL)
  return 'http://localhost:3000'
})()
