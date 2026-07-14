import Link from 'next/link'
import { ArrowLeft, BookOpen, Award, Users, Github, Twitter } from 'lucide-react'

export const metadata = {
  title: 'About',
  description: 'Learn about Forcelearn — expert Salesforce tutorials and certification prep.',
  alternates: {
    canonical: 'https://forcelearn.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">About Forcelearn</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Master Salesforce with expert tutorials, guides, and certification preparation resources.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl">
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="font-serif text-2xl font-bold mb-4">What is Forcelearn?</h2>
              <p className="text-foreground/90 leading-relaxed">
                Forcelearn is a comprehensive Salesforce learning platform designed to help Admins, Developers,
                Architects, and CTA candidates master the Salesforce ecosystem. We provide in-depth tutorials,
                best practices, and real-world examples to accelerate your Salesforce career.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-4">
                Whether you are preparing for your first Salesforce certification or architecting enterprise
                solutions, Forcelearn delivers the content you need to succeed.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="font-serif text-2xl font-bold mb-4">What You&apos;ll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: BookOpen,
                    title: 'Salesforce Admin',
                    description: 'Master objects, validation rules, reports, security, and day-to-day administration.',
                  },
                  {
                    icon: Award,
                    title: 'Salesforce Developer',
                    description: 'Learn Apex, Lightning Web Components, integrations, and automation with Flow.',
                  },
                  {
                    icon: Users,
                    title: 'Salesforce Architect',
                    description: 'Design scalable data models, integration patterns, security architecture, and enterprise solutions.',
                  },
                  {
                    icon: BookOpen,
                    title: 'CTA Preparation',
                    description: 'Comprehensive preparation for the Certified Technical Architect exam with scenario-based learning.',
                  },
                ].map((step) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="font-serif text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Have questions, suggestions, or feedback? We would love to hear from you.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/bhanuprakashsfdc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
