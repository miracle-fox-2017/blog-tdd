var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var middleware = require("../helpers/middleware");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
  	message: "Hello World"
  })
});

router.post('/login', middleware.logIn, userController.logIn);

router.post('/register', userController.create);



module.exports = router;
