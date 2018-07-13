const router = require('express').Router(),
      User = require('../controllers/userController')

router.post('/register', User.create)

router.post('/login', User.login)

module.exports = router;
