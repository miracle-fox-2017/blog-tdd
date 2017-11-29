const express = require('express')
const router  = express.Router()
const blogController = require('../controllers/blog')
const userController = require('../controllers/user')
const registerController = require('../controllers/register')
const verify = require('../helpers/verify')


// TODO: perbaiki mocah chai nya

router.post('/signin', registerController.signin)

router.post('/signup', registerController.signup)


router.get('/blog',  blogController.getAllBlogPosts)

router.post('/blog',  blogController.creatBlogPost)

router.get('/blog/:_id', blogController.findById)

router.put('/blog/:_id', blogController.findByIdAndUpdate)

router.delete('/blog/:_id', verify.isLogin, blogController.findByIdAndRemove)


router.get('/users', userController.getAllUsers)

router.post('/users', userController.create)

router.get('/users/:id', userController.findOne)

router.put('/users/:id', userController.findByIdAndUpdate)

router.delete('/users/:id', userController.findByIdAndRemove)

module.exports = router
