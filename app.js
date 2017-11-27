const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

// Router requirement
const index = require('./routes/indexRouter.js')
const blog = require('./routes/blogRouter.js')
const user = require('./routes/userRouter.js')

// Mongoose
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-lxcs3.mongodb.net:27017,cluster0-shard-00-01-lxcs3.mongodb.net:27017,cluster0-shard-00-02-lxcs3.mongodb.net:27017/mongoose_blog?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
  useMongoClient: true
});

// App use
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Using routes
app.use('/',index)
app.use('/articles', blog)
app.use('/users', user)

// Listening port
app.listen(3000, () => console.log('Example app listening on port 3000!'))
