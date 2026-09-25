async function getCategoryNames(config) {
  const url = new URL(config.wordpressCategoriesUrl)
  url.searchParams.set('per_page', '100')
  url.searchParams.set('_fields', 'id,name')

  const response = await fetch(url)
  if (!response.ok) throw new Error(`WordPress categories API error: ${response.status}`)

  const categories = await response.json()
  return new Map(categories.map((category) => [category.id, category.name]))
}

export async function getBerita(limit, config) {
  const url = new URL(config.wordpressApiUrl)
  url.searchParams.set('per_page', String(limit))
  url.searchParams.set('_embed', '1')
  url.searchParams.set('_fields', 'id,date,slug,title,excerpt,content,categories,_embedded')

  const wordpressResponse = await fetch(url)
  if (!wordpressResponse.ok) throw new Error(`WordPress API error: ${wordpressResponse.status}`)

  const [posts, categoryNames] = await Promise.all([
    wordpressResponse.json(),
    getCategoryNames(config),
  ])

  return posts.map((post) => ({
    ...post,
    category_names: (post.categories || [])
      .map((categoryId) => categoryNames.get(categoryId))
      .filter(Boolean),
  }))
}