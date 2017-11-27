const express = require('express'),
    router = express.Router(),
    article = require('../controllers/controllerArticle');

/* GET users listing. */
router.get('/', article.getDataArticle);
router.post('/', article.createArticle)
router.put('/:id', article.updateArticle)
router.delete('/:id', article.deleteArticle)
// router.delete('/:id', function (req, res) {
//     res.status(200).send()
// })

module.exports = router;
