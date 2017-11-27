const userModel = require('../models/user')
const kripto = require('../helpers/kripto');
const jwtoken = require('../helpers/jwtoken');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var signup = (req, res) =>  {
  var plainpassword = req.body.password

  kripto.enkripsi(plainpassword).then((hash) => {
    userModel.create({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password: hash
    }).then(() => {
      res.status(200).send({
        status: "signup success"
      })
    })
  })

}


var signin = (req, res) => {
  userModel.findOne({email: req.body.email}).then((user) => {
    if(user) {
      var plainpassword = req.body.password
      var hash = user.password
      kripto.dekripsi(plainpassword, hash).then((hasil) => {
        if(hasil) {
          jwtoken.createtoken(user).then((token) => {
            res.status(200).send({status: "berhasil login", token: token})
          })

        }
        else {
          res.send('salah')
        }
      }).catch((err) => {
        res.status(404).send(err)
      })
    }
  }).catch((err) => {
    res.status(404).send(err)
  })
}

module.exports = {
  signup,
  signin
};
