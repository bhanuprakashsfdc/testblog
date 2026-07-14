'use client'

import Link from 'next/link'
import { Home, BookOpen, Bookmark, User } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/blog', label: 'Learn', icon: BookOpen },
  { href: '/bookmarks', label: 'Saved', icon: Bookmark },
  { href: '/about', label: 'About', icon: User },
]

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background md:hidden" aria-label="Mobile">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
