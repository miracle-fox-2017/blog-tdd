const express = require('express')
const router = express.Router()
const article = require('../controllers/articles')

router.get('/articles', article.getAllArticle)

router.post('/articles', article.postArticle)

router.put('/articles/edit/:id', article.editArticle)

router.delete('/articles/delete/:id', article.deleteArticle)

module.exports = router;
