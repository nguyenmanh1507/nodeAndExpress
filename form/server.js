const express = require('express')
const app = express()
const path = require('path')


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

// Thank you route
app.get('/thank-you', (req, res) => {
  res.render('thank-you')
})

app.listen(3000)
