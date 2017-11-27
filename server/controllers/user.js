const User = require('../models/user.js')
const saltRounds = 10;
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
require('dotenv').config()

function signIn(req,res) {
  User.findOne({
    username : req.body.username
  })
  .then(user => {
    if(user){
      bcrypt.compare(req.body.password, user.password, (err,result) => {
        if(result){
          jwt.sign({
            id : user._id,
            username : user.username
          }, process.env.secretkey , (err, token) => {
            res.send({user , token : token })
          })
        }else{
          res.status(500).send(err)
        }
      })
    }
  })
}

function signUp(req,res) {
  console.log("masuk")
  let user = new User({
    name : req.body.name,
    username : req.body.username,
    password : req.body.password
  })
  user.save((err, user) => {
    if(err){
      res.status(500).send(err);
    }
    res.send(user)
  })
}

module.exports = {
  signIn,
  signUp
}