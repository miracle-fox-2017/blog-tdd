const express = require('express')
const router  = express.Router()
const blogController = require('../controllers/blog')
const userController = require('../controllers/user')

router.get('/blog', blogController.getAllBlogPosts)

router.post('/blog', blogController.creatBlogPost)

router.get('/blog/:_id', blogController.findById)

router.put('/blog/:_id', blogController.findByIdAndUpdate)

router.delete('/blog/:_id', blogController.findByIdAndRemove)


router.get('/users', userController.getAllUsers)

router.post('/users/', userController.create)


module.exports = router
