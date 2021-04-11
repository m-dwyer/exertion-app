const { shield, deny } = require('graphql-shield')

const permissions = shield({
  User: {
    password: deny
  }
})

module.exports = permissions
