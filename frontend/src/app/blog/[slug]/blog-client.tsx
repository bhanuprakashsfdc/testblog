'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Share2, Clock, Calendar, Tag } from 'lucide-react'
import { BlogPost } from '@/data/posts'
import { formatDate } from '@/data/posts'
import { getRelatedPosts } from '@/data/posts'
import { ReadingProgress } from '@/components/performance/reading-progress'
import { TableOfContents } from '@/components/engagement/table-of-contents'
import { RelatedPosts } from '@/components/engagement/related-posts'
import { EngagementButtons } from '@/components/engagement/engagement-buttons'
import { CommentSection } from '@/components/engagement/comment-section'
import { AdZone } from '@/components/monetization/ad-zone'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface BlogPostClientProps {
  post: BlogPost
  prev: BlogPost | null
  next: BlogPost | null
  allPosts: BlogPost[]
}

export function BlogPostClient({ post, prev, next, allPosts }: BlogPostClientProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const relatedPosts = getRelatedPosts(post.slug, 3)

  const renderContent = (content: string) => {
    const lines = content.trim().split('\n')
    const elements: React.ReactNode[] = []
    let inCodeBlock = false
    let codeContent: string[] = []
    let codeLanguage = ''

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${i}`}
              className="relative my-6 overflow-x-auto rounded-lg bg-muted p-4 text-sm"
            >
              <code className={codeLanguage ? `language-${codeLanguage}` : ''}>
                {codeContent.join('\n')}
              </code>
            </pre>
          )
          codeContent = []
          inCodeBlock = false
        } else {
          inCodeBlock = true
          codeLanguage = line.slice(3).trim()
        }
        continue
      }

      if (inCodeBlock) {
        codeContent.push(line)
        continue
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${i}`} id={line.slice(2).toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')} className="font-serif text-4xl font-bold mt-12 mb-4 tracking-tight">
            {line.slice(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${i}`} id={line.slice(3).toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')} className="font-serif text-3xl font-semibold mt-10 mb-4 tracking-tight">
            {line.slice(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} id={line.slice(4).toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')} className="font-serif text-2xl font-semibold mt-8 mb-3 tracking-tight">
            {line.slice(4)}
          </h3>
        )
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={`li-${i}`} className="ml-6 list-disc text-foreground/90 leading-relaxed">
            {line.slice(2)}
          </li>
        )
      } else if (line.startsWith('| ')) {
        const cells = line.split('|').filter((cell, idx, arr) => idx !== 0 && idx !== arr.length - 1)
        const isSeparator = cells.every((cell) => cell.trim().match(/^[-:]+$/))
        if (!isSeparator) {
          elements.push(
            <tr key={`tr-${i}`} className="border-b border-border/50">
              {cells.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-2 text-sm">
                  {cell.trim()}
                </td>
              ))}
            </tr>
          )
        }
      } else if (line.trim() === '') {
        elements.push(<br key={`br-${i}`} />)
      } else {
        const formattedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">$1</code>')

        elements.push(
          <p
            key={`p-${i}`}
            className="text-foreground/90 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        )
      }
    }

    return elements
  }

  return (
    <>
      {isMounted && <ReadingProgress />}

      <article className="relative">
        {post.image && (
          <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-background/95 backdrop-blur-xl p-6 md:p-10 shadow-2xl">
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  {post.tags.join(', ')}
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-balance mb-6">
                {post.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {post.description}
              </p>

              <div className="flex items-center justify-between border-t border-border pt-6">
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

                <EngagementButtons postSlug={post.slug} postTitle={post.title} />
              </div>
            </div>
          </div>

          <div className="max-w-3xl py-10">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="font-serif text-lg leading-relaxed space-y-4">
                {renderContent(post.content)}
              </div>
            </div>
            <div className="mt-8">
              <AdZone placement="in-article" />
            </div>
          </div>

          <div className="max-w-3xl pb-16">
            <CommentSection postSlug={post.slug} />
          </div>

          <div className="max-w-3xl pb-16">
            <RelatedPosts currentSlug={post.slug} posts={allPosts} />
          </div>

          <div className="max-w-3xl pb-16">
            <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <p className="text-sm font-medium">Enjoyed this article?</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Subscribe to get the latest posts delivered to your inbox.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </Link>
            </div>
          </div>

          <div className="max-w-3xl pb-16">
            <div className="flex items-center justify-between">
              <div>
                {prev && (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <div>
                      <p className="text-xs">Previous</p>
                      <p className="font-medium line-clamp-1">{prev.title}</p>
                    </div>
                  </Link>
                )}
              </div>
              <div>
                {next && (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group flex items-center gap-2 text-right text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div>
                      <p className="text-xs">Next</p>
                      <p className="font-medium line-clamp-1">{next.title}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
