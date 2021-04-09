const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
// TODO: switch out, PubSub is NOT production ready
// See https://www.apollographql.com/docs/apollo-server/data/subscriptions/
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('./models/User')
const Activity = require('./models/Activity')

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

module.exports = resolvers
