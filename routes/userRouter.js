const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const loginController = require('../controllers/loginController.js')

// Find all users
router.get('/', loginController.verifyLogin, loginController.verifyAdmin, userController.findAllUsers)

// Adding new user
router.post('/', loginController.verifyLogin, loginController.verifyAdmin, userController.addNewUser)

// Delete user
router.delete('/:id', loginController.verifyLogin, loginController.verifyById, userController.removeUser)

// Update user
router.put('/:id', loginController.verifyLogin, loginController.verifyById, userController.updateUser)

module.exports = router
