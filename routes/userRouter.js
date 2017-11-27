const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

// Find all users
router.get('/', userController.findAllUsers)

// Adding new user
router.post('/', userController.addNewUser)

// Delete user
router.delete('/:id', userController.removeUser)

// Update user
router.put('/:id', userController.updateUser)

module.exports = router
