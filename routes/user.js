const express = require('express')
const router = express.Router()
const Users = require('../controllers/userControllers')

router.post('/', Users.createUser)
router.get('/', Users.findAllUser)
router.put('/:id', Users.updateUser)
router.delete('/:id', Users.destroyUser)

module.exports = router