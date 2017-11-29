// const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/article?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
const mongoose = require('mongoose').connect('mongodb://localhost/testing-article');
const User = require('../models/userModel')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findAll = (req, res) => {
  User.find()
  .then(users => res.status(200).send({users}))
  .catch(err => res.status(500).send(err))
}

const create = (req, res) => {
  const saltRounds = 10;
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.body.username);
  let input = req.body
    User.findOne({
        username: input.username
    })
    .then(user => {
      // console.log('STATUS', user);
      if(!user){
        bcrypt.hash(input.password, saltRounds).then(function(hash) {
          let obj = {
            name: input.name,
            username: input.username,
            password: hash,
            email : input.email
          }
          User.create(obj)
          .then( user => {
            res.send(
            {
              msg: 'Success created account',
              data: user
            })
          })
        });
      } else {
        res.send(
        {
          msg: 'Username already exists !!'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
}

const destroy = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}
  User.deleteOne(id)
  .then(user => res.send(
  {
    msg : 'Data removed',
    data : user
  })
  )
  .catch(err => res.status(500).send(err))
}

const signin = (req, res) => {
  let signin = req.body
  User.findOne(
  {
    username: signin.username
  })
  .then(user => {
    if(user){
      bcrypt.compare(signin.password, user.password)
      .then( result => {
        // console.log('<<<<<<<<',user);
        if(result){
          jwt.sign(
          {
            id: user._id,
            name : user.name,
            username : user.username,
            email : user.email
          },
            'estehpurun',
            (err, token) => {
              // console.log('TOKEN', token);
              if(!err){
                console.log(
                  token, `Welcome ${user.name}`, user._id
                );
                res.send(
                {
                  token: token,
                  msg: 'Success Login'
                })
              } else {
                res.status(400).send(err)
              }
            })
        } else {
          res.send({msg: 'Wrong Password or username'})
        }
      });
    } else {
      res.send({msg: 'Wrong Password or username'})
    }
  })
  .catch(err => {
    res.status(500).send({msg: 'Wrong Password or username'})
  })
}

const update = (req, res) => {
  let id = ObjectId(req.params.id)
  let edit = req.body
  User.findById(id)
  .then(dataUser => {
    const saltRounds = 10;
    bcrypt.hash(edit.password, saltRounds).then(function(hash) {
      dataUser.name = edit.name,
      dataUser.email = edit.email,
      dataUser.username = edit.username
      dataUser.password = hash
      dataUser.save(function(err) {
        if (err) throw err;
        res.status(200).send(
        {
          msg: 'User successfully updated!'
        });
      });
    })
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  findAll,
  create,
  update,
  destroy,
  signin
};
