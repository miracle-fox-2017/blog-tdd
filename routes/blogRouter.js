const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController.js')

// Get all articles
router.get('/', blogController.findAllArticles)

// Post new articles
router.post('/', blogController.postNewArticle)

// Delete article
router.delete('/:id', blogController.removeArticle)

// Update article
router.put('/:id', blogController.updateArticle)

module.exports = router
