import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none'

const variants: Record<string, string> = {
  primary: 'bg-teal text-canvas hover:bg-teal-light',
  outline: 'border border-teal text-teal hover:bg-teal hover:text-canvas',
  ghost: 'text-teal hover:text-gold',
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
