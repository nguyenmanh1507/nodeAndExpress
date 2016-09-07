'use strict'

var express = require('express')
var fortunes = require('./lib/fortunes')
var path = require('path')

const app = express()

app.set('port', process.env.PORT || 3000)
  .set('view engine', 'pug')

app.use(express.static(path.join(__dirname, '/public')))

app.use((req, res, next) => {
  const cond = app.get('env') !== 'production' && req.query.test === '1'
  res.locals.showTest = cond
  next()
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  res.render('about', {
    fortune: fortunes.getFortune(),
    pageTestScript: '/qa/test-about.js'
  })
})

app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river')
})

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate')
})

// custom 404 page
app.use((req, res) => {
  res.status(404)
    .render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500)
    .render('500')
})

app.listen(app.get('port'), () => {
  console.log(`Express stated on http://localhost:${app.get('port')}`)
})
