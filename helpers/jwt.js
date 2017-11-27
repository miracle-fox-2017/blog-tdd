var jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = (user) => {
  // console.log(user);
  return new Promise((resolve, reject) => {
    let payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isLogin: true,
      // isAdmin: user.isAdmin
    }
    
    jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'}, function(err, token) {
      if(err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
};
