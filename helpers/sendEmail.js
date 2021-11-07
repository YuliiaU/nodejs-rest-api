/* eslint-disable no-useless-catch */
const nodemailer = require('nodemailer')
require('dotenv').config()

const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'yuliiaudalova@meta.ua',
    pass: EMAIL_PASSWORD
  }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
  const newEmail = {
    ...data,
    from: 'yuliiaudalova@meta.ua'
  }
  try {
    await transporter.sendMail(newEmail)
  } catch (error) {
    throw error
  }
}

module.exports = sendEmail
