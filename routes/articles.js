const router = require('express').Router()
const articleControllers = require('../controllers/articleControllers')
const checkAuth = require('../middleware/checkAuth')

router.get('/', articleControllers.getAll)
router.get('/:id', articleControllers.getOne)
router.post('/', checkAuth.isLogin, articleControllers.post)
router.put('/:id', checkAuth.isLogin, articleControllers.update)
router.delete('/:id', checkAuth.isLogin, articleControllers.remove)

module.exports = router;
