const chai = require('chai');
const expect = chai.expect
const app = require('../app')
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// Test Data User
let user = {
  username: 'testing',
  password: 'qwerty1234',
  first_name: 'Test',
  last_name: 'Application',
  email: 'test@mail.com',
}
let updateUser = {
  email: 'testing@vnx.com',
}
let tempIdUser,
    token

describe('Blog App Test User', function() {
  it('Create user', function(done) {
    chai.request(app)
    .post('/users/signup')
    .send(user)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success')
      expect(res.body.data.username).to.equal(user.username);
      expect(res.body.data).to.have.property('_id');
      tempIdUser = res.body.data._id
      done()
    })
  }),
  it('Login user', function(done) {
    chai.request(app)
    .post('/users/login')
    .send({username: user.username, password: user.password})
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      token = res.body.token
      done()
    })
  }),
  it('Read user', function(done) {
    chai.request(app)
    .get(`/users/${tempIdUser}`)
    .set('token', token)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.title).to.equal(user.title);
      expect(res.body._id).to.equal(tempIdUser);
      done()
    })
  }),
  it('Update user', function(done) {
    chai.request(app)
    .put(`/users/${tempIdUser}`)
    .set('token', token)
    .send(updateUser)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.email).to.equal(updateUser.email);
      expect(res.body._id).to.equal(tempIdUser);
      done()
    })
  }),
  it('Delete user', function(done) {
    chai.request(app)
    .delete(`/users/${tempIdUser}`)
    .set('token', token)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('deleted')
      expect(res.body.data.title).to.equal(update.title);
      expect(res.body.data._id).to.equal(tempIdUser);
      done()
    })
  })
})

// Test Data Article
let article = {
  title: 'Test API Post Article',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  author: 'APP Test',
  category: 'Test',
  createdAt: Date.now,
}
let updateArticle = {
  title: 'Test API Update Article',
  content: 'Update article test'
}
let tempIdArticle

describe('Blog App Test Article', function() {
  it('Create article', function(done) {
    chai.request(app)
    .post('/articles')
    .set('token', token)
    .send(article)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success')
      expect(res.body.data.title).to.equal(article.title);
      expect(res.body.data).to.have.property('_id');
      tempIdArticle = res.body.data._id
      done()
    })
  }),
  it('Read article', function(done) {
    chai.request(app)
    .get(`/articles/${tempIdArticle}`)
    .set('token', token)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.title).to.equal(article.title);
      expect(res.body._id).to.equal(tempIdArticle);
      done()
    })
  }),
  it('Update article', function(done) {
    chai.request(app)
    .put(`/articles/${tempIdArticle}`)
    .set('token', token)
    .send(updateArticle)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.title).to.equal(updateArticle.title);
      expect(res.body._id).to.equal(tempIdArticle);
      done()
    })
  }),
  it('Delete article', function(done) {
    chai.request(app)
    .delete(`/articles/${tempIdArticle}`)
    .set('token', token)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('deleted')
      expect(res.body.data.title).to.equal(updateArticle.title);
      expect(res.body.data._id).to.equal(tempIdArticle);
      done()
    })
  })
})
