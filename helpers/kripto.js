const bcrypt = require('bcrypt');
const saltRounds = 10;

class Kripto {

  static enkripsi(myPlaintextPassword) {

    return new Promise((resolve, reject) => {
      bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        if(err) {
          reject(err)
        }
        else {
          resolve(hash)
        }
      })
    })

  }

  static dekripsi(myPlaintextPassword, hash) {

    return new Promise((resolve, reject) => {
      bcrypt.compare(myPlaintextPassword, hash, function(err, hasil) {
          if(err) {
            reject(err)
          }
          else {
            resolve(hasil)
          }
      })
    })

  }

}

module.exports = Kripto;
