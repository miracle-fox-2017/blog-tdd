const express = require('express');
const router = express.Router();
const Article = require('../models/article.js')
const Controller = require('../controllers/article.js')

router.post('/add', Controller.create);
router.get('/article/:articleId', Controller.find);
router.delete('/article/:articleId', Controller.remove);


module.exports = router;
