require('dotenv').config()
const mongoose = require('mongoose').connect(process.env.DB_PATH)


const userSchema = mongoose.Schema ({
  username: {
    type: String,
    unique: true
  },
  password: String
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;
