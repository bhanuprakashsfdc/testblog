'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { BlogPost } from '@/data/posts'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface SearchModalProps {
  posts: BlogPost[]
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ posts, isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const lower = query.toLowerCase()
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.description.toLowerCase().includes(lower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lower))
    )
  }, [query, posts])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-2xl rounded-xl border border-border bg-background shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() && results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found for "{query}"
            </p>
          )}

          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={onClose}
              className={cn(
                'block rounded-lg px-4 py-3 hover:bg-accent transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <h4 className="font-medium text-sm">{post.title}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
