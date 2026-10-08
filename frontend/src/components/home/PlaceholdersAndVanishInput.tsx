import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'

interface PlaceholdersAndVanishInputProps {
  placeholders: string[]
  onSubmit: (query: string) => void
}

export function PlaceholdersAndVanishInput({
  placeholders,
  onSubmit,
}: PlaceholdersAndVanishInputProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const [value, setValue] = useState('')
  const [isVanishing, setIsVanishing] = useState(false)
  const submitTimeout = useRef<number | null>(null)

  useEffect(() => {
    if (placeholders.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let interval: number | null = null
    const startAnimation = () => {
      if (interval !== null) return
      interval = window.setInterval(() => {
        setCurrentPlaceholder((current) => (current + 1) % placeholders.length)
      }, 3000)
    }
    const stopAnimation = () => {
      if (interval !== null) {
        window.clearInterval(interval)
        interval = null
      }
    }
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') startAnimation()
      else stopAnimation()
    }

    startAnimation()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopAnimation()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [placeholders])

  useEffect(
    () => () => {
      if (submitTimeout.current !== null) window.clearTimeout(submitTimeout.current)
    },
    [],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = value.trim()
    if (!query || isVanishing) return

    setIsVanishing(true)
    submitTimeout.current = window.setTimeout(() => onSubmit(query), 260)
  }

  const placeholder = placeholders[currentPlaceholder] ?? 'Cari informasi...'

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="relative mx-auto flex h-14 w-full max-w-xl items-center overflow-hidden rounded-full bg-white p-1.5 shadow-[0_2px_8px_rgba(10,87,20,0.08)]"
    >
      <label className="sr-only" htmlFor="homepage-search">Cari informasi di situs</label>
      <input
        id="homepage-search"
        type="search"
        value={value}
        onChange={handleChange}
        className={`homepage-search-input relative z-10 h-full min-w-0 flex-1 origin-left bg-transparent pl-4 pr-2 text-sm text-ink outline-none transition-[opacity,transform,filter] duration-300 placeholder:text-transparent focus:ring-0 sm:pl-5 sm:text-base ${
          isVanishing ? 'scale-x-0 opacity-0 blur-sm' : ''
        }`}
        autoComplete="off"
        required
      />
      {!value && !isVanishing && (
        <span
          key={currentPlaceholder}
          aria-hidden="true"
          className="pointer-events-none absolute left-5 right-16 truncate text-sm text-ink-soft/70 animate-[search-placeholder-in_300ms_ease-out] sm:left-6 sm:text-base"
        >
          {placeholder}
        </span>
      )}
      <button
        type="submit"
        disabled={!value.trim() || isVanishing}
        aria-label="Cari"
        className="relative z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal text-white transition-[background-color,transform] duration-200 hover:bg-teal-light active:scale-95 disabled:cursor-not-allowed disabled:bg-sand-dark disabled:text-teal/40"
      >
        <ArrowRight
          size={19}
          strokeWidth={2}
          className={`transition-transform duration-300 ${isVanishing ? 'translate-x-1' : ''}`}
          aria-hidden="true"
        />
      </button>
    </form>
  )
}
