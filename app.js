const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const verify = require('./helpers/verify')



app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(morgan('dev'))



app.get('/blog', function(req, res){
    res.send({
      id     : 1,
      author : 'JK.Rowling',
      title : 'Harry Potter dan Teman-teman',
      article : 'Lorem ipsum dolor amet. ad astra per apera. Avacadabra.expecto patronus',
      createdAt : '17 mei 1992'
    },{
      id     : 2,
      author : 'Adam',
      title : 'How to console.log withhout console.log',
      article : 'Lorem ipsum dolor amet. ad astra per apera. Avacadabra.expecto patronus',
      createdAt : '20 aug 2012'
    },{
      id     : 3,
      author : 'Jhon Doe',
      title : 'Javascript vs Java Island',
      article : 'Lorem ipsum dolor amet. ad astra per apera. Avacadabra.expecto patronus',
      createdAt : '17 mei 2017'
    },{
      id     : 4,
      author : 'Foo Bar',
      title : 'Biography of Steve jobes',
      article : 'Lorem ipsum dolor amet. ad astra per apera. Avacadabra.expecto patronus',
      createdAt : '17 dec 2006'
    },{
      id     : 5,
      author : 'Dummy',
      title : 'create data dummmy',
      article : 'Lorem ipsum dolor amet. ad astra per apera. Avacadabra.expecto patronus',
      createdAt : '18 april 2017'
    });
});


app.post('/blog', function(req, res) {
  res.send({
    author: req.body.author,
    title : req.body.title,
    article : req.body.article,
    createdAt : req.body.createdAt
  })
})

app.delete('/blog/:id', function(req, res) {
  res.send({})
})

app.post('/blog/login', function(req, res) {
  res.send({})
})


app.listen(4000, function(){
  console.log(`i'm alive 4000`);
});


module.exports = app;
