'use strict'

const express = require('express')
const app = express()

app.get('/headers', (req, res) => {
  res.type('text/plain')
  let s = ''
  for (let name in req.headers) {
    if (req.headers[name]) {
      s += `${name}: ${req.headers[name]}\n`
    }
  }
  res.send(s)
}).listen(3000)
