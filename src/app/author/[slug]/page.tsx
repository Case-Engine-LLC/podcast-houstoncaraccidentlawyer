import { Metadata } from 'next'
import V2AuthorPage from '@/themes/v2/pages/V2AuthorPage'
import { authorProfiles, siteConfig } from '@/data/siteData'

export async function generateStaticParams() {
  return Object.keys(authorProfiles).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const author = authorProfiles[slug]
  if (!author) return { title: 'Author Not Found' }

  return {
    title: `${author.name} — ${author.title} | ${siteConfig.podcastName}`,
    description: author.bio[0],
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <V2AuthorPage slug={slug} />
}
