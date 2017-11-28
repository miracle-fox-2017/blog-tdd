process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();
var mongoose = require('mongoose');
var Blog = require('../server/models/blogModels');
var User = require('../server/models/userModels');

chai.use(chaiHttp);

//BLOGS API
describe('Blogs', function () {

  Blog.collection.drop();
  beforeEach(function (done) {
    var newBlog = new Blog({
      name: 'namatest',
      title: 'learn chai',
      article: 'isi artikel',
    });
    newBlog.save(function (err) {
      done();
    });
  });

  afterEach(function (done) {
    Blog.collection.drop();
    done();
  });

  it('should list ALL blogs on /blogs GET', function (done) {
    chai.request(server)
    .get('/blogs')
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('article');
      res.body[0].name.should.equal('namatest');
      res.body[0].title.should.equal('learn chai');
      res.body[0].article.should.equal('isi artikel');
      done();
    });
  });

  it('should list a SINGLE blog on /blog/<id> GET', function (done) {
    var newBlog = new Blog({
      name: 'test name',
      title: 'test title',
      article: 'test article',
    });
    newBlog.save(function (err, data) {
      chai.request(server)
      .get('/blog/' + data.id)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('title');
        res.body.should.have.property('article');
        res.body.name.should.equal('test name');
        res.body.title.should.equal('test title');
        res.body.article.should.equal('test article');
        res.body._id.should.equal(data.id);
        done();
      });
    });
  });

  it('should add a SINGLE blog on /blogs POST', function (done) {
    chai.request(server)
    .post('/blogs')
    .send({
      'name': 'ian',
      'title': 'Script',
      'article': 'yes this is content'
    })
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('title');
      res.body.SUCCESS.should.have.property('article');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.name.should.equal('ian');
      res.body.SUCCESS.title.should.equal('Script');
      done();
    });
  });

  it('should update a SINGLE blog on /blog/<id> PUT', function(done) {
    chai.request(server)
    .get('/blogs')
    .end(function(err, res){
      chai.request(server)
      .put('/blog/' + res.body[0]._id)
      .send({'name': 'ganti namatest'})
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('UPDATED');
        response.body.UPDATED.should.be.a('object');
        response.body.UPDATED.should.have.property('name');
        response.body.UPDATED.should.have.property('_id');
        response.body.UPDATED.name.should.equal('ganti namatest');
        done();
      });
    });
  });
  it('should delete a SINGLE blog on /blog/<id> DELETE', function(done) {
    chai.request(server)
    .get('/blogs')
    .end(function(err, res){
      chai.request(server)
      .delete('/blog/'+res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('REMOVED');
        response.body.REMOVED.should.be.a('object');
        response.body.REMOVED.should.have.property('name');
        response.body.REMOVED.should.have.property('_id');
        response.body.REMOVED.name.should.equal('namatest');
        done();
      });
    });
  });

});

//USER API
describe('Users', function () {

  User.collection.drop();
  beforeEach(function (done) {
    var newUser = new User({
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
    });
    newUser.save(function (err) {
      done();
    });
  });

  afterEach(function (done) {
    User.collection.drop();
    done();
  });

  it('should list ALL users on /users GET', function (done) {
    chai.request(server)
    .get('/users')
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('email');
      res.body[0].should.have.property('password');
      res.body[0].name.should.equal('admin');
      res.body[0].email.should.equal('admin@admin.com');
      res.body[0].password.should.equal('admin');
      done();
    });
  });

  it('should list a SINGLE user on /user/<id> GET', function (done) {
    var newUser = new User({
      name: 'user',
      email: 'user@yahoo.com',
      password: 'user123',
    });
    newUser.save(function (err, data) {
      chai.request(server)
      .get('/user/' + data.id)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        res.body.name.should.equal('user');
        res.body.email.should.equal('user@yahoo.com');
        res.body.password.should.equal('user123');
        res.body._id.should.equal(data.id);
        done();
      });
    });
  });

  it('should add a SINGLE user on /signup POST', function (done) {
    chai.request(server)
    .post('/signup')
    .send({
      name: 'user',
      email: 'user@yahoo.com',
      password: 'user123',
    })
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('name');
      res.body.should.have.property('email');
      res.body.name.should.equal('user');
      res.body.email.should.equal('user@yahoo.com');
      done();
    });
  });

  it('should update a SINGLE user on /user/<id> PUT', function(done) {
    chai.request(server)
    .get('/users')
    .end(function(err, res){
      chai.request(server)
      .put('/user/' + res.body[0]._id)
      .send({'name': 'admin123'})
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('UPDATED');
        response.body.UPDATED.should.be.a('object');
        response.body.UPDATED.should.have.property('name');
        response.body.UPDATED.should.have.property('_id');
        response.body.UPDATED.name.should.equal('admin123');
        done();
      });
    });
  });
  it('should delete a SINGLE user on /user/<id> DELETE', function(done) {
    chai.request(server)
    .get('/users')
    .end(function(err, res){
      chai.request(server)
      .delete('/user/'+res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('REMOVED');
        response.body.REMOVED.should.be.a('object');
        response.body.REMOVED.should.have.property('name');
        response.body.REMOVED.should.have.property('_id');
        response.body.REMOVED.name.should.equal('admin');
        done();
      });
    });
  });

  it('should test login for user', function (done) {
    chai.request(server)
    .post('/signin')
    .send({
      email: 'admin@admin.com',
      password: 'admin',
    })
    .end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.email.should.equal('admin@admin.com');
      done();
    });
  });

});
