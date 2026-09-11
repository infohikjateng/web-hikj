import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { Section } from '../../components/ui/Section'
import { useBerita } from '../../hooks/useBerita'

export function BeritaList() {
  const { berita, isLoading, error } = useBerita(100)

  return (
    <>
      <PageHeader
        title="Berita terkini"
        description="Kegiatan dan informasi terbaru PT BPRS HIK Jawa Tengah."
      />
      <Section tone="canvas">
        {isLoading && <p className="text-sm text-ink-soft">Memuat berita terbaru...</p>}
        {error && <p className="text-sm text-ink-soft">{error}</p>}
        <div className="grid gap-10 md:grid-cols-2">
          {berita.map((b) => (
            <Link key={b.slug} to={`/informasi/berita/${b.slug}`} className="group border-b border-line pb-8">
              {b.gambar && (
                <img
                  src={b.gambar}
                  alt={b.gambarAlt || b.judul}
                  className="mb-5 aspect-[16/9] w-full rounded-lg object-cover"
                />
              )}
              <p className="text-xs text-ink-soft">{b.tanggal}</p>
              <h2 className="mt-2 font-display text-2xl text-ink group-hover:text-teal">{b.judul}</h2>
              <p className="mt-2 text-sm text-ink-soft">{b.ringkasan}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
