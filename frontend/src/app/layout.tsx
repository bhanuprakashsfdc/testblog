import { type Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Forcelearn',
    template: '%s | Forcelearn',
  },
  description: 'Master Salesforce with expert tutorials, guides, and best practices for Admins, Developers, Architects, and CTA candidates.',
  keywords: ['Salesforce', 'Salesforce Admin', 'Apex', 'LWC', 'Flow', 'Salesforce Architect', 'CTA', 'Salesforce certification', 'Forcelearn'],
  authors: [{ name: 'Forcelearn' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://forcelearn.com',
    siteName: 'Forcelearn',
    title: 'Forcelearn - Master Salesforce',
    description: 'Master Salesforce with expert tutorials, guides, and best practices for Admins, Developers, Architects, and CTA candidates.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forcelearn - Master Salesforce',
    description: 'Master Salesforce with expert tutorials, guides, and best practices for Admins, Developers, Architects, and CTA candidates.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${newsreader.variable} font-sans antialiased`}>
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
