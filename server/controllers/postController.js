const Post = require('../models/postModel');

const create = (req, res) => {
  let post = new Post({
    title: req.body.title,
    post: req.body.post
  })
  
  post.save()
  .then(success => res.status(200).send(success))
  .catch(err => res.status(500).send(err))
}

const getAll = (req, res) => {
  Post.find({})
  .then(results => res.status(200).send(results))
  .catch(err => res.status(500).send(err))
}

const destroy = (req, res) => {
  Post.remove({
    id: req.body.id
  })
  .then(success => res.status(200).send(success))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  create,
  getAll,
  destroy
};
