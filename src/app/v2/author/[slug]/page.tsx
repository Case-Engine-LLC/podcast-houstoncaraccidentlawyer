import V2AuthorPage from '@/themes/v2/pages/V2AuthorPage'
import { generateAuthorSchema } from '@/themes/v1/pages/V1AuthorPage'
import { authorProfiles } from '@/data/siteData'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = authorProfiles[slug]
  const schema = author ? generateAuthorSchema(author, slug) : null

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <V2AuthorPage slug={slug} />
    </>
  )
}
