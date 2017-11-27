const ObjectId = require('mongodb').ObjectId
const User = require('../models/userModel')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

const create = (req, res) => {
  bcrypt.encrypt(req.body.password)
  .then(passEncrypted => {
    let user = new User({
      name: req.body.name,
      username: req.body.username,
      password: passEncrypted,
      email: req.body.email,
      createdAt: new Date()
    })

    user.save()
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err))
  })
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
    bcrypt.encrypt(req.body.password)
    .then(passEncrypted => {
      user.name = req.body.name || user.name,
      user.username = req.body.username || user.username,
      user.password = passEncrypted || user.password,
      user.email = req.body.email || user.email

      user.save()
      .then(user => res.send(user))
      .catch(err => res.status(500).send(err))
    })
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

const login = (req, res) => {
  User.findOne({username: req.body.username})
  .then(user => {
    bcrypt.decrypt(req.body.password, user.password)
    .then(match => {
      if(match) {
        jwt(user)
        .then(token => {
          console.log(token);
          res.send(token)
        })
        .catch(err => res.status(500).send(err))
      } else {
        res.send('Login failed! Incorrect username or password')
      }
    })
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  login
}
