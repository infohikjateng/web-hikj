import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  tone?: 'canvas' | 'sand' | 'teal'
  id?: string
}

const tones: Record<string, string> = {
  canvas: 'bg-canvas text-ink',
  sand: 'bg-sand text-ink',
  teal: 'bg-teal text-canvas',
}

export function Section({ children, className = '', tone = 'canvas', id }: SectionProps) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">{children}</div>
    </section>
  )
}
