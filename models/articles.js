const mongoose = require('mongoose')
const Schema = mongoose.Schema

var articleSchema = new Schema({
  title: { type: String, required: true },
  description: {type: String, required: true}
})

var article = mongoose.model('articles', articleSchema)

module.exports = article;
