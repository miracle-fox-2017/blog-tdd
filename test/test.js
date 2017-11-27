const chai = require('chai')
const expect = chai.expect

const chaiHttp = require('chai-http')
const assert = require('assert')

const ObjectId = require('mongodb').ObjectId

chai.use(chaiHttp)

describe('article', function() {
  it('test untuk memastikan artikel yang disimpan berhasil', function(done) {
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
      expect(res).to.have.status(200)
      expect(res.body.title).to.equal('Hello Word!')
      expect(res.body.author).to.equal('John Doe')
      expect(res.body.content).to.equal('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque quis augue eu faucibus. Fusce laoreet ligula id consectetur iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi auctor dolor sit amet lorem egestas, congue auctor urna finibus. Integer ut fermentum tellus. Praesent aliquam, eros ac tincidunt placerat, massa orci laoreet lectus, ac ullamcorper dolor leo eget est. Nam a vulputate nunc.')
      expect(res.body.category).to.equal('Dummy')
      done()
    })
  })
  it('test untuk memastikan artikel yang sudah disimpan muncul di daftar artikel', function(done) {
    chai.request('http://localhost:3000')
    .get('/articles/5a1bbccaf8b6f30eeaf4faa3')
    .end(function(err, res) {
      // console.log(res.body)
      expect(res).to.have.status(200)
      expect(res.body._id).to.equal('5a1bbccaf8b6f30eeaf4faa3')
      done()
    })
  })
  it('test untuk memastikan artikel yang dihapus berhasil', function(done) {
    chai.request('http://localhost:3000')
    .get('/articles/5a1bbccaf8b6f30eeaf4faa3')
    .end(function(err, res) {
      // console.log(res.body)
      expect(res).to.have.status(200)
      expect(res.body._id).to.equal('5a1bbccaf8b6f30eeaf4faa3')
      done()
    })
  })

  describe('user', function() {
    // it('test untuk memastikan bahwa seseorang sudah berhasil login', function(done) {})
  })
})
