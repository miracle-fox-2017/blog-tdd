var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  name: String,
  title: String,
  article: String,
});

module.exports = mongoose.model('blogs', blogSchema);
