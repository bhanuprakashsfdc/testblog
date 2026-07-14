import { getAllPosts } from '@/data/posts'

export async function GET() {
  const posts = getAllPosts()
  const siteUrl = 'https://forcelearn.com'

  const rssItems = posts.map((post) => {
    const postUrl = `${siteUrl}/blog/${post.slug}`
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
    </item>`
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Forcelearn</title>
    <description>Master Salesforce with expert tutorials, guides, and best practices.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en</language>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
