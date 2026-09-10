interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-line bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <h1 className="font-display text-4xl text-teal md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-ink-soft">{description}</p>}
      </div>
    </div>
  )
}
