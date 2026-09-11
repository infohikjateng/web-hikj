import { type Berita } from '../data/berita'

interface WordPressPost {
  id: number
  date: string
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text?: string
    }>
  }
}

const apiUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

function stripHtml(value: string) {
  const document = new DOMParser().parseFromString(value, 'text/html')
  return document.body.textContent?.trim() ?? ''
}

function getContentImage(value: string) {
  const document = new DOMParser().parseFromString(value, 'text/html')
  return document.querySelector('img')?.getAttribute('src') ?? undefined
}

function mapPost(post: WordPressPost): Berita {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
  const title = stripHtml(post.title.rendered)

  return {
    slug: post.slug,
    judul: title,
    tanggal: new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(post.date)),
    ringkasan: stripHtml(post.excerpt.rendered || post.content.rendered),
    gambar: featuredMedia?.source_url || getContentImage(post.content.rendered),
    gambarAlt: featuredMedia?.alt_text || title,
  }
}

export async function fetchBerita(limit = 3): Promise<Berita[]> {
  const response = await fetch(`${apiUrl}/berita?limit=${limit}`)
  if (!response.ok) throw new Error(`Backend API error: ${response.status}`)

  const posts = (await response.json()) as WordPressPost[]
  return posts.map(mapPost)
}