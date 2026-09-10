import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { Section } from '../../components/ui/Section'
import { beritaTerkini } from '../../data/berita'

export function BeritaDetail() {
  const { slug } = useParams()
  const berita = beritaTerkini.find((b) => b.slug === slug)

  return (
    <>
      <PageHeader title={berita?.judul ?? 'Berita tidak ditemukan'} description={berita?.tanggal} />
      <Section tone="canvas">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
          {berita?.ringkasan ?? 'Berita yang Anda cari tidak tersedia.'}
        </p>
        <Link to="/informasi/berita" className="mt-8 inline-block text-sm text-teal hover:text-gold">
          Kembali ke daftar berita
        </Link>
      </Section>
    </>
  )
}
