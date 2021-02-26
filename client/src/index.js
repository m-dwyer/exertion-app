import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, gql, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: SERVER_URL
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)