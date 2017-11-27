const chai = require('chai');
const expect = chai.expect
const app = require('../app')
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// Test Data User
let user = {
  username: 'nandi',
  password: 'qwerty1234',
  first_name: 'Nandira',
  last_name: 'Paturohman',
  email: 'nsp@mail.com',
}
let update = {
  email: 'patur@vnx.com',
}
let tempIdUser

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
  it('Read user', function(done) {
    chai.request(app)
    .get('/users')
    .query({id: tempIdUser})
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.title).to.equal(user.title);
      expect(res.body._id).to.equal(tempIdUser);
      done()
    })
  }),
  it('Update user', function(done) {
    chai.request(app)
    .put('/users')
    .query({id: tempIdUser})
    .send(update)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.title).to.equal(update.title);
      expect(res.body._id).to.equal(tempIdUser);
      done()
    })
  }),
  it('Delete user', function(done) {
    chai.request(app)
    .delete('/users')
    .query({id: tempIdUser})
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('deleted')
      expect(res.body.data.title).to.equal(update.title);
      expect(res.body.data._id).to.equal(tempIdUser);
      done()
    })
  })
})
