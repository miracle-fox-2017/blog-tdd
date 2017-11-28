const mongoose = require('mongoose').connect('mongodb://localhost/blog');
const Schema = mongoose.Schema;

let articleSchema = new Schema({
    title : String,
    konten : String,
})

let Articles = mongoose.model('Articles', articleSchema)

module.exports = Articles
