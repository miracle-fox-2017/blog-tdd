require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.DATABASE_URL);

let blogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  article: String
});

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;