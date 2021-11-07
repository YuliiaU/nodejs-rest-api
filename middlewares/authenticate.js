const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

require('dotenv').config()
const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers
  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    throw new Unauthorized('Invalid token')
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    if (!user || !user.token) {
      throw new Unauthorized('Invalid token')
    }
    req.user = user
    next()
  } catch (error) {
    error.status = 401
    next(error)
  }
}

module.exports = authenticate
