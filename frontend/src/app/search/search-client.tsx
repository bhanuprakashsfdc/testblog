'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { BlogPost } from '@/data/posts'
import { getAllPosts } from '@/data/posts'
import { PostCard } from '@/components/post-card'
import { cn } from '@/lib/utils'

export function SearchContent() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BlogPost[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const posts = getAllPosts()
    if (query.trim().length > 0) {
      setIsSearching(true)
      const lower = query.toLowerCase()
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lower) ||
          post.description.toLowerCase().includes(lower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lower)) ||
          post.content.toLowerCase().includes(lower)
      )
      setResults(filtered)
      setIsSearching(false)
    } else {
      setResults([])
    }
  }, [query])

  return (
    <div className="animate-in fade-in duration-500">
      <div className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Search
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Find Salesforce tutorials, guides, and best practices.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-xl border border-input bg-background pl-12 pr-4 py-4 text-lg placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {isSearching ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Searching...</p>
          </div>
        ) : query.trim().length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
            {results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your search.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try different keywords or browse our categories.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Start typing to search for Salesforce tutorials, guides, and best practices.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
