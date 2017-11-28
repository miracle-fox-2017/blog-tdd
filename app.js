const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog', { useMongoClient: true })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const articles = require('./routes/articles')
const users = require('./routes/users')

app.use('/articles', articles)
app.use('/users', users)

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000!');
})

module.exports = app
