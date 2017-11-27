const chai     = require('chai')
      expect   = chai.expect  ,
      chaiHttp = require('chai-http')
      app      = require('../app').listen(3001)

chai.use(chaiHttp)

let title = 'this is test title'
let post = 'Curabitur porttitor aliquet arcu. Nullam.'

describe('post CRUD', () => {
  it('create post', done => {
    chai.request(app)
    .post('/posts')
    .send({
      title: title,
      post: post
    })
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('title', title)
      expect(res.body).to.have.property('post', post)
    })
    done()
  })
  
  it('read post', done => {
    chai.request(app)
    .get('/posts')
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(req.body).to.have.deep.posts([{
        'title': title
      }])
      expect(req.body).to.have.deep.posts([{
        'post': post
      }])
    })
    done()
  })
  
  //update a post
  // it('update post', done => {
  //   chai.request(app)
  //
  //   })
  // })
  
  it('delete post', done => {
    chai.request(app)
    .delete('/posts/5a1bede658cf1751ed2991ef')
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(req.body).to.have.property('title', title)
      expect(req.body).to.have.property('post', post)
    })
    done()
  })
  
  
})
