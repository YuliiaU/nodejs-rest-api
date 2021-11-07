const { NotFound, BadRequest } = require('http-errors')

const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const reVerefy = async (req, res, next) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('Missing required field email')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw NotFound()
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `
    <a target='_blank' href='http://localhost:3000/api/users/verify/${user.verifyToken}'>Нажмите для подтверждения email</a>
    `
  }

  sendEmail(mail)

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  })
}

module.exports = reVerefy
