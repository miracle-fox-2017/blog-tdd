const Article = require('../models/article.js')


function create(req,res) {
  let article = new Article(req.body)
  article.save((err,result) => {
  	if(err){
  		res.status(500).send(err);
  	}
  	res.status(200).send(result);
  })	// body...
}


function find(req,res) {
	Article.findOne({
	  	_id : req.params.articleId
	  })
	  .then(result => {
	  	res.status(200).send(result)
	  })
	  .catch(err => {
	  	res.status(500).send(err);
	})	
}

function remove(req,res) {
  Article.findOne({
  	_id : req.params.articleId
  }).exec(function(err,data) {
  	Article.remove({
  		_id : req.params.articleId
  	}).exec(function(err2) {
  		if(err2){
  			res.status(500).send(err)
  		}
  		res.send(data)
  	})
  })	
}


module.exports = {
	remove,
	find,
	create
}