var express = require('express');
var router = express.Router();
var middleware = require('../helpers/middleware');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', userController.findAll);

router.get('/:userId', middleware.isLogin, userController.findById);

// router.post('/', userController.create);

router.put('/:userId', middleware.isLogin, userController.update);

router.delete('/:userId', middleware.isLogin, userController.destroy);

module.exports = router;