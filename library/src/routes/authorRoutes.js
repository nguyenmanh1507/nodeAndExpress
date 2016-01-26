var express = require('express'),
		authorRouter = express.Router(),
		authors = [
			{
				name: 'Nguyen Manh',
				dob: 'Jul - 15th - 1991'
			},
			{
				name: 'Nguyen Tien Manh',
				dob: 'Jul - 15th - 1991'
			},
			{
				name: 'Nguyen Manh Tien',
				dob: 'Jul - 15th - 1991'
			},
			{
				name: 'Manh Nguyen Tien',
				dob: 'Jul - 15th - 1991'
			}
		],
		aRouter
;

aRouter = function(nav) {

	authorRouter.route('/')
		.get(function(req, res) {
			res.render('authorListView', {
				title: 'Author List',
				nav: nav,
				authors: authors
			});
		});
	;

	authorRouter.route('/:id')
		.get(function(req, res) {
			var id = req.params.id;
			res.render('authorView', {
				title: 'Author Detail',
				nav: nav,
				author: authors[id]
			});
		});
	;

	return authorRouter;

};

module.exports = aRouter;