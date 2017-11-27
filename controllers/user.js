const User = require('../models/user-schema')
const bcrypt = require('bcrypt');
const saltRounds = 10;

let message = ''

const getAllUsers = (req, res) => {
  User.find().then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(500).send(err);
  })
}


const create = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (!err) {
      console.log(hash);
      User.create(
        {
          username : req.body.username,
          email    : req.body.email,
          password : hash
        }
      ).then(user => {
        message = 'succes create one data'
        res.status(200).send({user:user, msg:message})
      })
      .catch(err => {
        res.status(500).send(err)
      })
    }
  });
}

// const findOne = (req, res) => {
//   User.find({_id : req.params.id}).then(user => {
//     res.status(200).send(user)
//   })
//   .catch(err => {
//     res.status(500).send(err)
//   })
// }

//
//
// const findByIdAndUpdate = (req, res) => {
//   User.findByIdAndUpdate({_id : req.params.id}, {
//     name     : req.body.name,
//     memberid : req.body.memberid,
//     address  : req.body.address,
//     zipcode  : req.body.zipcode,
//     phone    : req.body.phone
//   })
//   .then(costumer => {
//     message = 'succes adding one data'
//     res.status(200).send({costumer:costumer,msg:message})
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).send({err:err})
//   })
// }

// const findByIdAndRemove = (req, res) => {
//   User.findByIdAndRemove({_id : req.params.id})
//   .then(user => {
//     message = 'succes removing one data'
//     console.log(user);
//     res.status(200).send({user:user, msg:message})
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).send(err)
//   })
// }
//

module.exports = {
  getAllUsers,
  create,
  //findOne,
  // findByIdAndUpdate,
  //findByIdAndRemove
};
