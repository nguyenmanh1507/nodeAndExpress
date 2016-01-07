// 'use strict';

var http = require('http');

http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World');
}).listen(9000);

console.log('Server started on localhost:9000...');