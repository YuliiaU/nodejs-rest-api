const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
// const bcript = require('bcryptjs')
const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Already registered')
  }
  const avatarURL = gravatar.url(email)
  const verifyToken = nanoid()
  const newUser = new User({ email, avatarURL, verifyToken })
  newUser.setPassword(password)
  await newUser.save()

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `
    <a target='_blank' href='http://localhost:3000/api/users/verify/${verifyToken}'>Нажмите для подтверждения email</a>
    `
  }

  sendEmail(mail)
  //   const hasnPassword = bcript.hashSync(password, bcript.genSaltSync(10))
  //   await User.create({ email, password: hasnPassword })

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success'
  })
}

module.exports = register
