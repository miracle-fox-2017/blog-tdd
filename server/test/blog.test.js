const chai = require('chai')
  , chaiHttp = require('chai-http')
  , expect = require('chai').expect

chai.use(chaiHttp);
// FOR ARTICLE
describe('Testing Article', () => {
  it('post / save article', (done) => {
    chai.request('http://localhost:3000')
      .post('/')
      .type('form')
      .send({
        'title': 'title article',
        'article': 'this is article',
        'category': 'A'
      })
      .end((err, res) => {
          // console.log('TEST',res.body);
        expect(res.body.data).to.be.a('object')
        expect(res.body).to.have.property('msg').eql('Success created')
        expect(res).to.have.status(200)
        done()
      })
  })
  it('get all articles', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(res.body.articles).to.be.a('array')
        expect(res).to.have.status(200)
        done()
      })
  })
  it('edit article ', (done) => {
    chai.request('http://localhost:3000') 
      .get('/') 
      .end(function(err, res){ 
        // console.log(res.body.articles[0]._id)
      chai.request('http://localhost:3000')
        .put(`/${res.body.articles[0]._id}`)
        .type('form')
        .send({title: "The Chronicles of Narnia", article: "C.S. Lewis", category: 'C'})
        .end((err, res) => {
          expect(res.body).to.have.property('msg').eql('Article successfully updated!')
          expect(res).to.have.status(200)
          done()
        })
      })
  })
  it('remove article ', (done) => {
    chai.request('http://localhost:3000') 
    .get('/') 
    .end(function(err, res){ 
      chai.request('http://localhost:3000')
        .delete(`/${res.body.articles[0]._id}`)
        .end((err, res) => {
          expect(res.body).to.have.property('msg').eql('Successfully Delete')
          expect(res).to.have.status(200)
          done()
        })
      })
  })
})
///FOR USER
describe('Testing User', () => {
  let token = null
  it('Tetsing Register user', (done) => {
    chai.request('http://localhost:3000')
      .post('/register')
      .type('form')
      .send(
      {
        name: "Agustinus",
        email : "vbagustinus@gmail.com",
        username: "admin",
        password: "admin"
      })
      .end((err, res) => {
        expect(res.body).to.have.property('msg').eql('Success created account')
        expect(res).to.have.status(200)
        done()
      })
  })
  it('Tetsing Login user', (done) => {
    chai.request('http://localhost:3000')
      .post('/login')
      .type('form')
      .send(
      {
        username: "admin",
        password: "admin"
      })
      .end((err, res) => {
        // console.log('KOSONG isinya apa',res.body.token);
        token = res.body.token
        expect(res.body).to.have.property('msg').eql('Success Login')
        expect(res).to.have.status(200)

        done()
      })
  })

  describe('Login bring Token ', () => {
    // console.log(typeof token)
    if(typeof token == 'object') {
      it('get all users', (done) => {
        chai.request('http://localhost:3000')
          .get('/register')
          .end((err, res) => {
            // console.log('INI DATA',res.body.users);
            expect(res.body.users).to.be.a('array')
            expect(res).to.have.status(200)
            done()
          })
      })
      
      it('edit user ', (done) => {
        chai.request('http://localhost:3000') 
          .get('/register') 
          .end(function(err, res){
            // console.log(res.body.users[0])
            chai.request('http://localhost:3000')
            .put(`/register/${res.body.users[0]._id}`)
            .type('form')
            .send({
              name: "Siapa",
              email: "siapa@mail.com",
              username: 'siapa',
              password: 'siapa'
            })
            .end((err, res) => {
              // console.log('INI DATA', res);
              expect(res.body).to.have.property('msg').eql('User successfully updated!')
              expect(res).to.have.status(200)
              done()
            })
          })
      })
      it('remove user ', (done) => {
        chai.request('http://localhost:3000') 
        .get('/register') 
        .end(function(err, res){
          chai.request('http://localhost:3000')
            .delete(`/register/${res.body.users[0]._id}`)
            .end((err, res) => {
              expect(res.body).to.have.property('msg').eql('Data removed')
              expect(res).to.have.status(200)
              done()
            })
          })
        })  
      }
  })
})
