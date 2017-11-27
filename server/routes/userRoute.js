const route = require('express').Router()
const User  = require('../controllers/userCtrl')

route.post('/', User.createUser)
route.post('/login', User.loginUser)

module.exports = route