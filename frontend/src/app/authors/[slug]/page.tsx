import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Twitter, Linkedin, Github, BookOpen } from 'lucide-react'
import { getAllAuthors, getAuthorBySlug } from '@/data/authors'
import { getAllPosts } from '@/data/posts'
import { PostCard } from '@/components/post-card'
import { JsonLd } from '@/components/seo/json-ld'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = getAllAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  return {
    title: author.name,
    description: author.bio,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = getAuthorBySlug(slug)

  if (!author) {
    return <div className="text-center py-12">Author not found.</div>
  }

  const posts = getAllPosts().filter((post) => post.author === author.name)

  return (
    <div className="animate-in fade-in duration-500">
      <JsonLd
        type="Person"
        data={{
          name: author.name,
          description: author.bio,
          url: `https://forcelearn.com/authors/${author.slug}`,
          sameAs: Object.values(author.social).filter(Boolean),
          jobTitle: author.role,
          knowsAbout: author.specialties,
        }}
      />

      <div className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden shrink-0">
              <img
                src={author.avatar}
                alt={author.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                {author.name}
              </h1>
              <p className="mt-2 text-lg text-primary font-medium">{author.role}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                {author.bio}
              </p>
              <div className="mt-6 flex gap-4">
                {author.social.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>
                )}
                {author.social.linkedin && (
                  <a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
                {author.social.github && (
                  <a
                    href={author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-serif text-2xl font-bold mb-8 flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Articles by {author.name}
        </h2>
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No articles found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
