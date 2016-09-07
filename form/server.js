const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use(require('body-parser')())

app.get('/', (req, res) => {
  console.log(req.body)
  res.render('index')
})

// app.get('/pro')

app.listen(3000)
