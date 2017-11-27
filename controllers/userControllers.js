const ObjectId = require('mongodb').ObjectId
const User = require('../models/userModel')

const create = (req, res) => {
  let user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    createdAt: new Date()
  })
  console.log(user);
  user.save()
  .then(user => res.send(user))
  .catch(err => res.status(500).send(err))
}

const getAll = (req, res) => {
  User.find()
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err))
}

const getById = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findById(id)
  .then(user => res.send(user))
  .catch(err => res.status(500).send(err))
}

const update = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findById(id)
  .then(user => {
    user.name = req.body.name || user.name,
    user.username = req.body.username || user.username,
    user.password = req.body.password || user.password,
    user.email = req.body.email || user.email

    user.save()
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

const remove = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  User.findByIdAndRemove(id)
  .then(user => res.send(user))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
}
