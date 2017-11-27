var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Blogs', function() {

  it('tampilkan semua blog GET', function(done) {
    chai.request(app)
      .get('/api/articles')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array')
        done();
      });
  })


  it('tambah article', function(done) {
    chai.request(app)
    .post('/api/articles')
    .send({"title": "Java", "description": "sejarah di tanah jawa di masa lampau"})
    .end(function(err, res) {
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.have.property('_id')
      res.body.should.have.property('status')
      res.body.should.have.property('title');
      res.body.should.have.property('description')
      res.body.status.should.equal('success');
      res.body.title.should.equal('Java');
      res.body.description.should.equal('sejarah di tanah jawa di masa lampau')
      done()
    })
  })

  it('update artikel', function(done) {
  chai.request(app)
    .get('/api/articles')
    .end(function(err, res){
      chai.request(app)
        .put('/api/articles/edit/'+res.body[0]._id)
        .send({'title': 'Sunda', 'description': 'tanah gadis cakep'})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.have.property('title')
          response.body.should.have.property('description')
          response.body.should.have.property('_id')


          done();
      });
    });
});

  it('delete artikel', function(done) {
  chai.request(app)
    .get('/api/articles')
    .end(function(err, res){
      chai.request(app)
        .delete('/api/articles/delete/'+res.body[0]._id)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.have.property('title')
          response.body.should.have.property('description')
          response.body.should.have.property('_id')
          done();
      });
    });
  });


it('signin', function(done) {
  chai.request(app)
  .post('/api/signin')
  .send({'email': 'adit@gmail.com', 'password': 'adit'})
  .end(function(err, res) {
    res.should.have.status(200)
    res.body.should.have.property('status')
    res.body.should.have.property('token')
    done()
  })
})







})
