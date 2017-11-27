const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  category : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  }
})

const articleModels = mongoose.model('Article', articleSchema)
module.exports = articleModels