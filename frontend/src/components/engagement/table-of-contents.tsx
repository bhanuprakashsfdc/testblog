'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = content
      .split('\n')
      .filter((line) => line.startsWith('## ') || line.startsWith('### '))
      .map((line) => {
        const level = line.startsWith('### ') ? 3 : 2
        const text = line.replace(/^#{2,3}\s+/, '')
        const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')
        return { id, text, level }
      })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -80% 0%' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [content])

  const headings = content
    .split('\n')
    .filter((line) => line.startsWith('## ') || line.startsWith('### '))
    .map((line) => {
      const level = line.startsWith('### ') ? 3 : 2
      const text = line.replace(/^#{2,3}\s+/, '')
      const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')
      return { id, text, level }
    })

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block w-64 shrink-0">
      <div className="sticky top-24">
        <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">On this page</h4>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                'block text-sm transition-colors',
                heading.level === 3 ? 'pl-4' : 'pl-0',
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
