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
app.get('/process', (req, res) => {
  console.log(`Form (from querystring): ${req.query.form}`)
  console.log(`CSRF token (from hidden form field): ${req.body._csrf}`)
  console.log(`Name (from visible form field): ${req.body.name}`)
  console.log(`Email (from visible form field): ${req.body.email}`)
  res.redirect(303, '/thank-you')
})

app.listen(3000)
