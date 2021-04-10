const jwt = require('jsonwebtoken')

const User = require('./models/User')

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

module.exports = { getUserFromToken }
