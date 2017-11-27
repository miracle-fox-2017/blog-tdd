const chai     = require('chai')
      expect   = chai.expect  ,
      chaiHttp = require('chai-http')
      app      = require('../app').listen(3000)

// const test = require('../test')

chai.use(chaiHttp)

// describe('testrun', function () {
//   it('returns it works', function () {
//     expect(test()).to.equal('it works!')
//   })
// })

describe('testServer', () => {
  it('returns success status (200)', done => {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      done()
    })
  })
})


describe('register', () => {
  it('returns register object', done => {
    chai.request(app)
    .post('/users/register')
    .send({
      username: 'naskapal',
      password: 'test'
    })
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('username', 'naskapal')
      done()
    })
  })
})


describe('login', () => {
  it('returns token', done => {
    chai.request(app)
    .post('/users/login')
    .send({
      username: 'naskapal',
      password: 'test'
    })
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('uid')
    })
    done()
  })
})
