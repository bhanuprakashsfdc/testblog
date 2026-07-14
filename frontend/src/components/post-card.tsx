import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/data/posts'
import { formatDate } from '@/data/posts'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: BlogPost
  variant?: 'default' | 'featured'
  className?: string
}

export function PostCard({ post, variant = 'default', className }: PostCardProps) {
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-border bg-card',
        'transition-all duration-300 hover:shadow-lg hover:shadow-primary/5',
        variant === 'featured' && 'md:flex-row',
        className
      )}
    >
      {post.image && (
        <Link
          href={`/blog/${post.slug}`}
          className={cn(
            'relative overflow-hidden bg-muted',
            variant === 'featured' ? 'md:w-2/5' : 'aspect-video'
          )}
        >
          <img
            src={post.image}
            alt={post.title}
            width={800}
            height={450}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      )}

      <div className={cn('flex flex-1 flex-col justify-between p-6', variant === 'featured' && 'md:w-3/5')}>
        <div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3
              className={cn(
                'font-serif font-semibold leading-snug text-foreground group-hover:text-primary transition-colors',
                variant === 'featured' ? 'text-2xl md:text-3xl' : 'text-xl'
              )}
            >
              {post.title}
            </h3>
          </Link>

          <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-2">
            {post.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-xs text-muted-foreground">Salesforce Expert</p>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className={cn(
              'inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm'
            )}
          >
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  )
}