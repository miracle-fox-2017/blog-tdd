const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/userModel')

getOne = (req, res) => {
  User.findById(req.query.id)
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
      // Store hash in your password DB.
  })
  // bcrypt.hash(req.body.password, saltRounds)
  // .then(hash => {
  // })
  .catch(err => {
    console.log(err);
    res.status(500).send(err)
  })
}

update = (req, res) => {
  User.findByIdAndUpdate(req.query.id, { $set: req.body}, { new: true })
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

remove = (req, res) => {
  User.findByIdAndRemove(req.query.id)
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
  User.find({username: req.body.username})
  .then(response => {

  })
  .catch(err => {
    res.status(401).send(err)
  })
}

module.exports = {
  getAll,
  getOne,
  signup,
  update,
  remove
}
