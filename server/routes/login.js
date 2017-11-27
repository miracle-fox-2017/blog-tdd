const router = require('express').Router()
const usersController = require('../controllers/usersController');

/* GET home page. */
router.post('/', usersController.signin);

module.exports = router
