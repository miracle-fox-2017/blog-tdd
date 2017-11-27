// const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/article?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
const mongoose = require('mongoose').connect('mongodb://localhost/article');
const Article = require('../models/articleModel')
const ObjectId = require('mongodb').ObjectId


const findAll = (req, res) => {
  Article.find()
  .then(articles => {
    console.log(articles);
    res.status(200).send(
    {
      articles
    })
  })
  .catch(err => res.status(500).send(err))
}

const create = (req, res) => {
  let input = req.body
  console.log('INI INPUT', input);
  let objArticle = {
    title: input.title,
    article: input.article,
    category: input.category
  }
  console.log(objArticle);
  Article.create(objArticle)
  .then(newdataArticle => {
    res.status(200).send(
    {
      msg: 'Success created',
      data: newdataArticle
    })
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const update = (req, res) => {
  let id = ObjectId(req.params.id)
  let edit = req.body
  // console.log('CEK STATUS',id);
  Article.findById(id)
  .then(dataArticle => {
    dataArticle.title = edit.title,
    dataArticle.article = edit.article,
    dataArticle.category = edit.category
    dataArticle.save(function(err) {
      if (err) throw err;
      res.status(200).send(
      {
        msg: 'Article successfully updated!'
      });
    });
  })
  .catch(err => res.status(500).send(err))
}

const destroy = (req, res) => {
  let id = {_id : ObjectId(req.params.id)}
  Article.deleteOne(id)
  .then(dataArticle => res.send(
  {
    msg: 'Successfully Delete',
    data: dataArticle
  }))
  .catch(err => {
    console.log('KOK ERROR',err);
    res.status(500).send(err)
  })
}


module.exports = {
  findAll,
  create,
  update,
  destroy
};
