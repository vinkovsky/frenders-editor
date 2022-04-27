import algoliasearch from 'algoliasearch/lite'

const indexName = process.env.ALGOLIA_INDEX

// Регистрация поисковой системы
const searchClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_API_KEY as string
)

export { indexName, searchClient }
