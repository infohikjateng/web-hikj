import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { Section } from '../../components/ui/Section'
import { beritaTerkini } from '../../data/berita'

export function BeritaList() {
  return (
    <>
      <PageHeader
        title="Berita terkini"
        description="Kegiatan dan informasi terbaru PT BPRS HIK Jawa Tengah."
      />
      <Section tone="canvas">
        <div className="grid gap-10 md:grid-cols-2">
          {beritaTerkini.map((b) => (
            <Link key={b.slug} to={`/informasi/berita/${b.slug}`} className="group border-b border-line pb-8">
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
