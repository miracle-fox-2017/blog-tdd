const router = require('express').Router()
const articleController = require('../controllers/articleController')


router.get('/', articleController.findAll)
router.post('/', articleController.create)
router.put('/:id', articleController.update)
router.delete('/:id', articleController.destroy)
// router.put('/:id/join', articleController.join)

module.exports = router
