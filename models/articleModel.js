const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: String,
  author: String,
  content: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: null
  },
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article
