const { ApolloServer, gql } = require('apollo-server')

const users = [
  {
    username: 'M Dee',
    password: '1234',
    id: 1
  }
]

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    id: ID!
  }

  type Query {
    allUsers : [User!]
  }
`

const resolvers = {
  Query: {
    allUsers: () => users
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`)
})