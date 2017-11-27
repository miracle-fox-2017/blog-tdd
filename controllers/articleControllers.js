const Article = require('../models/articleModel')

getOne = (req, res) => {
  Article.findById(req.query.id)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

post = (req, res) => {
  Article.create(req.body)
  .then(response => {
    let status = {
      status: 'success',
      data: response
    }
    res.status(200).send(status)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

update = (req, res) => {
  Article.findByIdAndUpdate(req.query.id, { $set: req.body}, { new: true })
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

remove = (req, res) => {
  Article.findByIdAndRemove(req.query.id)
  .then(response => {
    let status = {
      status: 'deleted',
      data: response
    }
    res.status(200).send(status)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  getOne,
  post,
  update,
  remove
}
