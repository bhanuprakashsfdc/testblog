import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts, getPostsByCategory, getCategories } from '@/data/posts'
import { PostCard } from '@/components/post-card'
import { PostGrid } from '@/components/post-grid'
import { JsonLd } from '@/components/seo/json-ld'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Expert Salesforce tutorials, guides, and best practices for Admins, Developers, Architects, and CTA candidates.',
  alternates: {
    canonical: 'https://forcelearn.com/blog',
  },
}

export default async function BlogPage() {
  const allPosts = getAllPosts()
  const categories = getCategories()

  return (
    <div className="animate-in fade-in duration-500">
      <JsonLd
        type="ItemList"
        data={{
          itemListElement: allPosts.slice(0, 10).map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://forcelearn.com/blog/${post.slug}`,
          })),
        }}
      />

      <div className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Tutorials, guides, and best practices for Salesforce Admins, Developers, Architects, and CTA candidates.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/blog?category=${cat}`}
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm transition-colors',
                      'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    {cat}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1">
            <PostGrid posts={allPosts} />
          </div>
        </div>
      </div>
    </div>
  )
}