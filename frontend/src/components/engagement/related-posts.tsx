import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BlogPost } from '@/data/posts'
import { PostCard } from '@/components/post-card'
import { cn } from '@/lib/utils'

interface RelatedPostsProps {
  currentSlug: string
  posts: BlogPost[]
  maxPosts?: number
}

export function RelatedPosts({ currentSlug, posts, maxPosts = 3 }: RelatedPostsProps) {
  const related = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, maxPosts)

  if (related.length === 0) return null

  return (
    <section className="mt-16 pt-16 border-t border-border">
      <h2 className="font-serif text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
