require('dotenv').config()
const mongoose = require('mongoose').connect(process.env.DB_PATH)
      Schema   = mongoose.Schema

const postSchema = mongoose.Schema ({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  post: String
})

const postModel = mongoose.model('Post', postSchema)

module.exports = postModel;
