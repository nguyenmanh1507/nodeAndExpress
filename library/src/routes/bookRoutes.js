var express = require('express'),
		bookRouter = express.Router(),
		books      = [
			{
				title: 'War and Peace',
				genre: 'Historical Fiction',
				author: 'Lev Niko Tolstoy',
				read: false
			},
			{
				title: 'JavaScript and JQuery: Interactive Front-End Web Development',
				genre: 'Web Development & Design',
				author: 'Jon Duckett ',
				read: true
			},
			{
				title: 'Eloquent JavaScript: A Modern Introduction to Programming',
				genre: 'Web Development & Design',
				author: 'Marijn Haverbeke',
				read: true
			},
			{
				title: 'Shoes for Me',
				genre: 'Arts, Music & Photography',
				author: 'Sue Fliess',
				read: false
			}
		],
		bRouter
;

bRouter = function(nav) {

	bookRouter.route('/')
		.get(function(req, res) {
			res.render('bookListView', {
				title: 'Books List',
				nav: nav,
				books: books
			});
		})
	;

	bookRouter.route('/:id')
		.get(function(req, res) {
			var id = req.params.id;
			res.render('bookView', {
				title: 'Book Detail',
				nav: nav,
				book: books[id]
			});
		})
	;

	return bookRouter;

};

module.exports = bRouter;