import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, BellRing, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Section } from '../components/ui/Section'
import { ContactSupport } from '../components/home/ContactSupport'
import { PlaceholdersAndVanishInput } from '../components/home/PlaceholdersAndVanishInput'
import { ProductShowcase } from '../components/home/ProductShowcase'
import { ringkasanProduk } from '../data/produk'
import { SyariahCalculator } from '../features/SyariahCalculator'
import { useBerita } from '../hooks/useBerita'

const heroProductImages: Record<string, { image: string; alt: string }> = {
  tabungan: {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
    alt: 'Nasabah melakukan transaksi di layanan perbankan',
  },
  pembiayaan: {
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',
    alt: 'Tim berdiskusi merencanakan pembiayaan',
  },
  deposito: {
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
    alt: 'Pertemuan untuk merencanakan masa depan',
  },
}

const heroSlides = ringkasanProduk.map((product) => ({
  ...product,
  ...heroProductImages[product.slug],
}))

const noticeSlides = [
  {
    title: 'Pemberitahuan layanan',
    description: 'Informasi gangguan atau pembaruan layanan akan ditampilkan di sini.',
  },
  {
    title: 'Pengumuman terbaru',
    description: 'Pantau halaman ini untuk mendapatkan informasi resmi dari HIK Jateng.',
  },
]

const searchPlaceholders = [
  'Cari produk tabungan dan pembiayaan...',
  'Temukan informasi layanan kami...',
  'Cari berita dan kabar terbaru...',
]

export function Home() {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeNotice, setActiveNotice] = useState(0)
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  const [halamanBerita, setHalamanBerita] = useState(1)
  const { berita, isLoading, error } = useBerita(100)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveNotice((current) => (current + 1) % noticeSlides.length)
    }, 6000)

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

  const submitSearch = (query: string) => {
    navigate(`/pencarian?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <section className="bg-white px-4 py-6 sm:px-6 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="flex min-h-0 flex-col gap-4 lg:min-h-[570px]">
              <div className="relative flex h-32 shrink-0 items-center gap-4 overflow-hidden rounded-2xl bg-sand px-4 shadow-[0_2px_8px_rgba(10,87,20,0.06)] sm:px-5">
                <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-white text-teal sm:w-28">
                  <BellRing size={30} strokeWidth={1.7} aria-hidden="true" />
                </div>
                <div key={activeNotice} className="min-w-0 flex-1 animate-[search-placeholder-in_300ms_ease-out]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal/60">
                    Informasi HIK Jateng
                  </p>
                  <h2 className="mt-1 truncate text-sm font-bold text-teal sm:text-base">
                    {noticeSlides[activeNotice].title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink-soft">
                    {noticeSlides[activeNotice].description}
                  </p>
                </div>
                <div className="absolute bottom-2 right-3 flex items-center gap-1.5">
                  {noticeSlides.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setActiveNotice(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === activeNotice ? 'w-5 bg-teal' : 'w-1.5 bg-teal/25 hover:bg-teal/50'
                      }`}
                      aria-label={`Tampilkan pemberitahuan ${index + 1}`}
                      aria-current={index === activeNotice ? 'true' : undefined}
                    />
                  ))}
                </div>
              </div>

              <div className="relative h-[min(52vh,400px)] min-h-[280px] overflow-hidden rounded-2xl bg-teal shadow-lg shadow-teal/10 lg:min-h-0 lg:flex-1">
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
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pb-4 pt-16 sm:px-6">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/75">
                        Produk perbankan syariah
                      </p>
                      <h2 className="mt-1 truncate text-xl font-bold text-white sm:text-2xl">
                        {heroSlides[activeSlide].nama}
                      </h2>
                      <p className="mt-1 line-clamp-2 max-w-lg text-xs leading-5 text-white/85 sm:text-sm">
                        {heroSlides[activeSlide].deskripsi}
                      </p>
                    </div>
                    <Link
                      to={`/produk/${heroSlides[activeSlide].slug}`}
                      className="mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-2 text-[10px] font-bold text-teal transition-colors hover:bg-sand sm:px-4 sm:text-xs"
                    >
                      Lihat
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div className="flex gap-2" aria-label="Pilih gambar promosi">
                      {heroSlides.map((slide, index) => (
                        <button
                          key={slide.slug}
                          type="button"
                          onClick={() => goToSlide(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === activeSlide ? 'w-7 bg-white' : 'w-2 bg-white/55 hover:bg-white/80'
                          }`}
                          aria-label={`Tampilkan promosi ${index + 1}`}
                          aria-current={index === activeSlide ? 'true' : undefined}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => goToSlide(activeSlide - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-teal transition-colors hover:bg-white"
                        aria-label="Promosi sebelumnya"
                      >
                        <ChevronLeft size={18} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => goToSlide(activeSlide + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-teal transition-colors hover:bg-white"
                        aria-label="Promosi berikutnya"
                      >
                        <ChevronRight size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-4">
              <PlaceholdersAndVanishInput
                placeholders={searchPlaceholders}
                onSubmit={submitSearch}
              />

              <ContactSupport compact />
              <ProductShowcase variant="compact" />
            </div>
          </div>

          <a
            href="#informasi-lanjutan"
            className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-ink-soft transition-colors hover:bg-sand hover:text-teal"
          >
            Gulir untuk informasi lainnya
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      <Section id="informasi-lanjutan" tone="sand">
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
