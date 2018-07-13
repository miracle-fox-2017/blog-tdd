const router = require('express').Router()
const userControllers = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth.isLogin, checkAuth.isAdmin, userControllers.getAll)
router.get('/:id', checkAuth.isLogin, userControllers.getOne)
router.post('/signup', userControllers.signup)
router.put('/:id', checkAuth.isLogin, userControllers.update)
router.delete('/:id', checkAuth.isLogin, userControllers.remove)
router.post('/login', userControllers.login)

module.exports = router;
