const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
  },
  password: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: null
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User;
