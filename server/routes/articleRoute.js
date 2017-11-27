const route   = require('express').Router()
const Article = require('../controllers/articleCtrl')

route.get('/:id', Article.getAllArticle)
route.get('/byarticle/:id', Article.updateArticleById)
route.post('/:id', Article.createArticle)
route.delete('/:id', Article.deleteArticleById)

module.exports = route