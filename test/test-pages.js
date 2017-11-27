const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect
const URL = 'http://localhost:4000/api'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let token = ''


chai.use(chaiHttp)

describe('App', function() {
  describe('/get/blog', function() {
    it('responds with status 200', function(done) {
    register()
      console.log(token, 'ini token');
        chai.request(URL)
        .get('/blog')
        .set('token', token)
        .end(function(err, res) {
          console.log(token);
          expect(res).to.have.status(200)
        })
      // }
      done()
    })
  })
    it('get blog post by id', function(done) {
      chai.request(URL)
      console.log(token, '99999')
      .get('/blog/5a1bd80a10845d3e264b276d')
      .set('token', token)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        done()
      })
    })
    // it(`we're going to send some datas, and it will ressponds with status 200`, function(done) {
    //   chai.request(URL)
    //   .post('/blog')
    //   .type('form')
    //   .send({
    //     'author' : 'Foo bar',
    //     'title'  : 'console.log',
    //     'article': 'lorem ipsum dolor',
    //     'createdAt' : '17 aug 1945'
    //   })
    //   .end(function(err, res) {
    //     expect(res).to.have.status(200)
    //     done()
    //   })
    // })
    //
    // it(`we're going to edit specific data, and it will ressponds with status 200`, function(done) {
    //   chai.request(URL)
    //   .put('/blog')
    //   .type('form')
    //   .send({
    //     'author' : 'Foo bar',
    //     'title'  : 'console.log',
    //     'article': 'lorem ipsum dolor',
    //     'createdAt' : '17 aug 1945'
    //   })
    //   .end(function(err, res) {
    //     expect(res).to.have.status(200)
    //     done()
    //   })
    // })
    // it('we want to delete an article', function(done) {
    //   chai.request(URL)
    //   .delete('/blog/5a1bd73860b6d53d30e913a2')
    //   .end(function(err, res) {
    //     expect(res).to.have.status(200)
    //     done()
    //   })
    // })
  // describe('/users', function() {
  //   it('we want get all users', function(done) {
  //     chai.request(URL)
  //     .get('/users')
  //     .end(function(err, res) {
  //       expect(res).to.have.status(200)
  //       done()
  //     })
  //   })
  // })
  //  it('we want to post a new user', function(done) {
  //    chai.request(URL)
  //    .post('/users')
  //    .type('form')
  //    .send({
  //      'username' : 'shita',
  //      'password' : 123,
  //      'email'    : 'shita@mail.com'
  //    })
  //    .end(function(err, res) {
  //      expect(res).to.have.status(200)
  //      done()
  //    })
  //  })
  //  it('we want to delete a user', function(done) {
  //    chai.request(URL)
  //    .delete('/users/5a1becb2a395e94fa831aa4c')
  //    .end(function(err, res) {
  //      expect(res).to.have.status(200)
  //      done()
  //    })
  //  })

})


function register () {

  describe('/signin', function() {
    it('allows user that have been login', function(done) {
      chai.request(URL)
      .post('/signin')
      .send({'username': 'ami', 'password':'123'})
      .end(function(err, res) {
        expect(res).to.have.status(200)
        token = res.text
        console.log(token, '0-000-0========');
        done()
      })
    })
  })
}



  //
  // describe('/blog/login', function() {
  //   let username = 'Steve jobes'
  //   let password = 123
  //   let token = jwt.sign({
  //     username : 'steve jobes',
  //     password : '123'
  //   }, 'FOOBAR', { expiresIn: '1h' })


  // function hashingPwd (pwd) {
  //   bcrypt.hash(pwd, saltRounds, function(err, hash){
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       return hash
  //     }
  //   })
  // }
