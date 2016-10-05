const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const credentials = require('./credentials')

const mailTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: credentials.gmail.user,
    pass: credentials.gmail.password
  }
})
