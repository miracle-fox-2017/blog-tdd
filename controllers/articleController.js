const ObjectId = require('mongodb').ObjectId
const Article = require('../models/articleModel')

const createArticle = function(req,res){
  
  let newArticle = Article({
    title : req.body.title,
    category : req.body.category,
    description : req.body.description
  })
  newArticle.save().then(function(data_Article){
    res.status(201).send({
      message : `[+] 1 article created`,
      data_Article : data_Article
    })
  }).catch(function(err){
    res.status(500).send(`[-] err create article`)
  })
}

const findAllArticle = function(req,res){
  Article.find().then(function(data_Article){
    res.status(200).send(data_Article)
  }).catch(function(err){
    res.status(500).send(`[-] err find all article`)
  })
}

const updateArticle = function(req,res){
  console.log('masuk')
  let id = {
    _id : ObjectId(req.params.id)
  }
  Article.findById(id).then(function(data_Article){
    // console.log(data_Article)
    data_Article.title = req.body.title,
    data_Article.category = req.body.category,
    data_Article.description = req.body.description
    // save
    data_Article.save().then(function(data_Article){
      res.status(201).send({
        message : `[+] 1 article created`,
        data_Article : data_Article
      })
    }).catch(function(err){
      res.status(500).send(`[-] err update article`)
    })
  }).catch(function(err){
    res.status(500).send(`[-] err find by id article`)
  })
}

const destroyArticle = function(req,res){
  let id = {
    _id : ObjectId(req.params.id)
  }
  Article.findByIdAndRemove(id).then(function(){
    res.status(200).send(`[-] deleted 1 article`)
  }).catch(function(err){
    res.status(500).send(`[-] err delete by id article`)
  })
}

module.exports = {
  createArticle,
  findAllArticle,
  updateArticle,
  destroyArticle
}