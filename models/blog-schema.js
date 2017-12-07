const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
  title   : String,
  author  :  String,
  article : String,
  createdAt : {
    type : Date,
    default : Date.now
  },
  updatedAt : {
    type : Date,
    default : Date.now
  }
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog
