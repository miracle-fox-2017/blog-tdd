const User   = require('../models/userModel'),
      jwt    = require('jsonwebtoken'),
      bcrypt = require('bcrypt')

const create = (req, res) => {
  
  bcrypt.hash(req.body.password, 10)
  .then(encryptedPassword => {
    let user = new User({
      username: req.body.username,
      password: encryptedPassword
    })
    
    user.save()
    .then(success => {
      res.status(200).send(success)
    })
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error)
  })
  
}

const login = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .then(userDetail => {
      if (userDetail != null) {
        bcrypt.compare(userDetail.password, req.body.password)
        .then(success => {
          jwt.sign({
            username: userDetail.username
          },
          process.env.JWT_SECRET, (err, token) => {
            if (err) {
              res.status(500).send(err)
            }
            else {
              res.status(200).send({
                uid: token
              })
            }
          })
        })
      }
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

module.exports = {
  create,
  login
};
