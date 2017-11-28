const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: String,
	content:  String,
	category:   String,
	author: String,
	createdAt: { type: Date, default: Date.now }
});

const ArticleModel = mongoose.model('Article', articleSchema);

module.exports = ArticleModel;