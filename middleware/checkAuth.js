const jwt = require('jsonwebtoken');

isLogin = (req, res, nex) => {
  if(req.headers.token){
    jwt.verify(req.headers.token, process.env.SECRET_JWT, function(err, decoded) {
      if (!err) {
        req.userLogin = decoded
        nex()
      }else{
        res.status(401).send(err)
      }
    });
  }
}

isAdmin = (req, res, next) => {
  if(req.userLogin.role === 'admin'){
    nex()
  }else{
    res.status(401).send('Permission denied!!')
  }
}

module.exports = {
  isLogin,
  isAdmin
}
