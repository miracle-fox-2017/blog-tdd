const article = require('../models/articles')


var getAllArticle = (req, res) => {
  article.find().then((hasil) => {
    res.status(200).send(hasil)
  }).catch((err) => {
    res.status(404).send(err)
  })
}

var postArticle = (req, res) => {
  article.create({
    title: req.body.title,
    description: req.body.description
  }).then((hasil) => {
    res.status(200).send({
      status: "success",
      _id: hasil._id,
      title: hasil.title,
      description: hasil.description
    })
  }).catch((err) => {
    res.status(404).send(err)
  })
}

var editArticle = (req, res) => {
  article.findById({_id: req.params.id}).then((hasil) => {
    hasil.title = req.body.title,
    hasil.description = req.body.description

    hasil.save(function(err) {
      if(err) {
        res.status(404).send(err)
      } else {
        res.status(200).send({
          _id: hasil._id,
          status: "updated",
          title: hasil.title,
          description: hasil.description
        })
      }
    })

  }).catch((err) => {
    res.status(404).send(err)
  })
}

var deleteArticle = (req, res) => {
  article.findById({_id: req.params.id}).then((hasil) => {
    hasil.remove((err) => {
      if(err) {
        res.status(404).send(err)
      }
      else {
        res.status(200).send({
          status: "deleted",
          _id: hasil._id,
          title: hasil.title,
          description: hasil.description
        })
      }
    })
  }).catch((err) => {
    res.status(404).send(err)
  })
}

module.exports = {
  getAllArticle,
  postArticle,
  editArticle,
  deleteArticle
};
