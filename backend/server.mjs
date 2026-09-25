import http from 'node:http'
import { config, headers } from './config/env.mjs'
import { sendJson } from './lib/http.mjs'
import { createChatRoute } from './routes/chat.mjs'
import { createBeritaRoute } from './routes/berita.mjs'

const chatRoute = createChatRoute(config)
const beritaRoute = createBeritaRoute(config)

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    response.end()
    return
  }

  const requestUrl = new URL(request.url || '/', `http://${request.headers.host}`)

  if (request.method === 'POST' && requestUrl.pathname === '/api/chat') {
    await chatRoute(request, response)
    return
  }

  if (request.method === 'GET' && requestUrl.pathname === '/api/berita') {
    await beritaRoute(request, response, requestUrl)
    return
  }

  sendJson(response, 404, { error: 'Endpoint tidak ditemukan' }, headers)
})

server.listen(config.port, () => {
  console.log(`Backend berjalan di http://localhost:${config.port}`)
})