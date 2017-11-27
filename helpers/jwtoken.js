const jwt = require('jsonwebtoken')
const secret = "aku kangen kamu"

class Jwtoken {

  static createtoken(obj) {
    return new Promise((resolve, reject) => {
      jwt.sign({id: obj._id, username:obj.username, email: obj.email, login: true}, secret, function(err, token) {
        if(err) {
          reject(err)
        }
        else {
          resolve(token)
        }
      })
    })
  }

  static verifytoken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, function(err, hasil) {
        if(!err) {
          console.log(hasil);
          resolve(hasil)
        }
        else {
          reject(err)
        }
      })
    })
  }

}

module.exports = Jwtoken;
