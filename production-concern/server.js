const app = require('express')()
const http = require('http')
const server = require('http')

function startServer() {
  server.createServer(app).listen(1234, function() {
    console.log(`Express started in ${app.get('env')} mode on http://localhost:${app.get('port')}`)
  })
}

if (require.main === module) {
  // application run directly; start app server
  startServer()
} else {
  // application imported as a module via 'require': export function
  // to create server
  module.exports = startServer
}
