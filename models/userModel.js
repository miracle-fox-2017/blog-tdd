const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    role: String
  }
)

let User = mongoose.model('User', userSchema)
module.exports = User
