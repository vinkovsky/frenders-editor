import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
  from,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import withApollo from 'next-with-apollo'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = Cookies.get('token')
  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : null,
      },
    }))
  }
  return forward(operation)
})

export default withApollo(({ initialState }) => {
  return new ApolloClient<NormalizedCacheObject>({
    link: from([
      authMiddleware,
      createUploadLink({
        uri: `${process.env.STRAPI_API_URL}/graphql`,
        credentials: 'same-origin',
        fetch,
      }),
    ]),
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache().restore(initialState || {}),
  })
})
