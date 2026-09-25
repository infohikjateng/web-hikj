import { Download } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'

const updates = [
  'Penyegaran tampilan website agar informasi lebih mudah ditemukan di desktop dan perangkat seluler.',
  'Penyempurnaan navigasi untuk mengakses informasi perusahaan, produk, berita, dan layanan bantuan.',
  'Penambahan halaman simulasi untuk membantu pengunjung membuat perhitungan awal sesuai kebutuhan.',
  'Penyusunan ulang halaman informasi dan berita agar konten lebih rapi serta nyaman dibaca.',
]

export function ReleaseNotes() {
  return (
    <>
      <PageHeader title="Informasi rilis" description="Catatan pembaruan website PT BPRS HIK Jawa Tengah." />
      <Section tone="canvas">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
          <article>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal/60">Rilis publik</p>
                <h2 className="mt-2 font-display text-3xl text-teal">Versi 1.0.0</h2>
              </div>
              <time dateTime="2026-09-25" className="text-sm font-semibold text-ink-soft">
                25 September 2026
              </time>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-2xl text-teal">Pembaruan website</h3>
              <p className="mt-3 max-w-2xl leading-7 text-ink-soft">
                Rilis ini menghadirkan pengalaman yang lebih teratur untuk menjelajahi informasi, produk,
                simulasi, dan kanal bantuan HIK Jawa Tengah.
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-ink-soft">
                {updates.map((update) => (
                  <li key={update} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    <span>{update}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="self-start border-t-2 border-gold pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal/60">Dokumen</p>
            <p className="mt-3 text-sm leading-6 text-ink-soft">Simpan ringkasan pembaruan ini untuk dibaca kembali.</p>
            <a
              href="/release-notes.txt"
              download="hikj-release-notes-v1.0.0.txt"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-teal px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-teal-light"
            >
              <Download size={17} aria-hidden="true" />
              Unduh catatan rilis
            </a>
          </aside>
        </div>
      </Section>
    </>
  )
}