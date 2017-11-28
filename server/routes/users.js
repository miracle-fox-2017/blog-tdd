var express = require('express');
var router = express.Router();
const User = require('../controllers/userControllers');

// *** api routes *** //
router.get('/users', User.findAllUsers);
router.get('/user/:id', User.findUserById);
router.post('/signup', User.addUser);
router.put('/user/:id', User.updateUser);
router.delete('/user/:id', User.deleteUser);
router.post('/signin', User.signin);

module.exports = router;
