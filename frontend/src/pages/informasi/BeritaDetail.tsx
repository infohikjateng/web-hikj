import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { Section } from '../../components/ui/Section'
import { useBerita } from '../../hooks/useBerita'

export function BeritaDetail() {
  const { slug } = useParams()
  const { berita: daftarBerita } = useBerita(100)
  const berita = daftarBerita.find((item) => item.slug === slug)

  return (
    <>
      <PageHeader title={berita?.judul ?? 'Berita tidak ditemukan'} description={berita?.tanggal} />
      <Section tone="canvas">
        {berita?.gambar && (
          <img
            src={berita.gambar}
            alt={berita.gambarAlt || berita.judul}
            className="mb-8 aspect-[16/9] w-full max-w-4xl rounded-lg object-cover"
          />
        )}
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
