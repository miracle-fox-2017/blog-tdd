const bcrypt = require('../helpers/bcrypt');
const jwtoken = require('../helpers/jwtoken');
const mongoose = require('mongoose');
const User = require('../models/userModels');

// *** get ALL users *** //
const findAllUsers = (req, res) => {
  User.find(function(err, users) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(users);
    }
  });
}

// *** get SINGLE users *** //
const findUserById = (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.json({'ERROR': err});
    } else {
      res.json(user);
    }
  });
}

// *** add user//signup *** //
const addUser = (req, res) => {
  var plainpassword = req.body.password;
  bcrypt.enkripsi(plainpassword).then((hash) => {
    User.create({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }).then(() => {
      res.status(200).send({
        status: 'SUCCESS',
        name: req.body.name,
        email: req.body.email,
      });
    });
  });
};

// *** SIGNIN *** //
const signin = (req, res) => {
  User.findOne(
    { email: req.body.email }).then((user) => {
    if (user) {
      var plainpassword = req.body.password;
      var hash = user.password;
      bcrypt.dekripsi(plainpassword, hash).then((hasil) => {
        if (hasil) {
          jwtoken.createtoken(user).then((token) => {
            res.status(200).send({
              status: 'login success',
              token: token,
            });
          });
        } else {
          res.send({
            email: req.body.email,
            status: 'wrong password',
          });
        }
      }).catch((err) => {
        res.status(404).send(err);
      });
    }
  }).catch((err) => {
    res.status(404).send(err);
  });
};

// *** put SINGLE user *** //
const updateUser = (req, res) => {
  User.findById(req.params.id, function(err, user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function(err) {
      if(err) {
        res.json({'ERROR': err});
      } else {
        res.json({'UPDATED': user});
      }
    });
  });
}

// *** delete SINGLE user *** //
const deleteUser = (req, res) => {
  User.findById(req.params.id, function(err, user) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      user.remove(function(err){
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'REMOVED': user});
        }
      });
    }
  });
}

module.exports = {
  findAllUsers,
  findUserById,
  addUser,
  signin,
  updateUser,
  deleteUser,
};
