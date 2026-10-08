import { Link, useSearchParams } from 'react-router-dom'
import { Section } from '../components/ui/Section'
import { useBerita } from '../hooks/useBerita'
import { searchSiteContent } from '../lib/search'

export function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''
  const { berita, isLoading, error } = useBerita(100)
  const results = searchSiteContent(query, berita)

  return (
    <Section tone="canvas" className="min-h-[60vh]">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal/60">Pencarian situs</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-teal md:text-4xl">
          {query ? `Hasil pencarian: “${query}”` : 'Masukkan kata kunci pencarian'}
        </h1>

        {isLoading && results.length === 0 && (
          <p className="mt-6 text-sm text-ink-soft">Memuat berita untuk pencarian...</p>
        )}
        {error && <p className="mt-6 text-sm text-ink-soft">{error}</p>}

        {query && results.length > 0 && (
          <p className="mt-6 text-sm text-ink-soft">{results.length} hasil ditemukan</p>
        )}

        {results.length > 0 && (
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {results.map((result) => (
              <li key={`${result.category}-${result.href}`}>
                <Link
                  to={result.href}
                  className="block rounded-xl px-5 py-4 transition-colors hover:bg-sand/60 focus-visible:bg-sand/60"
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-teal/60">{result.category}</span>
                  <h2 className="mt-1 text-lg font-bold text-teal">{result.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-ink-soft">{result.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!isLoading && query && results.length === 0 && (
          <p className="mt-8 rounded-xl border border-line bg-sand/50 p-5 text-sm text-ink-soft">
            Belum ada hasil yang cocok. Coba kata kunci lain.
          </p>
        )}
      </div>
    </Section>
  )
}
