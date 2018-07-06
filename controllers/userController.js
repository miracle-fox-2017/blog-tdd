const User = require('../models/userModel.js')
const crypt = require('../helper/crypt.js')

// Find all users
let findAllUsers = function(req,res){
  User.find().then(function(dataUsers){
    res.status(200).send(dataUsers)
  })
}

// Adding new user
let addNewUser = function(req,res){
  crypt(req.body.password).then(function(dataPassword){
    let newUser = User(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: dataPassword,
        role: req.body.role
      }
    )
    newUser.save().then(function(dataUsers){
      res.status(200).send(dataUsers)
    }).catch(function(err){
      res.status(500).send(err)
    })
  })
}

// Delete user
let removeUser = function(req,res){
  User.findOneAndRemove(
    {
      _id: req.params.id
    }
  ).then(function(dataUsers){
    res.status(200).send(dataUsers)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Update user
let updateUser = function(req,res){
  User.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: req.body.role
    }
  ).then(function(dataUsers){
    res.status(200).send(dataUsers)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

module.exports = {
  findAllUsers,
  addNewUser,
  removeUser,
  updateUser
}
