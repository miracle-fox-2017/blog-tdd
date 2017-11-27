const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title : String,
  article : String,
  category : String
});

module.exports = mongoose.model('Article', articleSchema);
