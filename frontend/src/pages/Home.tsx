import { useEffect, useState } from 'react'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Section } from '../components/ui/Section'
import { ContactSupport } from '../components/home/ContactSupport'
import { PlaceholdersAndVanishInput } from '../components/home/PlaceholdersAndVanishInput'
import { ProductShowcase } from '../components/home/ProductShowcase'
import sliderBaghas from '../assets/slider/baghas sep 26.webp'
import headerAlert from '../assets/slider/header_alert.png'
import smsNotification from '../assets/slider/sms_notif_slider.png'
import { ringkasanProduk } from '../data/produk'
import { SyariahCalculator } from '../features/SyariahCalculator'
import { useBerita } from '../hooks/useBerita'

const heroSlides = Array.from({ length: 5 }, (_, index) => ({
  ...ringkasanProduk[index % ringkasanProduk.length],
  image: sliderBaghas,
  alt: 'Informasi layanan keuangan syariah HIK Jateng',
}))

const headerSlides = [
  {
    image: headerAlert,
    alt: 'Informasi dan pemberitahuan HIK Jateng',
    href: 'https://wbs.hikjateng.co.id',
    label: 'Buka kanal pelaporan fraud HIK Jateng',
  },
  {
    image: smsNotification,
    alt: 'Informasi layanan notifikasi SMS HIK Jateng',
  },
]

const searchPlaceholders = [
  'Cari produk tabungan dan pembiayaan...',
  'Temukan informasi layanan kami...',
  'Cari berita dan kabar terbaru...',
]

export function Home() {
  const navigate = useNavigate()
  const [activeHeaderSlide, setActiveHeaderSlide] = useState(0)
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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeaderSlide((current) => (current + 1) % headerSlides.length)
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
      <section className="bg-canvas px-4 py-6 sm:px-6 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="flex min-h-0 flex-col gap-4 lg:min-h-142.5">
              <div role="region" aria-label="Slider informasi" className="relative h-32 shrink-0 overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(7,59,42,0.16)]">
                {headerSlides.map((slide, index) => (
                  <div
                    key={slide.image}
                    aria-hidden={index !== activeHeaderSlide}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === activeHeaderSlide ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    {slide.href ? (
                      <a
                        href={slide.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={slide.label}
                        tabIndex={index === activeHeaderSlide ? 0 : -1}
                        className="block h-full focus-visible:outline-teal"
                      >
                        <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
                      </a>
                    ) : (
                      <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
                    )}
                  </div>
                ))}
                <div className="absolute bottom-2 right-3 flex items-center gap-1.5" aria-label="Pilih informasi">
                  {headerSlides.map((slide, index) => (
                    <button
                      key={slide.image}
                      type="button"
                      onClick={() => setActiveHeaderSlide(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === activeHeaderSlide ? 'w-5 bg-lime' : 'w-1.5 bg-white/70 hover:bg-white'
                      }`}
                      aria-label={`Tampilkan informasi ${index + 1}`}
                      aria-current={index === activeHeaderSlide ? 'true' : undefined}
                    />
                  ))}
                </div>
              </div>

              <div className="relative h-[min(52vh,400px)] min-h-70 overflow-hidden rounded-2xl bg-forest shadow-lg shadow-forest/20 lg:min-h-0 lg:flex-1">
                {heroSlides.map((slide, index) => (
                  <Link
                    key={`${slide.slug}-${index}`}
                    to={`/produk/${slide.slug}`}
                    aria-label={`Lihat produk ${slide.nama}`}
                    aria-hidden={index !== activeSlide}
                    tabIndex={index === activeSlide ? 0 : -1}
                    className={`group absolute inset-0 transition-opacity duration-700 ${
                      index === activeSlide ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                      <span className="text-white">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-lime sm:text-xs [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
                          Solusi keuangan syariah
                        </span>
                        <span className="mt-1 block truncate text-xl font-bold sm:text-3xl [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                          {slide.nama}
                        </span>
                      </span>
                    </span>
                  </Link>
                ))}
                <div className="absolute right-5 top-5 flex gap-2 sm:right-7 sm:top-7" aria-label="Pilih gambar promosi">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={`${slide.slug}-${index}`}
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === activeSlide ? 'w-7 bg-lime' : 'w-2 bg-white/65 hover:bg-white'
                      }`}
                      aria-label={`Tampilkan promosi ${index + 1}`}
                      aria-current={index === activeSlide ? 'true' : undefined}
                    />
                  ))}
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
                <img src={b.gambar} alt={b.gambarAlt || b.judul} className="aspect-16/10 w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <div className="flex aspect-16/10 items-center justify-center bg-sand px-6 text-center text-sm font-bold text-teal/60">BPRS HIK Jawa Tengah</div>
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
