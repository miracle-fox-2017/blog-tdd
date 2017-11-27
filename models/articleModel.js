const mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  category: String,
  createdAt: Date
});

var articleModel = mongoose.model('Article', articleSchema);

module.exports = articleModel;
