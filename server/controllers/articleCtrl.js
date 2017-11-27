const Article = require('../models/articleModel')

class ArticleCtrl {

  static createArticle (req, res) {
    req.body.author = req.params.id
    let article = new Article(req.body)
    article.save()
    .then(newArticle => res.status(200).send(newArticle))
    .catch(err => res.status(500).send(err))
  }

  static getAllArticle (req, res) {
    Article.find({
      author : req.params.id
    })
    .then(articles => res.status(200).send(articles))
    .catch(err => res.status(500).send(err))
  }

  static getArticleById (req, res) {
    Article.findById(req.params.id)
    .then(article => res.status(200).send(article))
    .catch(err => res.status(500).send(err))
  }

  static updateArticleById (req, res) {
    Article.findById(req.params.id)
    .then(article => {
      article.title = req.body.title || article.title
      article.textPost = req.body.textPost || article.textPost
      article.category = req.body.category || article.category

      article.save()
      .then(newArticle => res.status(200).send(newArticle))
      .catch(err => res.status(500).send(err))
    })
    .catch(error => res.status(500).send(error))
  }

  static deleteArticleById (req, res) {
    Article.findByIdAndRemove(req.params.id)
    .then(article => res.status(200).send(article))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = ArticleCtrl