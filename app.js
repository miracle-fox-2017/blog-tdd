const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(morgan('tiny'))
app.use(cors())

//route variable
const index = require('./routers/indexRouter')
const blog = require('./routers/blogRouter')

//route use
app.use('/', index)
app.use('/api', blog)

//listen
// app.listen(3000, () => {
//   console.log('App running on port 3000!')
// })

module.exports = app.listen(3000, () => {
  console.log('App running on port 3000!')
})