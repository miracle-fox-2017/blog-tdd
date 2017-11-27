var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');

/* GET home page. */
router.get('/',  blogController.findAll);

router.get('/:articleId', blogController.findById);

router.post('/', blogController.create);

router.put('/:articleId', blogController.update);

router.delete('/:articleId',  blogController.destroy);

module.exports = router;