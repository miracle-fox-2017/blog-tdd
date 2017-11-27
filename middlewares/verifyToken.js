//helper
const tok = require('../helpers/jsonToken')

let loginState = (req, res, next) => {
  if(!req.headers.token) res.status(400).send({msg: 'token not found'})
  else {
    tok.verifyToken(req.headers.token, (err, decoded)=>{
      if(err) res.status(400).send({msg: 'token invalid'})
      else {
        req.decoded = decoded
        next()
      }
    })
  }
}

module.exports = {
  loginState
};