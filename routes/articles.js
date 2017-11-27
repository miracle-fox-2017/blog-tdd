var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let blogPosts = [
		{
			_id: "asdasdasd3432432",
			title: "Welcome to the Jungle",
			content: "I'm the king of the jungle",
			category: "News",
			createdAt: new Date(),
			author: "2343242345"
		},
		{
			_id: "asdasdasd3432432",
			title: "Welcome to the Desert",
			content: "I'm the king of the desert",
			category: "News",
			createdAt: new Date(),
			author: "2342342"
		}
	];

  res.status(200).send(blogPosts)

});

router.get('/:articleId', function(req, res, next) {
	let post = {
		_id: "asdasdasd3432432",
		title: "Welcome to the Desert",
		content: "I'm the king of the desert",
		category: "News",
		createdAt: new Date(),
		author: "2342342"
	};

  res.status(200).send(post)

});

router.post('/', function(req, res, next) {
	let newPost = {
		_id: "asdasdasd3432432",
		title: req.body.title,
		content: req.body.content,
		category: req.body.category,
		createdAt: req.body.createdAt,
		author: req.body.author,
	};

  res.status(200).send({
  	message: "Article created",
  	article: newPost
  })

});

router.put('/:articleId', function(req, res, next) {
	let newPost = {
		_id: "asdasdasd3432432",
		title: req.body.title,
		content: req.body.content,
		category: req.body.category,
		createdAt: req.body.createdAt,
		author: req.body.author,
	};

  res.status(200).send({
  	message: "Article edited",
  	article: newPost
  })
});

router.delete('/:articleId', function(req, res, next) {
	let post = {
		_id: "asdasdasd3432432",
		title: "Welcome to the Desert",
		content: "I'm the king of the desert",
		category: "News",
		createdAt: new Date(),
		author: "2342342"
	};

  res.status(200).send({
  	message: "Article deleted",
  	article: post
  })
});

module.exports = router;