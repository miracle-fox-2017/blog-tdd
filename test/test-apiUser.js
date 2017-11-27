const chai     = require('chai')
const chaiHttp = require('chai-http')
const server   = require('../server/app')
const should   = chai.should();
chai.use(chaiHttp);

describe('User', function () {
  it(`harus bisa menyimpan data user`, function (done) {
    chai.request(server)
      .post('/api/user')
      .send({
        'name' : 'Bang tama',
        'username' : 'tamatamvan',
        'password' : 'password'
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.name.should.equal('Bang tama')
        res.body.username.should.equal('tamatamvan')
        res.body.password.should.equal('password')
        done()
      })
  })

  it(`harus bisa memastikan user telah login`, function (done) {
    chai.request(server)
      .post('/api/user/login')
      .send({
        'username' : 'tamatamvan',
        'password' : 'password'
      })
      .end((err, res) => {
        console.log(res.body)
        res.should.have.status(200)
        res.body.token.should.not.equal(null)
        done()
      })
  })
})