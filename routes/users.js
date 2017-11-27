var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let users = [
		{
			_id: "asdasdasd3432432",
			username: "markt88",
			email: "markt@mail.com",
			password: "234234234",
			full_name: "Mark Twain"
		},
		{
			_id: "3243242342347889",
			username: "tamba",
			email: "tamba@mail.com",
			password: "aaaaa22",
			full_name: "Tamba Palla"
		}
	];

  res.status(200).send(users)

});

router.get('/:userId', function(req, res, next) {
	let post = {
		_id: "asdasdasd3432432",
		username: "markt88",
		email: "markt@mail.com",
		password: "234234234",
		full_name: "Mark Twain"
	};

  res.status(200).send(post)

});

router.post('/', function(req, res, next) {
	let newUser = {
		_id: "asdasdasd3432432",
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		full_name: req.body.full_name
	};

  res.status(200).send({
  	message: "New User created",
  	user: newUser
  })

});

router.put('/:userId', function(req, res, next) {
	let newUser = {
		_id: "asdasdasd3432432",
		username: "markt88",
		email: "markt@mail.com",
		password: "234234234",
		full_name: "Mark Twain"
	};

  res.status(200).send({
  	message: "User edited",
  	user: newUser
  })
});

router.delete('/:userId', function(req, res, next) {
  res.status(200).send({
  	message: "User deleted",
  	user: {
  		_id: "asdasdasd3432432",
	  	username: "markt88",
			email: "markt@mail.com",
			password: "234234234",
			full_name: "Mark Twain"
		}
  })
});

module.exports = router;