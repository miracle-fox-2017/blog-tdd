const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const app = express()


//parse application/json and look for raw text      
app.use(morgan('dev'))                                  
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));

// connect db
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/blogTDD')
.then(function(){
  console.log('[+] database is listen');
}).catch(function(err){
  if(err){
    console.error(err)
  }
})

// routes
const article = require('./routes/article')
const user = require('./routes/user')

app.get("/", (req, res) => res.json({message: "Welcome to testing Blog API!"}))
app.use('/api/article', article)
app.use('/api/user', user)

app.listen(PORT, function(err){
  if(!err){
    console.log(`[+] server listen on PORT | 3000`);
  }
})