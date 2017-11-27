const jwt  = require('jsonwebtoken');
const User = require('../models/userModel')

class UserCtrl {

  static createUser (req, res) {
    let user = new User(req.body)
    user.save()
    .then(newUser => res.status(200).send(newUser))
    .catch(err => res.status(500).send(err))
  }

  static loginUser (req, res) {
    let message = 'Invalid Username or Password'
    User.findOne({
      username : req.body.username
    })
    .then(logUser => {
      if(logUser === {}){
        res.status(403).send({message : message})
      }else{
        if(logUser.password != req.body.password) {
          res.status(403).send({message : message})
        }else{
          var token = jwt.sign({ 
            id : logUser._id,
            isLogin : true       
          }, 'shhhhh')
          res.status(200).send({token : token})
        }
      }
    })
    .catch(err => res.status(500).send(err))
  }

}

module.exports = UserCtrl