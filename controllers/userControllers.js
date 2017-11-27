const ObjectId = require('mongodb').ObjectId
const User = require('../models/userModels')

const createUser = function(req,res){
  let newUser = User({
    fullname : req.body.fullname,
    username : req.body.username,
    password : req.body.password
  })
  newUser.save().then(function(data_User){
    res.status(201).send({
      message : `[+] 1 user created`,
      data_User : data_User
    })
  }).catch(function(err){
    res.status(500).send(`[-] err create user`)
  })
}

const findAllUser = function(req,res){
  User.find().then(function(data_User){
    res.status(200).send(data_User)
  }).catch(function(err){
    res.status(500).send(`[-] err find all user`)
  })
}

const updateUser = function(req,res){
  // console.log('masuk')
  let id = {
    _id : ObjectId(req.params.id)
  }
  User.findById(id).then(function(data_User){
    // console.log(data_Article)
    data_User.fullname = req.body.fullname,
    data_User.username = req.body.username,
    data_User.password = req.body.password
    // save
    data_User.save().then(function(data_User){
      res.status(201).send({
        message : `[+] 1 user updated`,
        data_User : data_User
      })
    }).catch(function(err){
      res.status(500).send(`[-] err update user`)
    })
  }).catch(function(err){
    res.status(500).send(`[-] err find by id user`)
  })
}

const destroyUser = function(req,res){
  let id = {
    _id : ObjectId(req.params.id)
  }
  User.findByIdAndRemove(id).then(function(){
    res.status(200).send(`[-] deleted 1 user`)
  }).catch(function(err){
    res.status(500).send(`[-] err delete by id user`)
  })
}

module.exports = {
  createUser,
  findAllUser,
  updateUser,
  destroyUser
}