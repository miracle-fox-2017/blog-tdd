const express = require('express')
const router = express.Router()

// Get homepage
router.get('/',function(req,res){
  res.status(200).send()
})

module.exports = router
