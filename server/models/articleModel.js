const mongoose = require('mongoose')
const Schema = mongoose.Schema

var articleSchema = new Schema({
	title    : String,
  textPost : String,
  category : String,
  author : {
    type: Schema.Types.ObjectId,
		ref : 'User'
  }
})

var Article = mongoose.model('Article', articleSchema)

module.exports = Article