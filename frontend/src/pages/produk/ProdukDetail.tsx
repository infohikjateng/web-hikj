import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Download, FileText, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Section } from '../../components/ui/Section'
import { ringkasanProduk } from '../../data/produk'

type RiplayCategory = 'Pembiayaan' | 'Tabungan' | 'Deposito'

interface RiplayDocument {
  title: string
  audience: string
  href: string
}

const riplayCategories: RiplayCategory[] = ['Pembiayaan', 'Tabungan', 'Deposito']

const riplayDocuments: Record<RiplayCategory, RiplayDocument[]> = {
  Pembiayaan: [
    {
      title: 'Pembiayaan Kolektif Pekerja Migran Indonesia',
      audience: 'Untuk pekerja migran Indonesia.',
      href: 'https://hikjateng.co.id/wp-content/uploads/2026/08/Riplay-PMI.pdf',
    },
    {
      title: 'Pembiayaan Fixed Income ASN (FI ASN)',
      audience: 'Untuk aparatur sipil negara dengan penghasilan tetap.',
      href: 'https://hikjateng.co.id/wp-content/uploads/2026/08/Riplay-Sergur-Fix.pdf',
    },
    {
      title: 'Pembiayaan Pensiunan',
      audience: 'Untuk nasabah yang telah memasuki masa pensiun.',
      href: 'https://hikjateng.co.id/wp-content/uploads/2026/08/Riplay-Pensiunan-Fix.pdf',
    },
    {
      title: 'Pembiayaan UMKM dan Umum',
      audience: 'Untuk kebutuhan usaha mikro, kecil, menengah, dan umum.',
      href: 'https://hikjateng.co.id/wp-content/uploads/2026/08/Riplay-UMUM-Fix.pdf',
    },
  ],
  Tabungan: [
    {
      title: 'Tabungan Ceria',
      audience: 'Informasi produk tabungan HIK Jateng.',
      href: 'https://hikjateng.co.id/wp-content/uploads/2026/09/Riplay-Tabungan-Ceria-23.pdf',
    },
    {
      title: 'Tabungan Hari Raya',
      audience: 'Informasi produk tabungan HIK Jateng.',
      href: 'https://hikjateng.co.id/wp-content/uploads/2026/09/Riplay-Tabungan-Hari-Raya-31.pdf',
    },
    {
      title: 'Tabungan-Ku',
      audience: 'Informasi produk tabungan HIK Jateng.',
      href: 'https://hikjateng.co.id/wp-content/uploads/2026/09/Riplay-Tabungan-Ku-2729.pdf',
    },
    {
      title: 'Tabungan Qurban',
      audience: 'Informasi produk tabungan HIK Jateng.',
      href: 'https://hikjateng.co.id/wp-content/uploads/2026/09/Riplay-Tabungan-Qurban-26.pdf',
    },
  ],
  Deposito: [
    {
      title: 'Deposito',
      audience: 'Informasi produk simpanan berjangka HIK Jateng.',
      href: 'https://hikjateng.co.id/wp-content/uploads/2026/08/Riplay-Deposito-Fix.pdf',
    },
  ],
}

const salinanKhusus: Record<string, string> = {
  'riplay-produk':
    'Ringkasan Informasi Produk dan Layanan (RIPLAY) sesuai ketentuan Otoritas Jasa Keuangan.',
}

function RiplayLibrary() {
  const [activeCategory, setActiveCategory] = useState<RiplayCategory>('Pembiayaan')
  const documents = riplayDocuments[activeCategory]

  return (
    <Section tone="canvas">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-teal">Pusat dokumen produk</p>
          <h2 className="mt-2 font-display text-2xl text-ink md:text-3xl">
            Temukan informasi produk
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Pilih kategori untuk melihat ringkasan manfaat, ketentuan, dan informasi produk
            sebelum mengajukan.
          </p>
        </div>

        <div
          className="mt-8 flex gap-2 overflow-x-auto border-b border-line"
          role="tablist"
          aria-label="Kategori RIPLAY"
        >
          {riplayCategories.map((category) => {
            const isActive = activeCategory === category

            return (
              <button
                key={category}
                id={`riplay-tab-${category.toLowerCase()}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="riplay-panel"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                  isActive
                    ? 'border-teal text-teal'
                    : 'border-transparent text-ink-soft hover:text-teal'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        <div
          id="riplay-panel"
          role="tabpanel"
          aria-labelledby={`riplay-tab-${activeCategory.toLowerCase()}`}
          className="pt-2"
        >
          {documents.length > 0 ? (
            <ul className="divide-y divide-line">
              {documents.map((document) => (
                <li
                  key={document.href}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-sand text-teal">
                      <FileText aria-hidden="true" size={19} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-6 text-ink">{document.title}</h3>
                      <p className="mt-1 text-sm leading-5 text-ink-soft">{document.audience}</p>
                      <span className="mt-2 inline-block text-xs font-medium text-ink-soft">
                        Dokumen PDF
                      </span>
                    </div>
                  </div>
                  <a
                    href={document.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Unduh RIPLAY ${document.title} dalam format PDF`}
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-teal px-4 py-2 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  >
                    <Download aria-hidden="true" size={16} />
                    Unduh PDF
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center">
              <FileText aria-hidden="true" className="mx-auto text-ink-soft" size={24} />
              <p className="mt-3 font-semibold text-ink">Dokumen belum tersedia</p>
              <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-ink-soft">
                Dokumen RIPLAY {activeCategory.toLowerCase()} belum tersedia di halaman ini.
                Silakan hubungi kantor HIK Jateng untuk informasi lebih lanjut.
              </p>
              <a
                href="/info-kami/hubungi-kami"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-semibold text-teal underline underline-offset-4 hover:text-teal-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                Hubungi kami
              </a>
            </div>
          )}
        </div>

        <aside className="mt-8 flex gap-3 border-l-4 border-teal bg-sand px-4 py-4 text-sm leading-6 text-ink-soft sm:px-5">
          <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-teal" size={19} />
          <p>
            Simpanan tabungan dan deposito dijamin oleh LPS hingga Rp2 miliar per nasabah per
            bank, sesuai ketentuan yang berlaku.
          </p>
        </aside>
      </div>
    </Section>
  )
}

export function ProdukDetail() {
  const { slug = '' } = useParams()
  const produk = ringkasanProduk.find((p) => p.slug === slug)
  const title = produk?.nama ?? 'RIPLAY produk'
  const description = produk?.deskripsi ?? salinanKhusus[slug]

  return (
    <>
      <PageHeader title={title} description={description} />
      {slug === 'riplay-produk' ? (
        <RiplayLibrary />
      ) : (
        <Section tone="canvas">
          {produk && (
            <p className="text-xs uppercase tracking-wide text-gold">{produk.akad}</p>
          )}
          <p className="mt-4 max-w-2xl text-sm text-ink-soft">
            Detail syarat, ketentuan, dan simulasi produk ini akan ditampilkan di sini.
          </p>
        </Section>
      )}
    </>
  )
}
