import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { FC, useMemo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { securedRouter, unsecuredRouter } from '../../pages'
import { AuthProvider } from './Auth'

const router = createBrowserRouter(securedRouter.concat(unsecuredRouter))

const App: FC = () => {
  const client = useMemo(() => {
    const link = createHttpLink({
      uri: 'http://localhost:8080/graphql',
      credentials: 'same-origin',
    })

    return new ApolloClient({
      link,
      connectToDevTools: true,
      queryDeduplication: true,
      cache: new InMemoryCache({
        resultCaching: true,
      }),
    })
  }, [])
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App

export { App }
