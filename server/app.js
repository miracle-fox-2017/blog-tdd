const app = require('express')()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


mongoose.connect('mongodb://localhost/tdddb', (err) => {
  if(!err) {
    console.log('DATABASE TERHUBUNG');
  } else {
    console.log('TIDAK TERHUBUNG DATABASE');
  }
})

const article = require('./routes/articleRoute')
const user    = require('./routes/userRoute')

app.use('/api/article', article)
app.use('/api/user', user)

app.listen(3000, (req, res) => {
  console.log('jalan di 3000 guys')
})

module.exports = app