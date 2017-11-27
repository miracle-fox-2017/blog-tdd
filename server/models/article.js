const mongoose = require('mongoose').connect('mongodb://localhost:27017/blog');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	author : String,
	title : String,
	year : Number
})


const articleModel = mongoose.model('article',articleSchema);

module.exports = articleModel
