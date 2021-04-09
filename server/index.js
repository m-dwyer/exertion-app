const { ApolloServer } = require('apollo-server')

const logger = require('./logger')
require('dotenv').config()
require('./mongoose').connect()

const { getUserFromToken } = require('./auth')

const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
