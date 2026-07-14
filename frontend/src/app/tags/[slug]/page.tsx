import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllPosts, getPostsByTag } from '@/data/posts'
import { PostCard } from '@/components/post-card'
import { JsonLd } from '@/components/seo/json-ld'

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).map((tag) => ({
    slug: tag,
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const posts = getPostsByTag(slug)
  const tagName = slug.replace(/-/g, ' ')

  return {
    title: `#${tagName}`,
    description: `Articles tagged with ${tagName}.`,
    alternates: {
      canonical: `https://forcelearn.com/tags/${slug}`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const posts = getPostsByTag(slug)
  const tagName = slug.replace(/-/g, ' ')

  return (
    <div className="animate-in fade-in duration-500">
      <JsonLd
        type="ItemList"
        data={{
          itemListElement: posts.slice(0, 10).map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://forcelearn.com/blog/${post.slug}`,
          })),
        }}
      />

      <div className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            #{tagName}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {posts.length} article{posts.length !== 1 ? 's' : ''} tagged with {tagName}.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No articles found with this tag.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
