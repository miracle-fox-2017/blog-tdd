const userController = require('../controllers/userController');
const UserModel = require('../models/userModel');
const Helper =  require('../helpers/helper');
const jwt = require('jsonwebtoken');


const logIn = (req, res, next) => {
	if (typeof req.body.username !== "undefined") {

		UserModel.findOne({ username: req.body.username })
		.then(user => {
			if (user) {
				// Login dengan Account biasa
				Helper.comparePassword(req.body.password, user.password)
					.then(verifiedAccount => {
						if (verifiedAccount) {
							Helper.signWebToken(
								{
									_id: user._id,
									username: user.username,
									password: user.password,
								}
							).then(token => {
									req.header.todo_token = token;
  								req.header.email = user.email;
  								req.header.full_name = user.full_name
									next();

								}).catch(err => res.status(401).send({message: "Unauthorized User", error: err.message}));
						} else {
							res.status(401).send({message: "Unauthorized User", error: err.message})
						}

					}).catch(err => res.status(401).send({message: "Unauthorized User", error: err.message}));
			} else {
				res.status(401).send({message: "Unauthorized User"})
			}

		}).catch(err => res.status(500).send(err.message));

	} else {
		res.status(401).send({message: "Unauthorized User", error: err.message})
	}
}

const isLogin = (req, res, next) => {
	jwt.verify(req.headers.token_blog, process.env.JWT_SECRET, (err, decoded) => {
		if (typeof decoded !== 'undefined') {
			req.verifiedUser = decoded
			next();

		} else {
			res.status(401).send({message: 'Unauthorized Login Access'});
		}
	});
}

const isAdmin = (req, res, next) => {
	if (req.header('admin_secret') === process.env.ADMIN_SECRET) {
		next();
	} else {
		res.status(500).send({message: 'Unauthorized Accesss'});
	}
}

module.exports = {
	logIn,
	isLogin,
	isAdmin
}