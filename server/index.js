const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub
} = require('apollo-server')

// TODO: switch out, PubSub is NOT production ready
// See https://www.apollographql.com/docs/apollo-server/data/subscriptions/
const pubsub = new PubSub()

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
    id: ID!
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

    getActivities: [Activity]!
  }

  type Subscription {
    activityAdded: Activity
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
      const { currentUser } = context
      // TODO: move this into middleware
      if (!currentUser) throw new AuthenticationError('Not authenticated!')

      const activity = new Activity({
        type: args.type,
        duration: args.duration,
        user: currentUser.id
      })

      try {
        await activity.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      const newActivity = await Activity.findById(activity.id).populate('user')
      pubsub.publish('ACTIVITY_CREATED', { activityAdded: newActivity })

      return activity
    }
  },

  Query: {
    getActivities: async () => {
      const activities = await Activity.find({}).populate('user')

      return activities
    }
  },

  Subscription: {
    activityAdded: {
      subscribe: (root, args, context) => {
        const { currentUser } = context
        if (!currentUser) throw new AuthenticationError('Not authenticated!')
        return pubsub.asyncIterator(['ACTIVITY_CREATED'])
      }
    }
  }
}

const getUserFromToken = async (token) => {
  let decodedToken = null

  try {
    decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }

  const currentUser = await User.findById(decodedToken.id)

  return currentUser
}

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
  console.log(`Server listening at ${url}`)
  console.log(`Server listening for subscriptions at ${subscriptionsUrl}`)
})
