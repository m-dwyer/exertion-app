const { ApolloServer, makeExecutableSchema } = require('apollo-server')
const { applyMiddleware } = require('graphql-middleware')

const logger = require('./logger')
require('dotenv').config()
require('./mongoose').connect()

const { getUserFromToken } = require('./auth')

const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')
const permissions = require('./permissions')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  subscriptions: {
    path: '/subscriptions'
  },
  context: async ({ req, connection }) => {
    let token = null
    let auth = null
    if (connection) {
      auth = connection.context.authorization
    } else {
      auth = req ? req.headers.authorization : null
    }

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      token = auth.substring(7)
    }

    const currentUser = await getUserFromToken(token)

    return { currentUser }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  logger.info(`Server listening at ${url}`)
  logger.info(`Server listening for subscriptions at ${subscriptionsUrl}`)
})
