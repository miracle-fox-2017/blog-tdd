var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var articleSchema = new Schema({
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

var Article = mongoose.model('Article', articleSchema)
module.exports = Article;
