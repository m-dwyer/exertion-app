import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import DefaultTheme from './themes/default'

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  split
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

import { StateProvider } from './store'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('usertoken')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({ uri: '/graphql' })

const wsLink = new WebSocketLink({
  uri: SERVER_SUBSCRIPTION_URL,
  options: {
    reconnect: true,
    connectionParams: () => {
      const token = localStorage.getItem('usertoken')
      return {
        authorization: token ? `bearer ${token}` : null
      }
    }
  }
})

// Execute function to check operation type
// If truthy (operation is a subscription), use the web socket link
// If falsey (e.g. query, mutation), use http link with auth header

// TODO: Add auth over web socket! (See https://www.apollographql.com/docs/react/data/subscriptions/)
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.render(
  <StateProvider initialState={{ theme: DefaultTheme }}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StateProvider>,
  document.getElementById('root')
)
