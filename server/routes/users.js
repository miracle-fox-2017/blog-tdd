const router = require('express').Router()

router.post('/register', (req, res) => {
  res.status(200).send(req.body)
})

module.exports = router;
