const chai = require('chai')
  , chaiHttp = require('chai-http')
  , expect = require('chai').expect

chai.use(chaiHttp);

describe('Testing Article', () => {
  it('get all articles', (done) => {
    chai.request('http://localhost:3000')
      .get('/')
      .end((err, res) => {
        if(!err){
          expect(res.body.articles).to.be.a('array')
          expect(res).to.have.status(200)
          done()
        } else {
          console.log(err);
        }
      })
  })
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
  it('edit article ', (done) => {
    chai.request('http://localhost:3000/')
      .put('5a1baf926daccd5d823db180')
      .type('form')
      .send({title: "The Chronicles of Narnia", article: "C.S. Lewis", category: 'C'})
      .end((err, res) => {
        expect(res.body).to.have.property('msg').eql('Article successfully updated!')
        expect(res).to.have.status(200)
        done()
      })
  })
  it('remove article ', (done) => {
    chai.request('http://localhost:3000/')
      .delete('5a1bb3bb9f97a866d92538ff')
      .end((err, res) => {
        expect(res.body).to.have.property('msg').eql('Successfully Delete')
        expect(res).to.have.status(200)
        done()
      })
  })
})
