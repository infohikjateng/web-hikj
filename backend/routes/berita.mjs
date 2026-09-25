import { sendJson } from '../lib/http.mjs'
import { getBerita } from '../services/wordpress.mjs'

export function createBeritaRoute(config) {
  return async function beritaRoute(request, response, requestUrl) {
    const requestedLimit = Number(requestUrl.searchParams.get('limit') || 3)
    const limit = Number.isInteger(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 3

    try {
      sendJson(response, 200, await getBerita(limit, config), config.headers)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gagal mengambil berita'
      sendJson(response, 502, { error: message }, config.headers)
    }
  }
}