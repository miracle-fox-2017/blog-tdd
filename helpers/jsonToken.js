// require jwt
const jwt = require('jsonwebtoken');
require('dotenv').config()

let signToken = (obj, cb) => {
  jwt.sign(obj, process.env.SECRET, function(err, token) {
    if(err) cb (err, null)
    else {
      cb(null, token)
    }
  });
}

let verifyToken = (token, cb) => {
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if(err) cb (err, null)
    else {
      cb(null, decoded)
    }
  });
}

module.exports = {
  signToken,
  verifyToken
};