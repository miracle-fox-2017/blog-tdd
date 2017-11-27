const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  fullname : {
    type : String,
    required : true
  },
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  }
})

const userModels = mongoose.model('User', userSchema)
module.exports = userModels