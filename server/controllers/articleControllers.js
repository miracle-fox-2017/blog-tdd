const ObjectId = require('mongodb').ObjectId
const Article = require('../models/articleModel')

const create = (req, res) => {
  let article = new Article({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    category: req.body.category,
    createdAt: new Date()
  })

  article.save()
  .then(article => res.status(200).send(article))
  .catch(err => res.status(500).send(err))
}

const getAll = (req, res) => {
  Article.find()
  .then(articles => res.status(200).send(articles))
  .catch(err => res.status(500).send(err))
}

const getById = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}
  Article.findById(id)
  .then(article => res.status(200).send(article))
  .catch(err => res.status(500).send(err))
}

const remove = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}

  Article.findByIdAndRemove(id)
  .then(article => {
    res.status(200).send(article)
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  create,
  getAll,
  getById,
  remove
}
