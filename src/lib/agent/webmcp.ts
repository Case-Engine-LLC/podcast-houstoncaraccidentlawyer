/**
 * Minimal WebMCP typings + registration helper.
 *
 * WebMCP lets a page hand an AI agent a set of callable tools instead of
 * leaving it to infer intent from the DOM. Spec:
 * https://webmachinelearning.github.io/webmcp
 *
 * STATUS, so nobody mistakes this for a stable platform API: as of
 * 2026-08-30 the spec is a W3C Community Group DRAFT (published 2026-08-26) —
 * NOT a W3C Standard and not on the standards track. Real support is
 * ChatGPT Desktop, plus origin trials in Chrome 149 and Edge 150. Firefox and
 * Safari have no implementation. The API is documented as subject to change.
 *
 * Consequences for how this file is written:
 *
 *   - We declare our own types rather than depending on @mcp-b/webmcp-types.
 *     A four-day-old draft is not something to take a runtime dependency on,
 *     and the surface we use is small enough to type by hand.
 *   - We do NOT ship a polyfill. A polyfill supplies the API surface but not a
 *     consumer; with no agent on the other end it is bundle weight that does
 *     nothing. Sites that want one can add @mcp-b/webmcp-polyfill themselves.
 *   - Everything is feature-detected. On the overwhelming majority of browsers
 *     `document.modelContext` is undefined, registration no-ops, and the page
 *     is untouched.
 *
 * The tools themselves are thin: each one fetches a same-origin /api/agent/*
 * endpoint. That endpoint is the real interface and works for any agent or
 * crawler today, WebMCP support or not. If this spec dies, delete the
 * registration and the JSON API still stands on its own.
 */

/** JSON Schema subset we use to describe tool inputs. */
export type ToolInputSchema = {
  type: 'object'
  properties?: Record<string, unknown>
  required?: string[]
}

export type ToolAnnotations = {
  /**
   * Declares the tool has no side effects. Every tool in this template sets
   * this true — the whole set is read-only by design. See the note on write
   * actions in src/lib/agent/tools.ts.
   */
  readOnlyHint?: boolean
  /**
   * Declares the tool returns content this site does not fully control, so an
   * agent should treat it as data rather than instructions. Transcripts are
   * speech transcribed by a third-party service; that is exactly the category.
   */
  untrustedContentHint?: boolean
}

export type ModelContextTool = {
  name: string
  description: string
  title?: string
  inputSchema?: ToolInputSchema
  annotations?: ToolAnnotations
  execute: (input: Record<string, unknown>) => Promise<unknown>
}

type ModelContext = {
  registerTool: (tool: ModelContextTool) => Promise<unknown> | unknown
}

/**
 * The spec moved this from `navigator` to `document`. A lot of the WebMCP
 * example code in circulation still writes `navigator.modelContext`, which is
 * now a deprecated alias — we read `document` first and fall back, so the
 * layer works under either a current implementation or an older polyfill.
 */
export function getModelContext(): ModelContext | null {
  if (typeof document === 'undefined') return null
  const fromDocument = (document as unknown as { modelContext?: ModelContext }).modelContext
  if (fromDocument?.registerTool) return fromDocument
  const fromNavigator =
    typeof navigator !== 'undefined'
      ? (navigator as unknown as { modelContext?: ModelContext }).modelContext
      : undefined
  return fromNavigator?.registerTool ? fromNavigator : null
}

/** True when this browser can accept tool registrations at all. */
export function isWebMCPAvailable(): boolean {
  return getModelContext() !== null
}

/**
 * Registers every tool, tolerating partial failure.
 *
 * A draft API in an origin trial can reject an individual tool — a name rule
 * tightens, an annotation is dropped — and one rejection must not take the
 * rest of the set down with it. Returns the names that registered so callers
 * can log honestly instead of assuming.
 */
export async function registerTools(tools: ModelContextTool[]): Promise<string[]> {
  const ctx = getModelContext()
  if (!ctx) return []

  const registered: string[] = []
  for (const tool of tools) {
    try {
      await ctx.registerTool(tool)
      registered.push(tool.name)
    } catch (err) {
      // Deliberately not thrown: a tool that fails to register is a missing
      // capability, not a broken page.
      console.warn(`[webmcp] tool "${tool.name}" failed to register:`, err)
    }
  }
  return registered
}
