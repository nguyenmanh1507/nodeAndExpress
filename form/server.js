const express = require('express')
const app = express()
const path = require('path')
const formidable = require('formidable')
const util = require('util')

app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, '/public')))
app.use(require('body-parser').urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  console.log(req.body)
  res.render('index')
})

// Newsletter route
app.get('/newsletter', (req, res) => {
  res.render('newsletter', {csrf: 'CSRF token goes here!'})
})

// Process route
app.post('/process', (req, res) => {
  if (req.xhr || req.accepts('json, html') === 'json') {
    // if there were an error, we could send {error: 'error description'}
    res.send({success: true})
  } else {
    // if there were an error, we could redirect to an error page
    res.redirect(303, 'thank-you')
  }
})

// vacation-photo route
app.get('/contest/vacation-photo', (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo', {
    year: now.getFullYear(),
    month: now.getMonth()
  })
})

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) return res.redirect(303, '/error')
    console.log(`Received fields: ${util.inspect(fields)}`)
    console.log(`Received files: ${util.inspect(files)}`)
    res.redirect(303, '/thank-you')
  })
})

// Thank you route
app.get('/thank-you', (req, res) => {
  res.render('thank-you')
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000 ...')
})
