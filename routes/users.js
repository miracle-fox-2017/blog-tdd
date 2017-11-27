const router = require('express').Router()
const userControllers = require('../controllers/userControllers')

router.get('/', userControllers.getOne)
router.post('/signup', userControllers.signup)
router.put('/', userControllers.update)
router.delete('/', userControllers.remove)

module.exports = router;
