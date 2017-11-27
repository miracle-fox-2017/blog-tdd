const jwt = require('jsonwebtoken');
const secret = 'FOOBAR'


const isLogin = (req, res , next) => {
  jwt.verify(req.headers.token, secret, function(err, decoded){
    if (err) {
      res.status(403).send('Please Login')
    } else {
      req.headers.decoded = decoded
      next()
    }
  })
}


module.exports = {
  isLogin
};
