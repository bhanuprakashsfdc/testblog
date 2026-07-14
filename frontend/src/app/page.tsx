import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Award, Users, ArrowRight } from 'lucide-react'
import { getAllPosts, getCategories } from '@/data/posts'
import { PostCard } from '@/components/post-card'
import { Newsletter } from '@/components/newsletter'
import { JsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Master Salesforce with expert tutorials, guides, and best practices for Admins, Developers, Architects, and CTA candidates.',
  alternates: {
    canonical: 'https://forcelearn.com',
  },
}

export default function HomePage() {
  const posts = getAllPosts()
  const categories = getCategories()
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 4)

  return (
    <div className="animate-in fade-in duration-500">
      <JsonLd
        type="WebSite"
        data={{
          name: 'Forcelearn',
          description: metadata.description as string,
          url: 'https://forcelearn.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://forcelearn.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />
        </div>

        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
              <BookOpen className="h-3.5 w-3.5" />
              Salesforce Learning Platform
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Master Salesforce,
              <br />
              <span className="text-primary">one concept at a time</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Expert tutorials, guides, and best practices for Salesforce Admins, Developers,
              Architects, and CTA candidates. From beginner basics to advanced enterprise patterns.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Start learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              title: 'Comprehensive Guides',
              description: 'In-depth tutorials covering Salesforce Admin, Apex, LWC, Flow, Integration, and Architecture topics.',
            },
            {
              icon: Award,
              title: 'Certification Prep',
              description: 'Focused content for Salesforce certifications including Admin, Developer, Architect, and CTA exam preparation.',
            },
            {
              icon: Users,
              title: 'For Every Level',
              description: 'From beginner introductions to advanced enterprise patterns, content is tailored to your experience level.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/20 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight">Latest Articles</h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">
        <Newsletter />
      </section>
    </div>
  )
}
