import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'

interface ContentPageProps {
  title: string
  description?: string
  children?: React.ReactNode
}

/**
 * Template halaman konten generik. Dipakai untuk halaman yang kontennya
 * akan diisi dari CMS/tim konten (pengurus, sejarah, laporan, dsb).
 * Ganti children dengan konten sebenarnya per halaman.
 */
export function ContentPage({ title, description, children }: ContentPageProps) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <Section tone="canvas">
        {children ?? (
          <p className="max-w-2xl text-sm text-ink-soft">
            Konten halaman ini akan diisi. Struktur dan URL halaman sudah disiapkan agar tim konten
            tinggal mengisi materi tanpa mengubah kode.
          </p>
        )}
      </Section>
    </>
  )
}
