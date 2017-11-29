const router = require('express').Router()
const usersController = require('../controllers/usersController')

router.get('/', usersController.findAll)
router.post('/', usersController.create)
router.put('/:id', usersController.update)
router.delete('/:id', usersController.destroy)

module.exports = router;
