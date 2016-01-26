var express      = require('express'),
		handlebars   = require('express-handlebars'),
		app          = express(),
		port         = process.env.PORT || 5000,
		nav          = [
										{Link: '/Books', Text: 'Books'},
										{Link: '/Authors', Text: 'Authors'}
									],
		bookRouter   = require('./src/routes/bookRoutes')(nav),
		authorRouter = require('./src/routes/authorRoutes')(nav)
;

app.use(express.static('public'));
app.set('views', './src/views');

// app.engine('.hbs', handlebars({extname: '.hbs'}));

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Authors', authorRouter);

app.get('/', function(req, res) {
	res.render('index', {
		title: 'Hello from render',
		nav: nav
	});
});

app.listen(port, function(err) {
	console.log('Running server on port: ' + port);
});