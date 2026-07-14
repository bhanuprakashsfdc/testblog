'use client'

import { useState } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setStatus('success')
    setEmail('')
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-8 md:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
          Stay ahead in Salesforce
        </h2>
        <p className="mt-3 text-muted-foreground">
          Get the latest Salesforce tutorials, certification tips, and best practices
          delivered to your inbox. No spam, ever.
        </p>

        {status === 'success' ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950/30 px-4 py-3 text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">Thanks for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className={cn(
                'flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm',
                'placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground',
                'hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50',
                'transition-colors'
              )}
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
