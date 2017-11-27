const router = require('express').Router()
const controller = require('../controller/articles')

router.post('/save', controller.save)
router.get('/article', controller.list)
router.delete('/article/:id', controller.remove)

module.exports = router