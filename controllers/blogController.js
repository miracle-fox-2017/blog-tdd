const ArticleModel = require('../models/articleModel')
const Helper = require('../helpers/helper');
const ObjectId = require('mongodb').ObjectID;

const create = (req, res) => {

	let article = new ArticleModel({
		title: req.body.title,
		content: req.body.content,
		category: req.body.category,
		author: req.body.author
	})


	article.save()
		.then(newArticle => {

			res.status(200).send({
				message: "Article created",
				article: newArticle
			})

		}).catch(err => res.status(500).send(err.message));
}

const findAll = (req, res) => {
	ArticleModel.find()
		.then(articles => {
		res.status(200).send(articles);

		}).catch(err => res.status(500).send(err.message));
}

const findById = (req, res) => {
	ArticleModel.findById(req.params.articleId)
		.then(article => {

		if (article) {
			res.status(200).send(article);
		} else {
			res.status(500).send({ message: "Article not found" })
		}

		}).catch(err => res.status(500).send(err.message));
}

const update = (req, res) => {
	ArticleModel.findOne({
		_id: ObjectId(req.params.articleId)
	}).then(article => {

		if (article) {
			article.title = req.body.title || article.title;
			article.content = req.body.content || article.content;
			article.category = req.body.category || article.category;
			article.author = req.body.author || article.author;

			article.save()
				.then(newArticle => {
					res.status(200).send({
						message: "Article updated",
						article: newArticle
					})

				}).catch(err => res.status(500).send(err.message));
		}

	}).catch(err => res.status(500).send({message: err.message}));
}

const destroy = (req, res) => {
	ArticleModel.findByIdAndRemove(ObjectId(req.params.articleId), (err, deletedArticle) => {
		if (err) {
			res.status(500).send({message: "Unauthorized delete action", error: err.message});
		} else {
			res.status(200).send({
				message: 'Article deleted',
				article: deletedArticle
			});
		}

	})
}

module.exports = {
	create,
	update,
	destroy,
	findAll,
	findById
}