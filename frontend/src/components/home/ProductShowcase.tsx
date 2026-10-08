import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ringkasanProduk } from '../../data/produk'

const productImages: Record<string, { src: string; alt: string }> = {
  tabungan: {
    src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85',
    alt: 'Nasabah menggunakan layanan perbankan',
  },
  pembiayaan: {
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85',
    alt: 'Tim berdiskusi merencanakan usaha',
  },
  deposito: {
    src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85',
    alt: 'Pertemuan untuk merencanakan masa depan',
  },
}

export function ProductShowcase({ variant = 'featured' }: { variant?: 'featured' | 'compact' }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  if (variant === 'compact') {
    return (
      <section ref={sectionRef} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-teal">Produk & layanan</h2>
          </div>
          <Link to="/produk/tabungan" className="shrink-0 text-xs font-bold text-teal hover:text-teal-light">
            Jelajahi
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {ringkasanProduk.map((product) => {
            const image = productImages[product.slug]

            return (
              <Link
                key={product.slug}
                to={`/produk/${product.slug}`}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl bg-sand/45 p-2 transition-colors hover:bg-sand"
              >
                <img src={image.src} alt="" className="h-12 w-full rounded-lg object-cover sm:h-16" />
                <span className="mt-2 min-w-0">
                  <span className="block truncate pr-4 text-[11px] font-bold text-teal sm:text-sm">{product.nama}</span>
                  <span className="mt-0.5 line-clamp-2 block text-[9px] leading-3 text-ink-soft sm:text-[11px] sm:leading-4">{product.deskripsi}</span>
                </span>
                <ArrowUpRight size={14} className="absolute right-3 top-[4.1rem] text-teal/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:top-[5.1rem]" aria-hidden="true" />
              </Link>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="overflow-hidden bg-white px-4 py-16 sm:px-6 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-teal md:text-5xl">Produk & layanan</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft md:text-base">
            Pilihan layanan yang dirancang untuk membantu kebutuhan finansial pribadi, keluarga, dan usaha Anda.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ringkasanProduk.map((product, index) => {
            const image = productImages[product.slug]

            return (
              <Link
                key={product.slug}
                to={`/produk/${product.slug}`}
                className={`group relative min-h-[25rem] overflow-hidden rounded-2xl bg-teal shadow-md shadow-teal/10 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal/20 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal via-teal/65 to-teal/5" />
                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">{product.akad}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{product.nama}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">{product.deskripsi}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
