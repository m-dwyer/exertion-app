const { ApolloServer, gql, UserInputError } = require('apollo-server')

const mongoose = require('mongoose')
const User = require('./models/User')
const Activity = require('./models/Activity')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
  .then(() => {
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

  type Activity {
    user: User!
    type: String!
    duration: Int!
  }

  type Mutation {
    createUser(username: String!, password: String!): User

    loginUser(username: String!, password: String!): Token

    createActivity(type: String!, duration: Int!): Activity
  }

  type Query {
    me: User
  }
`

const resolvers = {
  Mutation: {
    createUser: async (root, args) => {
      const passwordHash = await bcrypt.hash(args.password, 10)

      const user = new User({
        username: args.username,
        password: passwordHash
      })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return user
    },

    loginUser: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      const loginCorrect =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.password)

      if (!loginCorrect) {
        throw new UserInputError('Incorrect credentials')
      }

      const token = jwt.sign(
        { user: user.username, id: user.id },
        process.env.JWT_SECRET
      )
      return { value: token }
    },

    createActivity: async (root, args, context) => {
      const activity = new Activity({
        type: args.type,
        duration: args.duration
      })

      try {
        await activity.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return activity
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`)
})
