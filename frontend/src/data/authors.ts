export interface Author {
  slug: string
  name: string
  bio: string
  avatar: string
  role: string
  specialties: string[]
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export const authors: Author[] = [
  {
    slug: 'forcelearn',
    name: 'Forcelearn',
    bio: 'Expert Salesforce content creator and certification coach. Passionate about making complex Salesforce concepts accessible to everyone.',
    avatar: 'https://ui-avatars.com/api/?name=Forcelearn&background=0D8ABC&color=fff&size=128',
    role: 'Salesforce Educator',
    specialties: ['Salesforce Admin', 'Apex Development', 'Salesforce Architect', 'CTA Preparation'],
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com/bhanuprakashsfdc',
    },
  },
]

export function getAllAuthors(): Author[] {
  return authors
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug)
}
