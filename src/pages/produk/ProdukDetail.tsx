import { useParams } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { Section } from '../../components/ui/Section'
import { ringkasanProduk } from '../../data/produk'

const salinanKhusus: Record<string, string> = {
  'riplay-produk':
    'Ringkasan Informasi Produk dan Layanan (RIPLAY) sesuai ketentuan Otoritas Jasa Keuangan.',
}

export function ProdukDetail() {
  const { slug = '' } = useParams()
  const produk = ringkasanProduk.find((p) => p.slug === slug)
  const title = produk?.nama ?? 'RIPLAY produk'
  const description = produk?.deskripsi ?? salinanKhusus[slug]

  return (
    <>
      <PageHeader title={title} description={description} />
      <Section tone="canvas">
        {produk && (
          <p className="text-xs uppercase tracking-wide text-gold">{produk.akad}</p>
        )}
        <p className="mt-4 max-w-2xl text-sm text-ink-soft">
          Detail syarat, ketentuan, dan simulasi produk ini akan ditampilkan di sini.
        </p>
      </Section>
    </>
  )
}
