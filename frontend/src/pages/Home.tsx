import { useEffect, useState } from 'react'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '../components/ui/Section'
import { ContactSupport } from '../components/home/ContactSupport'
import { ProductShowcase } from '../components/home/ProductShowcase'
import { SyariahCalculator } from '../features/SyariahCalculator'
import { useBerita } from '../hooks/useBerita'

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
    alt: 'Nasabah melakukan transaksi di layanan perbankan',
  },
  {
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',
    alt: 'Tim berdiskusi dalam suasana kerja kolaboratif',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85',
    alt: 'Ruang kerja yang terang dan nyaman',
  },
  {
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
    alt: 'Sekelompok orang tersenyum bersama',
  },
  {
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
    alt: 'Pertemuan tim untuk merencanakan masa depan',
  },
]

export function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  const [halamanBerita, setHalamanBerita] = useState(1)
  const { berita, isLoading, error } = useBerita(100)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length)
  }

  const kategoriBerita = Array.from(new Set(berita.flatMap((item) => item.kategori ?? []))).sort((a, b) => a.localeCompare(b, 'id'))
  const beritaTerfilter = kategoriAktif === 'Semua' ? berita : berita.filter((item) => item.kategori?.includes(kategoriAktif))
  const jumlahHalamanBerita = Math.max(1, Math.ceil(beritaTerfilter.length / 6))
  const halamanAktif = Math.min(halamanBerita, jumlahHalamanBerita)
  const beritaTampil = beritaTerfilter.slice((halamanAktif - 1) * 6, halamanAktif * 6)

  const pilihKategori = (kategori: string) => {
    setKategoriAktif(kategori)
    setHalamanBerita(1)
  }

  return (
    <>
      <div className="relative w-full overflow-hidden border-b border-line bg-white">
        <div className="relative h-[min(72vh,620px)] min-h-[360px] w-full bg-teal">
              {heroSlides.map((slide, index) => (
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.alt}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    index === activeSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden={index !== activeSlide}
                />
              ))}
              <div className="absolute inset-x-0 bottom-6 flex items-center justify-between px-6 md:px-10">
                <div className="flex gap-2" aria-label="Pilih gambar slider">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.image}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === activeSlide ? 'w-8 bg-gold' : 'w-2 bg-teal/30 hover:bg-teal/60'
                    }`}
                    aria-label={`Tampilkan gambar ${index + 1}`}
                    aria-current={index === activeSlide ? 'true' : undefined}
                  />
                ))}
                </div>
                <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goToSlide(activeSlide - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-sm border border-teal text-lg text-teal transition-colors hover:bg-teal hover:text-canvas"
                  aria-label="Gambar sebelumnya"
                >
                  &#8592;
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(activeSlide + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-sm border border-teal text-lg text-teal transition-colors hover:bg-teal hover:text-canvas"
                  aria-label="Gambar berikutnya"
                >
                  &#8594;
                </button>
                </div>
              </div>
        </div>
      </div>

      <ContactSupport />

      <ProductShowcase />

      <Section tone="sand">
        <SyariahCalculator />
      </Section>

      <Section tone="canvas">
        <div className="flex flex-col gap-5 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal/60">Jelajahi kabar kami</p>
            <h2 className="mt-2 font-display text-3xl text-teal">Berita terkini</h2>
          </div>
          <Link to="/informasi/berita" className="text-sm text-teal hover:text-gold">
            Semua berita
          </Link>
        </div>
        <div className="mt-6 flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Filter kategori berita">
          {['Semua', ...kategoriBerita].map((kategori) => (
            <button
              key={kategori}
              type="button"
              onClick={() => pilihKategori(kategori)}
              aria-pressed={kategoriAktif === kategori}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${kategoriAktif === kategori ? 'border-teal bg-teal text-white' : 'border-line bg-white text-ink-soft hover:border-teal hover:text-teal'}`}
            >
              {kategori}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beritaTampil.map((b) => (
            <Link key={b.slug} to={`/informasi/berita/${b.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/10">
              {b.gambar ? (
                <img src={b.gambar} alt={b.gambarAlt || b.judul} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-sand px-6 text-center text-sm font-bold text-teal/60">BPRS HIK Jawa Tengah</div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-2">
                  {(b.kategori ?? []).slice(0, 2).map((kategori) => (
                    <span key={kategori} className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-teal">{kategori}</span>
                  ))}
                </div>
                <p className="mt-4 text-xs font-semibold text-ink-soft">{b.tanggal}</p>
                <h3 className="mt-2 font-display text-xl leading-tight text-ink transition-colors group-hover:text-teal">{b.judul}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-soft">{b.ringkasan}</p>
                <span className="mt-5 text-sm font-bold text-teal">Baca selengkapnya <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">-&gt;</span></span>
              </div>
            </Link>
          ))}
        </div>
        {isLoading && <p className="mt-6 text-sm text-ink-soft">Memuat berita terbaru...</p>}
        {error && <p className="mt-6 text-sm text-ink-soft">{error}</p>}
        {!isLoading && beritaTampil.length === 0 && <p className="mt-8 text-sm text-ink-soft">Belum ada berita pada kategori ini.</p>}
        {jumlahHalamanBerita > 1 && (
          <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination berita terkini">
            <button type="button" onClick={() => setHalamanBerita(Math.max(1, halamanAktif - 1))} disabled={halamanAktif === 1} className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-2 text-sm font-bold text-teal transition-colors hover:border-teal disabled:cursor-not-allowed disabled:opacity-40" aria-label="Ke berita sebelumnya">
              <ChevronsLeft size={16} aria-hidden="true" /><span className="hidden sm:inline">Sebelumnya</span>
            </button>
            {Array.from({ length: jumlahHalamanBerita }, (_, index) => index + 1).map((nomor) => (
              <button key={nomor} type="button" onClick={() => setHalamanBerita(nomor)} aria-current={halamanAktif === nomor ? 'page' : undefined} className={`h-9 min-w-9 rounded-md px-2 text-sm font-bold transition-colors ${halamanAktif === nomor ? 'bg-teal text-white' : 'border border-line text-teal hover:border-teal'}`}>
                {nomor}
              </button>
            ))}
            <button type="button" onClick={() => setHalamanBerita(Math.min(jumlahHalamanBerita, halamanAktif + 1))} disabled={halamanAktif === jumlahHalamanBerita} className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-2 text-sm font-bold text-teal transition-colors hover:border-teal disabled:cursor-not-allowed disabled:opacity-40" aria-label="Ke berita berikutnya">
              <span className="hidden sm:inline">Berikutnya</span><ChevronsRight size={16} aria-hidden="true" />
            </button>
          </nav>
        )}
      </Section>
    </>
  )
}
