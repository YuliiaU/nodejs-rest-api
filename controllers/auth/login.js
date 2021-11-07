const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  //   if (!user) {
  //     throw new Unauthorized(`Email ${email} not found`)
  //     }

  //      if (!user.comparePassword(password)) {
  //     throw new Unauthorized('Password wrong')
  //   }

  //   const isCorrectPassword = bcrypt.compareSync(password, user.password)
  //   if (!isCorrectPassword) {
  //     throw new Unauthorized('Password wrong')
  //   }
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized('Wrong email or password, or email not verify')
  }

  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, SECRET_KEY)

  await User.findByIdAndUpdate(user._id, { token })

  res.json({
    status: 'success',
    code: 200,
    date: {
      token
    }
  })
}

module.exports = login
