import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/ui/Section'
import { ContactSupport } from '../components/home/ContactSupport'
import { ProductShowcase } from '../components/home/ProductShowcase'
import { beritaTerkini } from '../data/berita'
import { SyariahCalculator } from '../features/SyariahCalculator'

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length)
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
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl text-teal">Berita terkini</h2>
          <Link to="/informasi/berita" className="text-sm text-teal hover:text-gold">
            Semua berita
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {beritaTerkini.map((b) => (
            <Link key={b.slug} to={`/informasi/berita/${b.slug}`} className="group">
              <p className="text-xs text-ink-soft">{b.tanggal}</p>
              <h3 className="mt-2 font-display text-xl text-teal group-hover:text-teal-light">{b.judul}</h3>
              <p className="mt-2 text-sm text-ink-soft">{b.ringkasan}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
