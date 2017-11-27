const chai     = require('chai'),
      chaiHttp = require('chai-http'),
      expect   = chai.expect,
      // app      = require('../app');
      app      = 'http://localhost:3000'

//helper
const tok = require('../helpers/jsonToken')

chai.use(chaiHttp);

describe('Testing blogs', function(){
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMWJiNGQ4ZTUwOWZmNzNkYTU3YzYzNiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1MTE3Njc5OTl9.3rE7sD-fCk9kWgxdXftyGfEqdNEL2lHHgen-mjkPa5U"
  let dummyTitle = "Lorem Ipsum"
  let dummyArticle = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis dui non rhoncus consectetur. Vivamus mauris enim, scelerisque non leo ac, elementum maximus ipsum. Vivamus venenatis odio sit amet erat maximus accumsan. Praesent id nisl ultrices, ultricies lacus in, dictum ante. In rhoncus leo sed ultrices condimentum. Nulla gravida, tellus ut ornare fermentum, nisi ante maximus risus, ac egestas urna dolor eu erat. Vivamus nec sem a ex viverra gravida non non velit. Integer quis neque at lorem dignissim molestie vitae non metus. Fusce dui ex, facilisis maximus fermentum sit amet, posuere ac ex. Vestibulum quis ultricies risus. Praesent iaculis justo et imperdiet placerat. Cras elementum ipsum in lacus dignissim, sit amet mollis sem commodo. Cras rutrum eu velit et interdum. Integer turpis elit, viverra ut malesuada tristique, tincidunt non velit. Cras convallis aliquam sem, sed dictum mi congue non. Proin efficitur, sem et fermentum varius, arcu elit ornare dolor, non hendrerit est est quis metus.`
  let dummyEditedTitle = dummyTitle.split('').reverse().join('')
  let dummyEditedArticle = dummyArticle.split('').reverse().join('')
  
  let idPost = ''
  
  it('Home Returns 200', function(done){
    chai.request(app)
    .get('/')
    .end(function(req, res){
      expect(res).to.have.status(200)
      done()
    })
  })
  it('Home Returns welcome page', function(done){
    chai.request(app)
    .get('/')
    .end(function(req, res){
      expect(res.body.msg).to.equal('welcomePage')
      done()
    })
  })
  
  //post
  it('Article Post test', function(done){
    chai.request(app)
    .post('/api/blog/')
    .set('token', token)
    .send({
      title: dummyTitle, 
      article: dummyArticle
    })
    .end(function(req, res){
      idPost = res.body.blogPost._id
      expect(res).to.have.status(200)
      //code here
      expect(res.body.msg).to.equal('success')
      expect(res.body.author).to.equal('admin')
      expect(res.body.blogPost.title).to.equal(dummyTitle)
      expect(res.body.blogPost.article).to.equal(dummyArticle)
      
      done()
    })
  })
  
  //get from id
  it('Article show by id test', function(done){
    chai.request(app)
    .get('/api/blog/'+idPost)
    // .set('token', token)
    .end(function(req, res){
      expect(res).to.have.status(200)
      //code here
      expect(res.body.msg).to.equal('success')
      expect(res.body.blogPost.title).to.equal(dummyTitle)
      expect(res.body.blogPost.article).to.equal(dummyArticle)
  
      done()
    })
  })
  
  //update id
  it('Article edit by id test', function(done){
    chai.request(app)
    .put('/api/blog/'+idPost)
    .set('token', token)
    .send({
      title: dummyEditedTitle, 
      article: dummyEditedArticle
    })
    .end(function(req, res){
      expect(res).to.have.status(200)
      //code here
      expect(res.body.msg).to.equal('success')
      expect(res.body.newBlogPost.title).to.equal(dummyEditedTitle)
      expect(res.body.newBlogPost.article).to.equal(dummyEditedArticle)
  
      done()
    })
  })
  
  //delete from id
  it('Article delete test', function(done){
    chai.request(app)
    .delete('/api/blog/'+idPost)
    .set('token', token)
    .end(function(req, res){
      expect(res).to.have.status(200)
      //code here
      expect(res.body.msg).to.equal('success')
      expect(res.body.deleted.title).to.equal(dummyEditedTitle)
      expect(res.body.deleted.article).to.equal(dummyEditedArticle)
      
      done()
    })
  })
  
  //login success (return token, check username admin)
  it('Login Test', function(done){
    chai.request(app)
    .post('/api/signin/')
    .send({
      username: 'admin',
      password: 'admin'
    })
    .end(function(req, res){
      expect(res).to.have.status(200)
      expect(res.body.msg).to.equal('success')
      tok.verifyToken(res.body.token,function(err, decoded){
        expect(decoded.username).to.equal('admin')
      })
      
      done()
    })
  })
  
})