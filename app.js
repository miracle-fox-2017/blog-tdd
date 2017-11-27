const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const articles = require('./routes/articles')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/blog', articles)


app.post('/api/blog/login', (req, res) => {
    Articles.find()
})


module.exports = app.listen(3000, () => console.log('Example app listening on port 3000!'))