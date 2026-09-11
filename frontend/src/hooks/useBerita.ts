import { useEffect, useState } from 'react'
import { beritaTerkini, type Berita } from '../data/berita'
import { fetchBerita } from '../lib/wordpress'

export function useBerita(limit = 3) {
  const [berita, setBerita] = useState<Berita[]>(beritaTerkini.slice(0, limit))
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    fetchBerita(limit)
      .then((posts) => {
        if (isActive) setBerita(posts)
      })
      .catch(() => {
        if (isActive) {
          setBerita(beritaTerkini.slice(0, limit))
          setError('Berita terbaru belum dapat dimuat.')
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [limit])

  return { berita, isLoading, error }
}