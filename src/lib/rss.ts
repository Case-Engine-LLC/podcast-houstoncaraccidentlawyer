import { XMLParser } from 'fast-xml-parser'

export interface RSSEpisode {
  id: number
  guid: string
  title: string
  subtitle: string
  description: string
  date: string
  rawDate: string
  duration: string
  audioUrl: string
  audioType: string
  imageUrl: string | null
  topic: string
  concepts: string[]
  category: string
  featured: boolean
  chapters: string[]
  logo: string
  transcriptUrl: string | null
  transcriptType: string | null
}

export interface RSSChannel {
  title: string
  description: string
  imageUrl: string | null
}

export interface PodcastFeed {
  channel: RSSChannel
  episodes: RSSEpisode[]
}

export interface TranscriptSegment {
  timestamp: string
  speaker: string
  text: string
}

export interface RSSChapter {
  title: string
  startTime: number
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name) => ['item', 'podcast:transcript', 'podcast:chapters', 'itunes:keyword'].includes(name),
})

function getAttr(node: Record<string, unknown>, attr: string): string {
  return (node?.[`@_${attr}`] as string) ?? ''
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const yy = String(d.getFullYear()).slice(-2)
    return `${mm}.${dd}.${yy}`
  } catch {
    return dateStr
  }
}

function parseKeywords(kw: unknown): string[] {
  if (!kw) return []
  if (typeof kw === 'string') return kw.split(',').map(s => s.trim()).filter(Boolean)
  if (Array.isArray(kw)) return kw.map(String).filter(Boolean)
  return []
}

function parseDuration(dur: unknown): string {
  if (!dur) return '00:00'
  const s = String(dur)
  // If already HH:MM:SS or MM:SS format
  if (s.includes(':')) return s
  // If numeric seconds
  const totalSeconds = parseInt(s, 10)
  if (isNaN(totalSeconds)) return s
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const sec = totalSeconds % 60
  if (h > 0) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export async function fetchPodcastFeed(rssUrl: string): Promise<PodcastFeed> {
  const res = await fetch(rssUrl, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`)

  const xml = await res.text()
  const parsed = parser.parse(xml)
  const channel = parsed?.rss?.channel

  if (!channel) throw new Error('Invalid RSS: no channel element')

  const channelInfo: RSSChannel = {
    title: channel.title ?? '',
    description: channel.description ?? '',
    imageUrl: channel['itunes:image']?.['@_href']
      ?? channel.image?.url
      ?? null,
  }

  const items = channel.item ?? []
  const episodes: RSSEpisode[] = items.map((item: Record<string, unknown>, index: number) => {
    const enclosure = item.enclosure as Record<string, unknown> | undefined
    const itunesImage = item['itunes:image'] as Record<string, unknown> | undefined
    const keywords = parseKeywords(item['itunes:keywords'])
    const pubDate = String(item.pubDate ?? '')

    // Find transcript
    const transcripts = (item['podcast:transcript'] ?? []) as Record<string, unknown>[]
    const transcript = transcripts[0]
    const transcriptUrl = transcript ? getAttr(transcript, 'url') : null
    const transcriptType = transcript ? getAttr(transcript, 'type') : null

    // Episode number: prefer itunes:episode, fall back to index
    const itunesEpisode = item['itunes:episode']
    const episodeNum = itunesEpisode ? Number(itunesEpisode) : items.length - index

    return {
      id: episodeNum,
      guid: String(item.guid ?? item.link ?? `ep-${episodeNum}`),
      title: String(item.title ?? ''),
      subtitle: String(item['itunes:subtitle'] ?? item['itunes:summary'] ?? '').slice(0, 120),
      description: String(item.description ?? item['content:encoded'] ?? '').replace(/<[^>]*>/g, ''),
      date: formatDate(pubDate),
      rawDate: pubDate ? new Date(pubDate).toISOString() : '',
      duration: parseDuration(item['itunes:duration']),
      audioUrl: enclosure ? getAttr(enclosure, 'url') : '',
      audioType: enclosure ? getAttr(enclosure, 'type') : 'audio/mpeg',
      imageUrl: itunesImage ? getAttr(itunesImage, 'href') : channelInfo.imageUrl,
      topic: keywords[0] ?? '',
      concepts: keywords,
      category: String(item['itunes:category'] ?? 'Personal Injury'),
      featured: index === 0,
      chapters: [],
      logo: itunesImage ? getAttr(itunesImage, 'href') : channelInfo.imageUrl ?? '',
      transcriptUrl,
      transcriptType,
    }
  })

  // Sort by date descending (newest first)
  episodes.sort((a, b) => {
    if (!a.rawDate || !b.rawDate) return 0
    return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
  })

  return { channel: channelInfo, episodes }
}

export async function fetchTranscript(url: string, type: string): Promise<TranscriptSegment[]> {
  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const text = await res.text()

    if (type.includes('vtt') || url.endsWith('.vtt')) {
      return parseVTT(text)
    }
    if (type.includes('srt') || url.endsWith('.srt')) {
      return parseSRT(text)
    }
    return []
  } catch {
    return []
  }
}

function parseVTT(text: string): TranscriptSegment[] {
  const segments: TranscriptSegment[] = []
  const blocks = text.split(/\n\n+/)
  for (const block of blocks) {
    const lines = block.trim().split('\n')
    const timeLine = lines.find(l => l.includes('-->'))
    if (!timeLine) continue
    const timestamp = timeLine.split('-->')[0].trim().replace(/\.\d+$/, '')
    const textLines = lines.slice(lines.indexOf(timeLine) + 1)
    const content = textLines.join(' ').trim()
    if (!content) continue

    // Try to extract speaker from "Speaker: text" pattern
    const speakerMatch = content.match(/^<v\s+([^>]+)>(.*)$|^([^:]+):\s*(.+)$/)
    if (speakerMatch) {
      const speaker = (speakerMatch[1] ?? speakerMatch[3] ?? '').trim()
      const spText = (speakerMatch[2] ?? speakerMatch[4] ?? '').replace(/<[^>]*>/g, '').trim()
      segments.push({ timestamp, speaker, text: spText })
    } else {
      segments.push({ timestamp, speaker: '', text: content.replace(/<[^>]*>/g, '') })
    }
  }
  return segments
}

function parseSRT(text: string): TranscriptSegment[] {
  const segments: TranscriptSegment[] = []
  const blocks = text.split(/\n\n+/)
  for (const block of blocks) {
    const lines = block.trim().split('\n')
    if (lines.length < 3) continue
    const timeLine = lines[1]
    const timestamp = timeLine.split('-->')[0].trim().replace(',', '.').replace(/\.\d+$/, '')
    const content = lines.slice(2).join(' ').trim()
    if (!content) continue
    segments.push({ timestamp, speaker: '', text: content })
  }
  return segments
}

export async function fetchChapters(url: string): Promise<RSSChapter[]> {
  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    const chapters = data.chapters ?? data
    if (!Array.isArray(chapters)) return []
    return chapters.map((ch: Record<string, unknown>) => ({
      title: String(ch.title ?? ''),
      startTime: Number(ch.startTime ?? ch.start ?? 0),
    }))
  } catch {
    return []
  }
}
