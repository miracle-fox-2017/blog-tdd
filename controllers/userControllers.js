const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
require('dotenv').config()

getOne = (req, res) => {
  User.findById(req.params.id)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

getAll = (req, res) => {
  User.find()
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

signup = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds)
  .then(function(hash) {
    req.body.password = hash
    User.create(req.body)
    .then(response => {
      let status = {
        status: 'success',
        data: response
      }
      res.status(200).send(status)
    })
    .catch(err => {
      res.status(500).send(err)
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err)
  })
}

update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true })
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

remove = (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(response => {
    let status = {
      status: 'deleted',
      data: response
    }
    res.status(200).send(status)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

login = (req, res) => {
  User.findOne({username: req.body.username})
  .then(user => {
    bcrypt.compare(req.body.password, user.password)
    .then(function(response) {
      let payload = {
        id: user._id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
      jwt.sign(payload, process.env.SECRET_JWT, function(err, token) {
        let accessToken = {
          token: token
        }
        res.status(200).send(accessToken)
      });
    })
    .catch(err => {
      res.status(401).send(err);
    })
  })
  .catch(err => {
    res.status(401).send(err)
  })
}

module.exports = {
  getAll,
  getOne,
  signup,
  login,
  update,
  remove
}
