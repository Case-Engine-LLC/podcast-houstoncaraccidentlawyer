# Agent layer (WebMCP + JSON API)

Lets an AI agent visiting this site call named, read-only tools instead of
scraping the DOM and guessing.

## Status — read this before selling it to anyone

[WebMCP](https://webmachinelearning.github.io/webmcp) is a **W3C Community
Group draft** published 2026-08-26. It is **not a W3C Standard** and **not on
the standards track**.

| Surface | Support (as of 2026-08-30) |
| --- | --- |
| ChatGPT Desktop | Supported — the only production consumer |
| Chrome 149 | Origin trial (or `chrome://flags/#enable-webmcp-testing`) |
| Edge 150 | Origin trial |
| Brave Leo | Experimental |
| Firefox / Safari | No implementation |

**This is not an SEO feature.** Google does not crawl registered tools and
WebMCP is not a ranking or citation signal. Tools only run for an agent already
on the page, which means it found the site some other way. The benefit is
accuracy of extraction once an agent arrives — not discovery. Anyone promising
a firm "get cited by AI" on the strength of this is overselling it.

The `/api/agent/*` JSON endpoints are the part with value today: any agent or
crawler can read them right now, with no browser support required.

## Layout

```
src/lib/agent/
  webmcp.ts     WebMCP typings + feature-detected registration. No dependency.
  site-url.ts   Absolute origin for the URLs the API returns.
  payload.ts    Server-side payload builders — the single source of truth.
  tools.ts      Tool descriptors; thin wrappers over the endpoints below.
src/app/api/agent/
  route.ts                              GET /api/agent            discovery index
  podcast/route.ts                      GET /api/agent/podcast    show + firm + topics
  episodes/route.ts                     GET /api/agent/episodes   list/search (q, topic, limit, offset)
  episodes/[slug]/route.ts              GET .../episodes/{slug}
  episodes/[slug]/transcript/route.ts   GET .../transcript        (limit, offset)
src/components/AgentTools.tsx           'use client' — registers on mount
```

`payload.ts` reads through `src/lib/data.ts`, so an agent sees exactly the
episodes the page renders, RSS-or-static fallback included. There is no second
dataset to drift.

## Adding this to an existing site

1. Copy `src/lib/agent/` and `src/app/api/agent/`.
2. Copy `src/components/AgentTools.tsx`.
3. Render `<AgentTools />` once in `src/app/layout.tsx`.
4. Set `NEXT_PUBLIC_SITE_URL` so returned URLs are absolute and correct.
   Without it the code falls back to Vercel's env vars, then localhost.

No new dependencies. Nothing else in the site changes.

## Everything here is read-only, deliberately

Every tool sets `readOnlyHint: true`. There are no write actions, and adding
one is not a small decision — see the long note at the top of `tools.ts`. The
short version: an agent submitting case facts to a law firm can seed a
conflict-check problem, raises confidentiality and prospective-client duties,
and touches bar advertising rules. That needs the firm's counsel, not a
developer. `get_podcast_info` already gives an agent the phone number to hand
off to.

## Forward compatibility

`payload.ts` addresses episodes by `slug` when one exists and falls back to the
numeric id. `main` has no slugs today; the SEO layer (PR #6) adds them. When
that merges this layer starts emitting slugs with no edit required.

## Verifying a deployment

```bash
curl -s https://<site>/api/agent | jq
curl -s 'https://<site>/api/agent/episodes?q=truck&limit=5' | jq
curl -s https://<site>/api/agent/episodes/1/transcript?limit=3 | jq
```

Check that `site` in the manifest is the real domain and not `localhost:3000` —
that means `NEXT_PUBLIC_SITE_URL` was never set.
