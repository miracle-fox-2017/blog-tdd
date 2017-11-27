const chai = require('chai')
const chaiHTTP = require('chai-http')
const server = 'http://localhost:3000'
const should = chai.should()
const expect = chai.expect

chai.use(chaiHTTP)

describe('Blog', function () {
  it('Should get index page', function(done){
    chai.request(server)
    .get('/')
    .end(function(err,res){
      res.should.have.status(200)
      res.should.be.a('object')
      done()
    })
  })
  it('Should get all articles in database', function(done){
    chai.request(server)
    .get('/articles')
    .end(function(err,res){
      res.should.have.status(200)
      res.should.be.a('object')
      done()
    })
  })
  it('Should save added articles to database', function(done){
    let dummyUserId = '5a1be0833b216a6383ab3db5'
    let dummyArticles = {
      title: 'Makan Ayam',
      content: 'Makan ayam di pinggir jalan',
      idUser: dummyUserId,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    chai.request(server)
    .post('/articles')
    .send(dummyArticles)
    .end(function(err,res){
      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.should.have.property('title')
      res.body.should.have.property('createdAt')
      res.body.should.have.property('content')
      done()
    })
  })
  it('Should delete selected articles from database', function(done){
    let dummyDeleteArticle = '5a1bd8d754ed3c5eb2fc97f9'
    chai.request(server)
    .delete(`/articles/${dummyDeleteArticle}`)
    .end(function(err,res){
      res.should.have.status(200)
      res.body._id.should.equal(dummyDeleteArticle)
      done()
    })
  })
  it('Should update selected articles in database', function(done){
    let dummyUpdateArticle = '5a1be020b9516e62ca1c6cd9'
    let dummyObj = {
      title: 'Libur telah tiba',
      content: 'Liburkah kita',
      updatedAt: new Date()
    }
    chai.request(server)
    .put(`/articles/${dummyUpdateArticle}`)
    .send(dummyObj)
    .end(function(err,res){
      res.should.have.status(200)
      res.body._id.should.equal(dummyUpdateArticle)
      done()
    })
  })
})

describe('User', function(){
  it('Should add new user in database', function(done){
    let dummyUsers = {
      first_name: 'Alan',
      last_name: 'Walker',
      username: 'alan',
      password: '12345',
      role: 'user'
    }
    chai.request(server)
    .post('/users')
    .send(dummyUsers)
    .end(function(err,res){
      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.should.have.property('first_name')
      res.body.should.have.property('last_name')
      res.body.should.have.property('username')
      res.body.should.have.property('password')
      done()
    })
  })
  it('Should find all user in database', function(done){
    chai.request(server)
    .get('/users')
    .end(function(err,res){
      res.should.have.status(200)
      res.body.should.be.an('array')
      done()
    })
  })
  it('Should delete selected user from database', function(done){
    let dummyDeleteUser = '5a1bd7475064775c72967745'
    chai.request(server)
    .delete(`/users/${dummyDeleteUser}`)
    .end(function(err,res){
      res.should.have.status(200)
      res.body._id.should.equal(dummyDeleteUser)
      done()
    })
  })
  it('Should update selected user in database', function(done){
    let dummyUpdateUser = '5a1bd7e578ec8d348edf72fe'
    let dummyDataUpdate = {
      first_name: 'Jajan',
      last_name: 'Myanmar',
      role: 'user'
    }
    chai.request(server)
    .put(`/users/${dummyUpdateUser}`)
    .send(dummyDataUpdate)
    .end(function(err,res){
      res.should.have.status(200)
      res.body._id.should.equal(dummyUpdateUser)
      done()
    })
  })
  it('Should success logged in users', function(done){
    let dummyLogin = {
      username: 'alan',
      password: '12345'
    }
    chai.request(server)
    .post('/login')
    .send(dummyLogin)
    .end(function(err,res){
      res.should.have.status(200)
      res.should.have.property('text')
      done()
    })
  })
})
