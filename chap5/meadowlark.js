var express = require('express'),
		app = express()
;

// set up handlebars view engine
var handlebars = require('express-handlebars')
								.create({defaultLayout: 'main'})
;

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple."
];

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 9000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {
		fortune: randomFortune,
		pageTestScript: '/qa/tests-about.js'
	});
});

app.get('tours/hood-river', function(req, res) {
	res.render('tours/hood-river');
});

app.get('tours/request-group-rate', function(req, res) {
	res.render('tours/request-group-rate');
});

// custom 404 page
app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://' + app.get('port') + '.');
});