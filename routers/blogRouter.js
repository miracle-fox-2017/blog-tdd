const router = require('express').Router()

//require controllers
const blogController = require('../controllers/blogController')

//require helper
const hashPassword = require('../helpers/hashPassword')
const verifyToken  = require('../middlewares/verifyToken')

//route
router.get('/', blogController.welcomePage)

// | /api/blog      | POST   | token(header), newpost   | Post new blog       |
router.post('/blog', verifyToken.loginState, blogController.postBlog)

// | /api/blog      | GET    | token(header)            | Get blog post       |
router.get('/blog', blogController.getBlogs)

// | /api/blog/:id  | GET    | token(header),id(params) | Get blog post       |
router.get('/blog/:id', blogController.getBlog)

// | /api/blog/:id  | DELETE | token(header),id(params) | Delete blog post    |
router.delete('/blog/:id', blogController.delBlog)

// | /api/signin    | POST   | username, password       | return token        |
router.post('/signin', hashPassword.reHashed, blogController.signin)

// | /api/signup    | POST   | username, password       | return token        |
router.post('/signup', hashPassword.hashed, blogController.signup)

// | /api/verify    | POST   | token(header)            | return status login |
router.post('/verify', blogController.verify)

//export
module.exports = router;