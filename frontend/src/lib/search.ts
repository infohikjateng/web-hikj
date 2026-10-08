import { primaryNav } from '../data/navigation'
import { ringkasanProduk } from '../data/produk'
import type { Berita } from '../data/berita'

export interface SiteSearchResult {
  title: string
  description: string
  href: string
  category: 'Halaman' | 'Produk & layanan' | 'Berita'
}

const additionalPages: SiteSearchResult[] = [
  {
    title: 'Simulasi',
    description: 'Hitung simulasi pembiayaan dan produk lainnya.',
    href: '/simulasi',
    category: 'Halaman',
  },
  {
    title: 'Release notes',
    description: 'Catatan pembaruan website.',
    href: '/release-notes',
    category: 'Halaman',
  },
]

function getPageResults(): SiteSearchResult[] {
  const productPaths = new Set(ringkasanProduk.map((product) => `/produk/${product.slug}`))
  const navigationPages = primaryNav.flatMap((item) => {
    if (item.children) {
      return item.children
        .filter((child) => !productPaths.has(child.href))
        .map((child) => ({
          title: child.label,
          description: `Halaman ${child.label}.`,
          href: child.href,
          category: 'Halaman' as const,
        }))
    }

    return item.href
      ? [{
          title: item.label,
          description: `Halaman ${item.label}.`,
          href: item.href,
          category: 'Halaman' as const,
        }]
      : []
  })

  return [...navigationPages, ...additionalPages]
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('id')
}

export function searchSiteContent(query: string, berita: Berita[]): SiteSearchResult[] {
  const searchTerms = normalize(query).trim().split(/\s+/).filter(Boolean)
  if (searchTerms.length === 0) return []

  const products: SiteSearchResult[] = ringkasanProduk.map((product) => ({
    title: product.nama,
    description: `${product.akad}. ${product.deskripsi}`,
    href: `/produk/${product.slug}`,
    category: 'Produk & layanan',
  }))
  const news: SiteSearchResult[] = berita.map((item) => ({
    title: item.judul,
    description: item.ringkasan,
    href: `/informasi/berita/${item.slug}`,
    category: 'Berita',
  }))

  return [...getPageResults(), ...products, ...news].filter((result) => {
    const searchableText = normalize(`${result.title} ${result.description}`)
    return searchTerms.every((term) => searchableText.includes(term))
  })
}
