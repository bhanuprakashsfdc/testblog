'use client'

import { useState } from 'react'
import { Heart, Bookmark, Share2, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EngagementButtonsProps {
  postSlug: string
  postTitle: string
}

export function EngagementButtons({ postSlug, postTitle }: EngagementButtonsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    if (!isBookmarked) {
      bookmarks.push({ slug: postSlug, title: postTitle, date: new Date().toISOString() })
    } else {
      const index = bookmarks.findIndex((b: any) => b.slug === postSlug)
      if (index > -1) bookmarks.splice(index, 1)
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    const likes = JSON.parse(localStorage.getItem('likes') || '[]')
    if (!isLiked) {
      likes.push({ slug: postSlug, date: new Date().toISOString() })
    } else {
      const index = likes.findIndex((l: any) => l.slug === postSlug)
      if (index > -1) likes.splice(index, 1)
    }
    localStorage.setItem('likes', JSON.stringify(likes))
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const text = postTitle

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'copy':
        await navigator.clipboard.writeText(url)
        setShowShareMenu(false)
        break
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isLiked
            ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        )}
        aria-label="Like"
      >
        <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
        <span className="hidden sm:inline">Like</span>
      </button>

      <button
        onClick={handleBookmark}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isBookmarked
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        )}
        aria-label="Bookmark"
      >
        <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
        <span className="hidden sm:inline">Save</span>
      </button>

      <div className="relative">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {showShareMenu && (
          <div className="absolute bottom-full mb-2 w-40 rounded-lg border border-border bg-background shadow-lg overflow-hidden z-10">
            <button
              onClick={() => handleShare('twitter')}
              className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              Share on LinkedIn
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              Copy link
            </button>
          </div>
        )}
      </div>

      <button
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        aria-label="Comments"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Comment</span>
      </button>
    </div>
  )
}
