export function sendJson(response, status, body, headers) {
  response.writeHead(status, headers)
  response.end(JSON.stringify(body))
}

export async function readJson(request) {
  let body = ''
  for await (const chunk of request) body += chunk
  if (body.length > 20_000) throw new Error('Permintaan terlalu besar')
  return JSON.parse(body || '{}')
}