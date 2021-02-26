const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const User = require('./models/User')

require('dotenv').config()

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  }
).then(() => {
  console.log('connected to mongodb')
})
.catch((err) => {
  console.log('error connecting to mongodb:', err.message)
})

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
    ) : User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    me: User
  }

`

const resolvers = {
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ username: args.username, password: args.password })
      return user.save()
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || user.password !== args.password) {
        throw new UserInputError('Incorrect credentials')
      }

      return { value: 'some_jwt_tokeen' }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`)
})