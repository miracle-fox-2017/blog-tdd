const mongoose = require('mongoose').connect('mongodb://localhost/blog');
const Schema = mongoose.Schema

let userSchema = new Schema({
    username : String,
    password : String
})

let Users = mongoose.model('Users', userSchema)

module.exports = Users