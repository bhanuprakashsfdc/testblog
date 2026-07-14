import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { formatDate, getPostBySlug, getAdjacentPosts, getAllPosts } from '@/data/posts'
import { BlogPostClient } from './blog-client'
import { JsonLd } from '@/components/seo/json-ld'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = [
    { slug: 'mastering-salesforce-objects' },
    { slug: 'mastering-validation-rules' },
    { slug: 'getting-started-with-screen-flows' },
    { slug: 'understanding-apex-triggers' },
    { slug: 'designing-scalable-data-model' },
    { slug: 'preparing-for-cta-review-board' },
  ]

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://forcelearn.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
      url: `https://forcelearn.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { prev, next } = getAdjacentPosts(slug)
  const allPosts = getAllPosts()

  return (
    <>
      <JsonLd
        type="Article"
        data={{
          headline: post.title,
          description: post.description,
          image: post.image,
          datePublished: post.date,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Forcelearn',
            logo: {
              '@type': 'ImageObject',
              url: 'https://forcelearn.com/logo.png',
            },
          },
        }}
      />
      <div className="animate-in fade-in duration-500">
        <BlogPostClient post={post} prev={prev} next={next} allPosts={allPosts} />
      </div>
    </>
  )
}
