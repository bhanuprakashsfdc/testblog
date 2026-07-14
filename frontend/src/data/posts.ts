import { format } from 'date-fns'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  authorSlug: string
  readTime: string
  tags: string[]
  image?: string
  content: string
  views?: number
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'mastering-salesforce-objects',
    title: 'Ultimate Guide: Introduction to Salesforce Objects',
    description: 'Learn everything about Salesforce standard and custom objects, their relationships, and how to model your business data effectively.',
    date: '2026-07-10',
    author: 'Forcelearn',
    authorSlug: 'forcelearn',
    readTime: '8 min read',
    tags: ['Admin', 'Salesforce Admin', 'Data Architecture'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
    content: `
Salesforce Objects are the foundation of your CRM. Understanding how to create, configure, and relate objects is essential for every Salesforce Admin and Developer.

## Standard vs Custom Objects

Salesforce provides standard objects like Account, Contact, Lead, and Opportunity out of the box. Custom objects let you extend Salesforce to match your unique business processes.

## When to Create a Custom Object

Create a custom object when:
- You need to track data not covered by standard objects
- The data has its own lifecycle and relationships
- You need unique fields, page layouts, and business logic

## Object Relationships

Understanding relationship types is critical:

- **Lookup** — loose relationship, no cascade delete
- **Master-Detail** — tight relationship, child inherits security and cascade delete
- **External Lookup** — link to data outside Salesforce

## Best Practices

1. Keep object names clear and business-focused
2. Use appropriate relationship types based on data dependencies
3. Document custom objects for future admins
4. Consider data volume when designing object relationships

## Conclusion

Mastering Salesforce objects is the first step to building a scalable, maintainable org. Take time to plan your data model before creating custom objects.
    `,
    views: 15420,
    difficulty: 'Beginner',
  },
  {
    slug: 'mastering-validation-rules',
    title: 'Mastering How to Use Validation Rules: Step-by-Step Tutorial',
    description: 'A comprehensive tutorial on creating effective validation rules to maintain data quality in Salesforce.',
    date: '2026-07-08',
    author: 'Forcelearn',
    authorSlug: 'forcelearn',
    readTime: '6 min read',
    tags: ['Admin', 'Salesforce Admin', 'Best Practices'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
    content: `
Validation rules are one of the most powerful declarative tools in Salesforce. They help maintain data quality by preventing bad data from being saved.

## How Validation Rules Work

A validation rule evaluates an equation that must return FALSE for a record to be saved. If it returns TRUE, Salesforce blocks the save and displays an error message.

## Building Your First Validation Rule

\`\`\`formula
AND(
  ISPICKVAL(Status, 'Closed Lost'),
  Amount > 0
)
\`\`\`

This rule prevents closing an opportunity as "Lost" if it has a positive amount.

## Common Use Cases

- Ensure required fields are populated under certain conditions
- Prevent stage changes without proper documentation
- Enforce business hours for case creation
- Validate email formats and phone numbers

## Best Practices

1. Keep formulas simple and well-commented
2. Test rules in sandbox before deploying
3. Provide clear, actionable error messages
4. Consider user experience — avoid overly restrictive rules

## Conclusion

Well-designed validation rules save countless hours of data cleanup. Start with critical business rules and expand as your org matures.
    `,
    views: 12350,
    difficulty: 'Beginner',
  },
  {
    slug: 'getting-started-with-screen-flows',
    title: 'Mastering Getting Started with Screen Flows: Ultimate Guide',
    description: 'Learn how to build interactive screen flows in Salesforce Flow to guide users through complex business processes.',
    date: '2026-07-05',
    author: 'Forcelearn',
    authorSlug: 'forcelearn',
    readTime: '10 min read',
    tags: ['Flow', 'Advanced Automation', 'Salesforce Flow'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop',
    content: `
Screen flows let you build guided user experiences directly in Salesforce. From simple data collection to complex wizards, screen flows are essential for modern Salesforce automation.

## What Are Screen Flows?

Screen flows are flows that interact with users through screens, fields, and choices. They can be launched from buttons, actions, Lightning pages, or Quick Actions.

## Building Your First Screen Flow

1. Create a new Flow → Screen Flow
2. Add a Screen element with input fields
3. Add a Create Records element to save data
4. Add a Fault Path to handle errors
5. Activate and test

## Key Components

- **Screen** — displays fields and choices to users
- **Get Records** — retrieves data from Salesforce
- **Create/Update Records** — modifies data
- **Decision** — branches logic based on conditions
- **Subflow** — calls reusable child flows

## Best Practices

1. Keep screens focused — one task per screen
2. Use meaningful labels and help text
3. Add validation messages for user guidance
4. Test with real user scenarios

## Conclusion

Screen flows bridge the gap between declarative automation and user experience. Master them to build powerful, guided processes in Salesforce.
    `,
    views: 18200,
    difficulty: 'Intermediate',
  },
  {
    slug: 'understanding-apex-triggers',
    title: 'Understanding Apex Triggers and Best Practices',
    description: 'Deep dive into Apex triggers, trigger frameworks, and best practices for writing efficient, maintainable trigger code.',
    date: '2026-07-01',
    author: 'Forcelearn',
    authorSlug: 'forcelearn',
    readTime: '12 min read',
    tags: ['Developer', 'Apex Development', 'Salesforce Developer'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=630&fit=crop',
    content: `
Apex triggers execute before or after specific DML operations on Salesforce objects. They are powerful but require careful design to avoid governor limit issues and maintainable code.

## Trigger Fundamentals

Triggers fire on insert, update, delete, merge, upsert, and undelete operations. Each trigger can have up to 16 events (before/after for each operation).

## Best Practices

1. **One trigger per object** — avoid multiple triggers on the same object
2. **Logic-less triggers** — delegate to handler classes
3. **Bulkified** — always handle collections, never single records
4. **Context-aware** — use Trigger.isBefore, Trigger.isInsert, etc.

## Trigger Framework Pattern

\`\`\`apex
public class AccountTriggerHandler {
    public void beforeInsert(List<Account> newRecords) {
        // validation logic
    }
    
    public void afterInsert(List<Account> newRecords, Map<Id, Account> newMap) {
        // async processing
    }
}
\`\`\`

## Governor Limits

Triggers share governor limits with the entire transaction. Key limits:
- 100 SOQL queries
- 150 DML statements
- 10,000 CPU milliseconds

## Conclusion

Well-architected triggers are the backbone of Salesforce automation. Use frameworks, stay bulkified, and always test with large data volumes.
    `,
    views: 21500,
    difficulty: 'Advanced',
  },
  {
    slug: 'designing-scalable-data-model',
    title: 'Ultimate Guide: Designing a Scalable Salesforce Data Model',
    description: 'Learn how to design efficient, scalable data models in Salesforce that support enterprise growth.',
    date: '2026-06-28',
    author: 'Forcelearn',
    authorSlug: 'forcelearn',
    readTime: '15 min read',
    tags: ['Architect', 'Data Architecture', 'Salesforce Architect'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop',
    content: `
A well-designed data model is the foundation of any successful Salesforce implementation. Poor data modeling leads to performance issues, maintenance nightmares, and costly refactoring.

## Core Data Modeling Principles

1. **Normalize appropriately** — balance normalization with performance
2. **Choose the right relationship type** — lookup vs master-detail
3. **Plan for scale** — consider Large Data Volumes (LDV) early
4. **Document everything** — data dictionaries and ERDs

## Relationship Design

Master-detail relationships create tight coupling and roll-up summaries. Use them when:
- Child records always belong to a parent
- You need roll-up summary fields
- Child security should match parent

Lookup relationships are better for:
- Optional relationships
- Many-to-many via junction objects
- Integration with external systems

## Handling Large Data Volumes

For orgs with millions of records:
- Use skinny tables and custom indexes
- Implement archive strategies for old data
- Design efficient SOQL queries with selective filters
- Consider Big Objects for historical data

## Conclusion

Data modeling is both art and science. Invest time upfront to design models that scale with your business.
    `,
    views: 9800,
    difficulty: 'Expert',
  },
  {
    slug: 'preparing-for-cta-review-board',
    title: 'Mastering How to Prepare for the Salesforce CTA Review Board',
    description: 'Comprehensive guide to preparing for the Salesforce Certified Technical Architect review board exam.',
    date: '2026-06-25',
    author: 'Forcelearn',
    authorSlug: 'forcelearn',
    readTime: '20 min read',
    tags: ['CTA', 'CTA Preparation', 'Salesforce CTA'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop',
    content: `
The Salesforce Certified Technical Architect (CTA) review board is one of the most challenging certifications in the industry. Success requires deep technical knowledge, clear communication, and strategic preparation.

## Understanding the Format

The CTA review board is a 3-hour oral exam where you present solutions to complex, multi-cloud scenarios. Judges evaluate your architecture, design decisions, and ability to handle follow-up questions.

## Preparation Strategy

1. **Master the multi-cloud landscape** — understand how Sales, Service, Experience, and Marketing Clouds integrate
2. **Practice architecture diagrams** — learn to draw clear, scalable system landscapes under time pressure
3. **Study real scenarios** — review common CTA scenarios and practice articulating trade-offs
4. **Join study groups** — peer review and mock boards are invaluable

## Key Topics to Master

- Identity and access management (SSO, OAuth, JWT)
- Integration patterns (REST, SOAP, Pub/Sub, Platform Events)
- Data architecture and migration strategies
- Security and sharing architecture
- High availability and disaster recovery

## During the Exam

- Listen carefully to the scenario before jumping to solutions
- Ask clarifying questions
- Think aloud — show your reasoning process
- Be ready to defend your design choices

## Conclusion

CTA preparation is a journey. Combine deep technical study with extensive practice presenting your solutions.
    `,
    views: 28900,
    difficulty: 'Expert',
  },
]

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const posts = getAllPosts()
  const index = posts.findIndex((post) => post.slug === slug)

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), 'MMMM d, yyyy')
}

export function getPostsByCategory(category: string): BlogPost[] {
  const lower = category.toLowerCase()
  return blogPosts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase().includes(lower))
  )
}

export function getCategories(): string[] {
  const categories = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (['Admin', 'Developer', 'Architect', 'Flow', 'CTA', 'Integration'].includes(tag)) {
        categories.add(tag)
      }
    })
  })
  return Array.from(categories)
}

export function getPostsByTag(tag: string): BlogPost[] {
  const lower = tag.toLowerCase()
  return blogPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase().includes(lower))
  )
}

export function getRelatedPosts(currentSlug: string, maxPosts = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag))
      const score = sharedTags.length * 2 + (post.difficulty === currentPost.difficulty ? 1 : 0)
      return { ...post, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPosts)
}
