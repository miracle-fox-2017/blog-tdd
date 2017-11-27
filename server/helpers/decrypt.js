const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (passwordUser, passwordHash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passwordUser, passwordHash, function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        });
    })
}