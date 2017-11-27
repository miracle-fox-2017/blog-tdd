const router = require('express').Router()
const article = require('../controllers/articleControllers')

router.post('/', article.create)
router.get('/', article.getAll)
router.get('/:id', article.getById)
router.delete('/:id', article.remove)

module.exports = router
