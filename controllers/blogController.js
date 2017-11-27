const Blog = require('../models/blogModel.js')

// Find all articles
let findAllArticles = function(req,res){
  Blog.find().populate('user').then(function(dataArticles){
    res.status(200).send(dataArticles)
  })
}

// Adding new articles
let postNewArticle = function(req,res){
  let newArticle = Blog(
    {
      title: req.body.title,
      user: req.body.idUser,
      content: req.body.content
    }
  )
  newArticle.save().then(function(dataArticles){
    res.status(200).send(dataArticles)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Deleting selected article
let removeArticle = function(req,res){
  Blog.findOneAndRemove(
    {
      _id: req.params.id
    }
  ).then(function(dataArticles){
    res.status(200).send(dataArticles)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Update an article
let updateArticle = function(req,res){
  Blog.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date()
    }
  ).then(function(dataArticles){
    res.status(200).send(dataArticles)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

module.exports = {
  findAllArticles,
  postNewArticle,
  removeArticle,
  updateArticle
}
