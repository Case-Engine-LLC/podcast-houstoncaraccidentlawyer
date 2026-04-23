/**
 * Site Data — sourced from siteData.json, edited via Case Engine webapp.
 * DO NOT hand-edit this file; edit siteData.json or the webapp instead.
 *
 * Matches the Spaulding pattern (commit 4d65542 on
 * Case-Engine-LLC/podcast-atlantacaraccidentlawyer): thin wrapper that
 * re-exports JSON with explicit TypeScript types so the webapp editor can
 * drive content updates without touching this file.
 */

import data from './siteData.json'

type AuthorProfile = {
  name: string
  slug: string
  title: string
  role: string
  photo: string
  barNumber: string
  barUrl: string
  education: { degree: string; school: string; year: string; honors?: string }[]
  admissions: { jurisdiction: string; year: string }[]
  awards: { name: string; years: string; description: string }[]
  practiceAreas: string[]
  bio: string[]
  memberships: string[]
  socialLinks: { platform: string; url: string }[]
  episodeAppearances: string
}

type Compliance = {
  jurisdiction: string
  firm: string
  responsibleAttorneys: { name: string; barNumber: string }[]
  disclaimers: { kind: string; text: string }[]
}

type Office = {
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
}

export const about = data.about
export const attorney = data.attorney
export const authorProfiles: Record<string, AuthorProfile> = data.authorProfiles as Record<string, AuthorProfile>
export const awards: { name: string; description: string }[] = data.awards as { name: string; description: string }[]
export const chapters = data.chapters
export const chaptersDescription = data.chaptersDescription
export const compliance: Compliance = data.compliance as Compliance
export const contact = data.contact
export const content = data.content
export const episode = data.episode
export const episodeLocations = data.episodeLocations
export const episodeTopics = data.episodeTopics
export const episodes = data.episodes
export const faqGroups = data.faqGroups
export const footer = data.footer
export const formConfig = data.formConfig
export const navigation = data.navigation
export const offices: Office[] = data.offices as Office[]
export const podcastTeam = data.podcastTeam
export const reviewsInstruction = data.reviewsInstruction
export const siteConfig = data.siteConfig
export const stats = data.stats
export const subscribeCTA = data.subscribeCTA
export const testimonials: { id: number; name: string; initials: string; role: string; rating: number; text: string }[] = data.testimonials as { id: number; name: string; initials: string; role: string; rating: number; text: string }[]
export const topicalEntryGrid = data.topicalEntryGrid
export const trustBadges: { id: number; title: string; tooltip: string; badge: string; href: string }[] = data.trustBadges as { id: number; title: string; tooltip: string; badge: string; href: string }[]
