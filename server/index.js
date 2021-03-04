const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const User = require('./models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

    loginUser(
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
    createUser: async (root, args) => {
      const passwordHash = await bcrypt.hash(args.password, 10)

      const user = new User({ username: args.username, password: passwordHash })
      return user.save()
    },

    loginUser: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      const loginCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.password)

      if (!loginCorrect) {
        throw new UserInputError('Incorrect credentials')
      }

      const token = jwt.sign({ user: user.username, id: user.id }, process.env.JWT_SECRET)
      return { value: token }
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