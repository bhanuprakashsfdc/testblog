export function AdZone({ placement }: { placement: 'banner' | 'sidebar' | 'in-article' | 'newsletter' }) {
  const labels: Record<string, string> = {
    banner: 'Banner Ad',
    sidebar: 'Sidebar Ad',
    'in-article': 'In-Article Ad',
    newsletter: 'Newsletter Sponsor',
  }

  return (
    <div className="w-full">
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-center">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {labels[placement]} Placement
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Ad unit: {placement}
        </p>
      </div>
    </div>
  )
}
