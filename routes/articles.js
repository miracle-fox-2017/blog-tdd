var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
var middleware = require('../helpers/middleware');

/* GET home page. */
router.get('/',  blogController.findAll);

router.get('/:articleId', blogController.findById);

router.post('/', middleware.isLogin, blogController.create);

router.put('/:articleId', middleware.isLogin, blogController.update);

router.delete('/:articleId', middleware.isLogin, blogController.destroy);

module.exports = router;