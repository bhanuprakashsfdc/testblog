import Link from 'next/link'
import { BookOpen, TrendingUp, Github, Twitter, Linkedin } from 'lucide-react'
import { getAllPosts, getCategories } from '@/data/posts'
import { PostCard } from '@/components/post-card'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const posts = getAllPosts()
  const categories = getCategories()
  const popularPosts = posts.slice(0, 3)

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight mb-3">
              <span className="bg-primary text-primary-foreground rounded-md px-2 py-0.5 text-sm">
                Force
              </span>
              learn
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Master Salesforce with expert tutorials, guides, and best practices. From Admin basics
              to CTA exam prep, we&apos;ve got you covered.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/blog', label: 'Blog' },
                { href: '/categories', label: 'Categories' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Popular Posts</h3>
            <ul className="space-y-3">
              {popularPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors line-clamp-1"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Forcelearn. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/bhanuprakashsfdc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
