var express = require('express');
var router = express.Router();
const Blog = require('../controllers/blogControllers');

// *** api routes *** //
router.get('/blogs', Blog.findAllBlogs);
router.get('/blog/:id', Blog.findBlogById);
router.post('/blogs', Blog.addBlog);
router.put('/blog/:id', Blog.updateBlog);
router.delete('/blog/:id', Blog.deleteBlog);

module.exports = router;
