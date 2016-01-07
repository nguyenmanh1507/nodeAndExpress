var express = require('express'),
		app = express()
;

app.set('port', process.env.PORT || 9000);

// custom 404 page
app.use(function(req, res) {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use(function(req, res) {
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Internal Error');
});

app.listen(app.get('port'), function() {
	console.log('Express started on ');
});