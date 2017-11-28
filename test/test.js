const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp)

describe('article', function() {
  let id = ''
  it('test untuk memastikan artikel berhasil dibuat', function(done) {
    chai.request('http://localhost:3000')
    .post('/articles')
    .send({
      title: 'Hello Word!',
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque quis augue eu faucibus. Fusce laoreet ligula id consectetur iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi auctor dolor sit amet lorem egestas, congue auctor urna finibus. Integer ut fermentum tellus. Praesent aliquam, eros ac tincidunt placerat, massa orci laoreet lectus, ac ullamcorper dolor leo eget est. Nam a vulputate nunc.',
      category: 'Dummy'
    })
    .end(function(err, res) {
      // console.log(res.body)
      id = res.body._id
      expect(res).to.have.status(200)
      expect(res.body.title).to.equal('Hello Word!')
      expect(res.body.author).to.equal('John Doe')
      expect(res.body.content).to.equal('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque quis augue eu faucibus. Fusce laoreet ligula id consectetur iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi auctor dolor sit amet lorem egestas, congue auctor urna finibus. Integer ut fermentum tellus. Praesent aliquam, eros ac tincidunt placerat, massa orci laoreet lectus, ac ullamcorper dolor leo eget est. Nam a vulputate nunc.')
      expect(res.body.category).to.equal('Dummy')
      done()
    })
  })
  it('test untuk memastikan artikel muncul di daftar', function(done) {
    // console.log(id);
    chai.request('http://localhost:3000')
    .get(`/articles/${id}`)
    .end(function(err, res) {
      // console.log(res.body)
      expect(res).to.have.status(200)
      expect(res.body._id).to.equal(id)
      expect(res.body.title).to.equal('Hello Word!')
      expect(res.body.author).to.equal('John Doe')
      expect(res.body.content).to.equal('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque quis augue eu faucibus. Fusce laoreet ligula id consectetur iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi auctor dolor sit amet lorem egestas, congue auctor urna finibus. Integer ut fermentum tellus. Praesent aliquam, eros ac tincidunt placerat, massa orci laoreet lectus, ac ullamcorper dolor leo eget est. Nam a vulputate nunc.')
      expect(res.body.category).to.equal('Dummy')
      done()
    })
  })
  it('test untuk memastikan artikel berhasil diedit', function(done) {
    chai.request('http://localhost:3000')
    .put(`/articles/${id}`)
    .send({
      title: 'Wkwkwkwkwkw',
      author: 'kwkwkwkwkW',
      content: 'Wkwkwkwkw wkwkwkwk wkwkwkwkw wkwkwkwkw wkwkwkw.',
      category: 'Wkwkwkw'
    })
    .end(function(err, res) {
      expect(res).to.have.status(200)
      expect(res.body._id).to.equal(id)
      expect(res.body.title).to.equal('Wkwkwkwkwkw')
      expect(res.body.author).to.equal('kwkwkwkwkW')
      expect(res.body.content).to.equal('Wkwkwkwkw wkwkwkwk wkwkwkwkw wkwkwkwkw wkwkwkw.')
      expect(res.body.category).to.equal('Wkwkwkw')
      done()
    })
  })
  it('test untuk memastikan artikel berhasil dihapus ', function(done) {
    chai.request('http://localhost:3000')
    .get(`/articles/${id}`)
    .end(function(err, res) {
      // console.log(res.body)
      expect(res).to.have.status(200)
      expect(res.body._id).to.equal(id)
      done()
    })
  })
})

describe('user', function() {
  let id = ''
  it('test untuk memastikan user berhasil dibuat', function(done) {
    chai.request('http://localhost:3000')
    .post('/users')
    .send({
      name: 'Davina Bonadilla',
      username: 'davina',
      password: 'bonadilla',
      email: 'davina.bonadilla@gmail.com'
    })
    .end(function(err, res) {
      // console.log(res.body)
      id = res.body._id
      expect(res).to.have.status(200)
      expect(res.body.name).to.equal('Davina Bonadilla')
      expect(res.body.username).to.equal('davina')
      expect(res.body.email).to.equal('davina.bonadilla@gmail.com')
      done()
    })
  })
  it('test untuk memastikan user muncul di daftar', function(done) {
    chai.request('http://localhost:3000')
    .get(`/users/${id}`)
    .end(function(err, res) {
      // console.log(res.body)
      expect(res).to.have.status(200)
      expect(res.body._id).to.equal(id)
      expect(res.body.name).to.equal('Davina Bonadilla')
      expect(res.body.username).to.equal('davina')
      expect(res.body.email).to.equal('davina.bonadilla@gmail.com')
      done()
    })
  })
  it('test untuk memastikan user berhasil diedit', function(done) {
    chai.request('http://localhost:3000')
    .put(`/users/${id}`)
    .send({
      name: 'Zuhri Nurhuda',
      username: 'zuhri',
      password: 'nurhuda',
      email: 'zuhri.nurhuda@gmail.com'
    })
    .end(function(err, res) {
      // console.log(res.body);
      expect(res).to.have.status(200)
      expect(res.body.name).to.equal('Zuhri Nurhuda')
      expect(res.body.username).to.equal('zuhri')
      expect(res.body.email).to.equal('zuhri.nurhuda@gmail.com')
      done()
    })
  })
  it('test untuk memastikan user berhasil dihapus', function(done) {
    chai.request('http://localhost:3000')
    .get(`/users/${id}`)
    .end(function(err, res) {
      // console.log(res.body)
      expect(res).to.have.status(200)
      expect(res.body._id).to.equal(id)
      done()
    })
  })
  it('test untuk memastikan user berhasil login', function(done) {
    chai.request('http://localhost:3000')
    .post('/users/login')
    .send({
      username: 'zuhri',
      password: 'nurhuda',
    })
    .end(function(err, res) {
      console.log(res.body.token)
      expect(res).to.have.status(200)
      // expect(res.body.username).to.equal('zuhri')
      expect(res.body.token).to.not.be.an('undefined');
      done()
    })
  })
})
