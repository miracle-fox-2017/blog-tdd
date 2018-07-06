const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController.js')

// Get login credentials
router.post('/', loginController.getLogin)

module.exports = router
