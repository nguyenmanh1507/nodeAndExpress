'use strict'

var express = require('express')
var fortunes = require('./lib/fortunes')

const app = express()

app.set('port', process.env.PORT || 3000)
  .set('view engine', 'pug')

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  res.locals.showTest = app.get('env') !== 'production' && req.query.test === '1'
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
