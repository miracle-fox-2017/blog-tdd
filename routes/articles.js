const router = require('express').Router()
const articleControllers = require('../controllers/articleControllers')

router.get('/:id', articleControllers.getOne)
router.post('/', articleControllers.post)
router.put('/:id', articleControllers.update)
router.delete('/:id', articleControllers.remove)

module.exports = router;
