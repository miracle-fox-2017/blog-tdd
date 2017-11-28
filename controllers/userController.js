const UserModel = require('../models/userModel')
const Helper = require('../helpers/helper');
const ObjectId = require('mongodb').ObjectID;

const create = (req, res) => {
	// Check if email exist, jika ya update data

	UserModel.findOne({ email: req.body.email }).then(user => {
		if (user) {
			// Update
			upsertUser(user, req, res);

		} else {
			// Create new user
			let newUser = new UserModel({
				username: req.body.username || null,
				password: req.body.password || null,
				full_name: req.body.full_name || null,
				email: req.body.email || null,
			})

			upsertUser(newUser, req, res);
		}

	}).catch(err => res.status(500).send({message: err.message}));
}

const findById = (req, res) => {
	UserModel.findById(req.params.userId)
	.then(users => {
		res.status(200).send(users);

	}).catch(err => res.status(500).send({message: err.message}));
}

const findAll = (req, res) => {
	UserModel.find()
	.then(users => {
		res.status(200).send(users);

	}).catch(err => res.status(500).send({message: err.message}));
}

const update = (req, res) => {
	UserModel.findOne({
		_id: ObjectId(req.params.userId)
	}).then(user => {
		if (user) {
			// Update
			upsertUser(user, req, res);
		}

	}).catch(err => res.status(500).send({message: err.message}));
}

const destroy = (req, res) => {
	UserModel.findByIdAndRemove(ObjectId(req.params.userId), (err, deletedUser) => {
		if (err) {
			res.status(500).send({message: "Unauthorized delete action", error: err.message});
		} else {
			res.status(200).send({
				message: 'User deleted',
				user: deletedUser
			});
		}

	})
}

const logIn = (req, res) => {
	res.send(
		{
			message: "Login Success",
			token: req.header.todo_token,
			email: req.header.email,
			full_name: req.header.full_name
		}
	)
}

const upsertUser = (user, req, res) => {
	user.username = req.body.username || user.username;
	user.full_name =  req.body.full_name || user.full_name;
	user.email = req.body.email || user.email;

	if (typeof req.body.password !== "undefined" && req.body.password !== null) {
		Helper.getHashedPassword(req.body.password)
		.then(password => {
			user.password =  password ;
			user.save((err, createdUser) => {
				if (err) {
					res.status(500).send({message: err.message});
				} else {

					res.status(200).send({message: "User added", user: createdUser});
				}
			})

		}).catch(err => res.status(500).send({message: err.message}));
	}
	else {
		user.password = (req.body.password === null) ? null : user.password;

		user.save((err, createdUser) => {
			if (err) {
				res.status(500).send({message: err.message});
			} else {

				res.status(200).send({message: "User added", user: createdUser});
			}
		})
	}
}

module.exports = {
	create,
	findById,
	findAll,
	update,
	destroy,
	logIn
}