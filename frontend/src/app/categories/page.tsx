import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/data/posts'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse Salesforce tutorials by category — Admin, Developer, Architect, Flow, Apex, LWC, and more.',
  alternates: {
    canonical: 'https://forcelearn.com/categories',
  },
}

const categories = [
  {
    name: 'Salesforce Admin',
    slug: 'admin',
    description: 'Master Salesforce administration including objects, validation rules, reports, security, and user management.',
    count: blogPosts.filter((p) => p.tags.includes('Admin')).length,
    color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  },
  {
    name: 'Salesforce Developer',
    slug: 'developer',
    description: 'Learn Apex programming, Lightning Web Components, integrations, and automation development.',
    count: blogPosts.filter((p) => p.tags.includes('Developer')).length,
    color: 'bg-green-500/10 text-green-700 dark:text-green-300',
  },
  {
    name: 'Salesforce Architect',
    slug: 'architect',
    description: 'Design scalable Salesforce solutions including data architecture, integration patterns, and security.',
    count: blogPosts.filter((p) => p.tags.includes('Architect')).length,
    color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
  },
  {
    name: 'Salesforce Flow',
    slug: 'flow',
    description: 'Master declarative automation with Salesforce Flow — screen flows, record-triggered flows, and orchestration.',
    count: blogPosts.filter((p) => p.tags.includes('Flow')).length,
    color: 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
  },
  {
    name: 'Salesforce CTA',
    slug: 'cta',
    description: 'Prepare for the Certified Technical Architect exam with comprehensive guides and mock scenarios.',
    count: blogPosts.filter((p) => p.tags.includes('CTA')).length,
    color: 'bg-red-500/10 text-red-700 dark:text-red-300',
  },
  {
    name: 'Integration',
    slug: 'integration',
    description: 'Learn Salesforce integration patterns, APIs, and connecting Salesforce with external systems.',
    count: blogPosts.filter((p) => p.tags.includes('Integration')).length,
    color: 'bg-teal-500/10 text-teal-700 dark:text-teal-300',
  },
]

export default function CategoriesPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">Categories</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Browse tutorials by topic and find exactly what you need to level up your Salesforce skills.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog?category=${category.slug}`}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${category.color}`}>
                  {category.name}
                </div>
                <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {category.description}
              </p>
              <div className="flex items-center gap-1 text-sm font-medium text-primary">
                {category.count} articles
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}