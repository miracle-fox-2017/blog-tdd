require('dotenv').config()
const mongoose = require('mongoose').connect(process.env.DB_PATH)


const userSchema = mongoose.Schema ({
  username: String,
  password: String
})
