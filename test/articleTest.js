const chai = require('chai');
const expect = chai.expect
const app = require('../app')
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// Test Data Article
let article = {
  title: 'Test API Post Article',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  author: 'APP Test',
  category: 'Test',
  createdAt: Date.now,
}
let update = {
  title: 'Test API Update Article',
  content: 'Update article test'
}
let tempIdArticle

describe('Blog App Test Article', function() {
  it('Create article', function(done) {
    chai.request(app)
    .post('/articles')
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
    .send(update)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.title).to.equal(update.title);
      expect(res.body._id).to.equal(tempIdArticle);
      done()
    })
  }),
  it('Delete article', function(done) {
    chai.request(app)
    .delete(`/articles/${tempIdArticle}`)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('deleted')
      expect(res.body.data.title).to.equal(update.title);
      expect(res.body.data._id).to.equal(tempIdArticle);
      done()
    })
  })
})
