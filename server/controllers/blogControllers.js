const Blog = require('../models/blogModels');

// *** get ALL blogs *** //
const findAllBlogs = (req, res) => {
  Blog.find(function(err, blogs) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(blogs);
    }
  });
}

// *** get SINGLE blogs *** //
const findBlogById = (req, res) => {
  Blog.findById(req.params.id, function(err, blog) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(blog);
    }
  });
}

// *** post ALL blogs *** //
const addBlog = (req, res) => {
  var newBlog = new Blog({
    name: req.body.name,
    title: req.body.title,
    article: req.body.article,
  });
  newBlog.save(function(err) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS': newBlog});
    }
  });
}

// *** put SINGLE blog *** //
const updateBlog = (req, res) => {
  Blog.findById(req.params.id, function(err, blog) {
    blog.name = req.body.name;
    blog.title = req.body.title;
    blog.article = req.body.article;
    blog.save(function(err) {
      if(err) {
        res.json({'ERROR': err});
      } else {
        res.json({'UPDATED': blog});
      }
    });
  });
}

// *** delete SINGLE blog *** //
const deleteBlog = (req, res) => {
  Blog.findById(req.params.id, function(err, blog) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      blog.remove(function(err){
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'REMOVED': blog});
        }
      });
    }
  });
}

module.exports = {
  findAllBlogs,
  findBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
};
