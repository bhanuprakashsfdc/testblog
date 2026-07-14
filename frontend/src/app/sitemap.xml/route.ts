import { getAllPosts, getCategories } from '@/data/posts'

export async function GET() {
  const siteUrl = 'https://forcelearn.com'
  const posts = getAllPosts()
  const categories = getCategories()

  const staticPages = [
    { url: siteUrl, priority: '1.0', changefreq: 'daily' },
    { url: `${siteUrl}/blog`, priority: '0.9', changefreq: 'daily' },
    { url: `${siteUrl}/categories`, priority: '0.8', changefreq: 'weekly' },
    { url: `${siteUrl}/about`, priority: '0.5', changefreq: 'monthly' },
  ]

  const categoryPages = categories.map((category) => ({
    url: `${siteUrl}/blog?category=${encodeURIComponent(category)}`,
    priority: '0.7',
    changefreq: 'weekly',
  }))

  const postPages = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: post.date,
  }))

  const allPages = [...staticPages, ...categoryPages, ...postPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map((page) => `
  <url>
    <loc>${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
    ${(page as any).lastmod ? `<lastmod>${(page as any).lastmod}</lastmod>` : ''}
  </url>`).join('')}
</urlset>`

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
