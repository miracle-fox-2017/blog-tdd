const express = require('express')
const router = express.Router()
const Users = require('../controllers/userControllers')

router.post('/', Users.createUser)
router.get('/', Users.findAllUser)
router.put('/:id', Users.updateUser)
router.delete('/:id', Users.destroyUser)
router.post('/login', Users.userLogin)

module.exports = router