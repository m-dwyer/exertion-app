const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
// TODO: switch out, PubSub is NOT production ready
// See https://www.apollographql.com/docs/apollo-server/data/subscriptions/
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('./models/User')
const Activity = require('./models/Activity')
const ActivityType = require('./models/ActivityType')

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

      const activityType = await ActivityType.findOne({ name: args.type })
      const activity = new Activity({
        type: activityType.id,
        comment: args.comment,
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

      await Activity.populate(activity, [{ path: 'user' }, { path: 'type' }])

      pubsub.publish('ACTIVITY_CREATED', { activityAdded: activity })

      return activity
    }
  },

  Query: {
    getActivities: async () => {
      const activities = await Activity.find({})
        .populate('user')
        .populate('type')

      return activities
    },

    getActivityTypes: async () => {
      const activityTypes = await ActivityType.find({})

      return activityTypes
    }
  },

  Subscription: {
    activityAdded: {
      subscribe: (root, args) => {
        return pubsub.asyncIterator(['ACTIVITY_CREATED'])
      }
    }
  }
}

module.exports = resolvers
