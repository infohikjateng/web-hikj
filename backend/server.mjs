import http from 'node:http'

const port = Number(process.env.PORT || 3001)
const wordpressApiUrl = (process.env.WORDPRESS_API_URL || 'https://hikjateng.co.id/wp-json/wp/v2/posts').replace(/\/$/, '')

const headers = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  'Content-Type': 'application/json; charset=utf-8',
}

function sendJson(response, status, body) {
  response.writeHead(status, headers)
  response.end(JSON.stringify(body))
}

async function getBerita(limit) {
  if (!wordpressApiUrl) {
    throw new Error('WORDPRESS_API_URL belum dikonfigurasi')
  }

  const url = new URL(wordpressApiUrl)
  url.searchParams.set('per_page', String(limit))
  url.searchParams.set('_embed', '1')
  url.searchParams.set('_fields', 'id,date,slug,title,excerpt,content,_embedded')

  const wordpressResponse = await fetch(url)
  if (!wordpressResponse.ok) {
    throw new Error(`WordPress API error: ${wordpressResponse.status}`)
  }

  return wordpressResponse.json()
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      ...headers,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    response.end()
    return
  }

  const requestUrl = new URL(request.url || '/', `http://${request.headers.host}`)

  if (request.method === 'GET' && requestUrl.pathname === '/api/berita') {
    const requestedLimit = Number(requestUrl.searchParams.get('limit') || 3)
    const limit = Number.isInteger(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 3

    try {
      sendJson(response, 200, await getBerita(limit))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gagal mengambil berita'
      sendJson(response, 502, { error: message })
    }
    return
  }

  sendJson(response, 404, { error: 'Endpoint tidak ditemukan' })
})

server.listen(port, () => {
  console.log(`Backend berjalan di http://localhost:${port}`)
})