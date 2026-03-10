/**
 * Normalize siteData fields for compatibility between hand-crafted and
 * AI-generated siteData.ts files.
 *
 * AI may generate:
 *   - "heading" instead of "title"
 *   - "subheading" instead of "description"
 *   - highlights as {label, value} objects instead of strings
 *   - "paragraphs" instead of "bio" (array of strings)
 *   - "profileImage" instead of "photo"
 */

type AnyObj = Record<string, unknown>

/** Normalize about / subscribeCTA blocks */
export function normalizeTitledBlock(raw: AnyObj) {
  return {
    title: (raw.title || raw.heading || '') as string,
    description: (raw.description || raw.subheading || '') as string,
    highlights: (Array.isArray(raw.highlights) ? raw.highlights : []).map(
      (h: unknown) => (typeof h === 'string' ? h : `${(h as AnyObj).label}: ${(h as AnyObj).value}`)
    ) as string[],
    showReadMore: (raw.showReadMore as boolean) ?? true,
    // Pass through any extra fields
    ...Object.fromEntries(
      Object.entries(raw).filter(
        ([k]) => !['title', 'heading', 'description', 'subheading', 'highlights', 'showReadMore'].includes(k)
      )
    ),
  }
}
