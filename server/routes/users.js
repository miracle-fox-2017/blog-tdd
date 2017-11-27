const express = require('express');
const router = express.Router();
const Controller = require('../controllers/user.js')


router.post('/login', Controller.signIn);
router.post('/signup', Controller.signUp);


module.exports = router;
