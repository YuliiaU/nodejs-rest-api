const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
// const bcript = require('bcryptjs')
const { User } = require('../../models')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Already registered')
  }
  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, avatarURL })
  newUser.setPassword(password)
  await newUser.save()
  //   const hasnPassword = bcript.hashSync(password, bcript.genSaltSync(10))
  //   await User.create({ email, password: hasnPassword })

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success'
  })
}

module.exports = register
