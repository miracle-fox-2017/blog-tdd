const router = require('express').Router()
const userControllers = require('../controllers/userControllers')

router.get('/:id', userControllers.getOne)
router.post('/signup', userControllers.signup)
router.put('/:id', userControllers.update)
router.delete('/:id', userControllers.remove)
router.post('/login', userControllers.login)

module.exports = router;
