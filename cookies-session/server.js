const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const credentials = require('./credentials')
const path = require('path')

app.use(cookieParser(credentials.cookieSecret))
app.use(express.static('public'))
app.use(session({
  secret: credentials.cookieSecret,
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'pug')

app.use(function(req, res, next) {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})

app.get('/', function(req, res) {
  res.cookie('id', '15071991', { signed: true })
  res.render('index')
})

app.post('/', function(req, res) {
  const name = req.body.name || ''
  const email = req.body.email || ''

  // input validation
  if (!email.match(VALID_EMAIL_REGREX)) {
    if (req.xhr) return res.json({ error: 'Invalid name email address.' })
    req.session.flash = {
      type: 'danger',
      intro: 'Validation error!',
      message: 'The email address you entered was not valid'
    }
    return res.redirect(303, '/archive')
  }

  new NewsLetterSignup({ name: name, email: email }).save(function(err) {
    if (err) {
      if (req.xhr) return res.json({ error: 'Database error.' })
      req.session.flash = {
        type: 'danger',
        intro: 'Database error!',
        message: 'There was a database error; Please try again later.'
      }
      return res.redirect(303, '/archive')
    }

    if (req.xhr) return res.json({ success: true })
    req.session.flash = {
      type: 'success',
      intro: 'Thank you!',
      message: 'You have now been signed up for the newsletter.'
    }

    return res.redirect(303, '/archive')
  })
})

app.listen(1234, function() {
  console.log('listen at http://localhost:1234')
})
