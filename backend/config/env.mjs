const wordpressApiUrl = (process.env.WORDPRESS_API_URL || 'https://hikjateng.co.id/wp-json/wp/v2/posts').replace(/\/$/, '')
const headers = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  'Content-Type': 'application/json; charset=utf-8',
}

export const config = {
  port: Number(process.env.PORT || 3001),
  siteUrl: process.env.SITE_URL || 'http://localhost:5173',
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterModel: process.env.OPENROUTER_MODEL || 'openrouter/free',
  wordpressApiUrl,
  wordpressCategoriesUrl: wordpressApiUrl.replace(/\/posts$/, '/categories'),
  headers,
}

export { headers }