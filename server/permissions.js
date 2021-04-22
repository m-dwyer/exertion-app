const { shield, rule, allow, deny } = require('graphql-shield')

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, context) => {
    return context.currentUser !== null
  }
)

const permissions = shield({
  User: {
    password: deny
  },
  Query: {
    '*': isAuthenticated
  },
  Mutation: {
    createUser: allow,
    loginUser: allow,
    '*': isAuthenticated
  },
  Subscription: {
    '*': isAuthenticated
  }
})

module.exports = permissions
