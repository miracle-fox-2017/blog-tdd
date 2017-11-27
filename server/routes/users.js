var express = require('express');
var router = express.Router();
const user = require('../controllers/controllerUser')
/* GET users listing. */
// router.get('/',);
router.post('/signup', user.createUser)
router.post('/signin', user.getDataUser)
module.exports = router;
