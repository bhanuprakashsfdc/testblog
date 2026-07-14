import { Metadata } from 'next'
import { SearchContent } from './search-client'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search Forcelearn Salesforce tutorials, guides, and best practices.',
  alternates: {
    canonical: 'https://forcelearn.com/search',
  },
}

export default function SearchPage() {
  return <SearchContent />
}
