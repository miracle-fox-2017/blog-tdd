const mongoose = require('mongoose')
const Schema = mongoose.Schema

let blogSchema = new Schema(
  {
    title: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
)

let Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
