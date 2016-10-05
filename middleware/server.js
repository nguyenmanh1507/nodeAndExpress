const express = require('express')
const app = express()

app.use(function(req, res, next) {
  console.log('\n\nALWAYS')
  next()
})

app.get('/a', function(req, res) {
  console.log('/a: route terminated')
  res.send('a')
})

app.get('/a', function(req, res) {
  console.log('/a: never called')
})

app.get('/b', function(req, res, next) {
  console.log('/b: route not terminated')
  next()
})

app.use(function(req, res, next) {
  console.log('SOMTIMES')
  next()
})

app.get('/b', function(req, res) {
  console.log('/b (part 2): error throw')
  throw new Error('b failed')
})

app.use('/b', function(err, req, res, next) {
  console.log('/b error detected and passed on')
  next(err)
})

app.get('/c', function(err, req) {
  console.log('/c: error throw')
  throw new Error('c failed')
})

app.use('/c', function(err, req, res, next) {
  console.log('/c: error detected but not passed on')
  next()
})

app.use(function(err, req, res, next) {
  console.log(`unhandled error detected ${err.message}`)
  res.send('500 - server error')
})

app.use(function(req, res) {
  console.log('route not handled')
  res.send('404 - not found')
})

app.listen(1234)
