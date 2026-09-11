import { useState } from 'react'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { Section } from '../../components/ui/Section'
import { useBerita } from '../../hooks/useBerita'

const beritaPerHalaman = 6

export function BeritaList() {
  const { berita, isLoading, error } = useBerita(100)
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  const [halamanAktif, setHalamanAktif] = useState(1)

  const kategori = Array.from(new Set(berita.flatMap((item) => item.kategori ?? []))).sort((a, b) => a.localeCompare(b, 'id'))
  const beritaTerfilter = kategoriAktif === 'Semua' ? berita : berita.filter((item) => item.kategori?.includes(kategoriAktif))
  const jumlahHalaman = Math.max(1, Math.ceil(beritaTerfilter.length / beritaPerHalaman))
  const halaman = Math.min(halamanAktif, jumlahHalaman)
  const beritaHalaman = beritaTerfilter.slice((halaman - 1) * beritaPerHalaman, halaman * beritaPerHalaman)

  function pilihKategori(nama: string) {
    setKategoriAktif(nama)
    setHalamanAktif(1)
  }

  return (
    <>
      <PageHeader title="Berita terkini" description="Kegiatan dan informasi terbaru PT BPRS HIK Jawa Tengah." />
      <Section tone="canvas">
        <div className="mb-10 flex flex-col gap-5 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal/60">Jelajahi kabar kami</p>
            <h2 className="mt-2 font-display text-2xl text-teal md:text-3xl">Cerita terbaru dari HIK Jawa Tengah</h2>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Filter kategori berita">
            {['Semua', ...kategori].map((nama) => (
              <button
                key={nama}
                type="button"
                onClick={() => pilihKategori(nama)}
                aria-pressed={kategoriAktif === nama}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${kategoriAktif === nama ? 'border-teal bg-teal text-white' : 'border-line bg-white text-ink-soft hover:border-teal hover:text-teal'}`}
              >
                {nama}
              </button>
            ))}
          </div>
        </div>

        {isLoading && <p className="text-sm text-ink-soft">Memuat berita terbaru...</p>}
        {error && <p className="mb-8 text-sm text-ink-soft">{error}</p>}
        {!isLoading && beritaHalaman.length === 0 && (
          <div className="border border-dashed border-line px-6 py-12 text-center">
            <p className="font-display text-xl text-teal">Belum ada berita pada kategori ini.</p>
            <button type="button" onClick={() => pilihKategori('Semua')} className="mt-3 text-sm font-bold text-teal underline underline-offset-4">Tampilkan semua berita</button>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beritaHalaman.map((item) => (
            <Link key={item.slug} to={`/informasi/berita/${item.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/10">
              {item.gambar ? (
                <img src={item.gambar} alt={item.gambarAlt || item.judul} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-sand px-6 text-center text-sm font-bold text-teal/60">BPRS HIK Jawa Tengah</div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-2">
                  {(item.kategori ?? []).slice(0, 2).map((nama) => (
                    <span key={nama} className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-teal">{nama}</span>
                  ))}
                </div>
                <p className="mt-4 text-xs font-semibold text-ink-soft">{item.tanggal}</p>
                <h2 className="mt-2 font-display text-xl leading-tight text-ink transition-colors group-hover:text-teal">{item.judul}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-soft">{item.ringkasan}</p>
                <span className="mt-5 inline-flex items-center text-sm font-bold text-teal">Baca selengkapnya <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">-&gt;</span></span>
              </div>
            </Link>
          ))}
        </div>

        {jumlahHalaman > 1 && (
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination berita">
            <button type="button" onClick={() => setHalamanAktif(Math.max(1, halaman - 1))} disabled={halaman === 1} className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-2 text-sm font-bold text-teal transition-colors hover:border-teal disabled:cursor-not-allowed disabled:opacity-40" aria-label="Ke halaman sebelumnya">
              <ChevronsLeft size={16} aria-hidden="true" /><span className="hidden sm:inline">Sebelumnya</span>
            </button>
            {Array.from({ length: jumlahHalaman }, (_, index) => index + 1).map((nomor) => (
              <button key={nomor} type="button" onClick={() => setHalamanAktif(nomor)} aria-current={halaman === nomor ? 'page' : undefined} className={`h-9 min-w-9 rounded-md px-2 text-sm font-bold transition-colors ${halaman === nomor ? 'bg-teal text-white' : 'border border-line text-teal hover:border-teal'}`}>
                {nomor}
              </button>
            ))}
            <button type="button" onClick={() => setHalamanAktif(Math.min(jumlahHalaman, halaman + 1))} disabled={halaman === jumlahHalaman} className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-2 text-sm font-bold text-teal transition-colors hover:border-teal disabled:cursor-not-allowed disabled:opacity-40" aria-label="Ke halaman berikutnya">
              <span className="hidden sm:inline">Berikutnya</span><ChevronsRight size={16} aria-hidden="true" />
            </button>
          </nav>
        )}
      </Section>
    </>
  )
}
