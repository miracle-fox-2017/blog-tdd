const router = require('express').Router()
const articleControllers = require('../controllers/articleControllers')

router.get('/', articleControllers.getOne)
router.post('/', articleControllers.post)
router.put('/', articleControllers.update)
router.delete('/', articleControllers.remove)

module.exports = router;
