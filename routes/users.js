const router = require('express').Router()
const user = require('../controllers/userControllers')

router.post('/', user.create)
router.post('/login', user.login)
router.get('/', user.getAll)
router.get('/:id', user.getById)
router.put('/:id', user.update)
router.delete('/:id', user.remove)

module.exports = router
