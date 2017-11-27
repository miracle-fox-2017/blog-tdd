const ObjectId = require('mongodb').ObjectId
const User = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret_key = process.env.secretKey

const createUser = function(req,res){
  // console.log(req)
  let saltRound = 10
  bcrypt.hash(req.body.password, saltRound).then(function(hash){
    let newUser = User({
      fullname : req.body.fullname,
      username : req.body.username,
      password : hash
    })
    newUser.save().then(function(data_User){
      res.status(201).send({
        message : `[+] 1 user created`,
        data_User : data_User
      })
    }).catch(function(err){
      console.log('[-] error User Create')
      res.status(500).send(errmsg(err))
    })
  }).catch(function(err){
    if(err){
      console.log('[-] password crypt')
      res.status(500).send(err)
    }
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
  // console.log(req.body.password)
  let saltRound = 10
  bcrypt.hash(req.body.password, saltRound).then(function(hash){
    let id = {
      _id : ObjectId(req.params.id)
    }
    User.findById(id).then(function(data_User){
      data_User.fullname = req.body.fullname,
      data_User.username = req.body.username,
      data_User.password = hash
      
      //save update
      data_User.save().then(function(data_User){
        res.status(201).send({
          message : `[+] 1 article created`,
          data_User : data_User
        })
      }).catch(function(err){
        console.log('[-] error User Update')
        res.status(500).send(errmsg(err))
      })
    })
  }).catch(function(err){
    console.log('[-] update password crypt')
    res.status(500).send(err)
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

const userLogin = function(req,res){
  User.findOne({
    username: req.body.username
  }).then(function(data_User){
    console.log('data_User',data_User)
    if(data_User){
      bcrypt.compare(req.body.password, data_User.password).then(function(result){
        // console.log(result)
        if(result){
          console.log(data_User)
          jwt.sign({
            id : data_User.id,
            username : data_User.username
          }, secret_key, function(err, token){
            if(!err){
              console.log('this token >>', token)
              res.status(201).send({
                success: true,
                message: 'Enjoy your token!',
                token: token,
                username: data_User.fullname,
                user_Id:data_User.id
              })
            }
          })
        }
      })
    }
  }).catch(function(err){
    if(err){
      res.status(500).send(err)
      console.log(err)
    }
  })
}

module.exports = {
  createUser,
  findAllUser,
  updateUser,
  destroyUser,
  userLogin
}