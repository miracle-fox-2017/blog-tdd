const chai     = require('chai')
const chaiHttp = require('chai-http')
const server   = require('../server/app')
const should   = chai.should();
chai.use(chaiHttp);
var testId = ''

describe('Article', function (){
  it(`harus berhasil menyimpan artikel`, function(done){
    chai.request(server)
      .post('/api/article/5a1bb76f972a4709bcbdecbd')
      .send({
        'title'    : 'hacktiv8 phase2',
        'textPost' : 'ini adalah isi artikelnya',
        'category' : 'tulisan pemula'
      })
      .end((err, res) => {
        testId = res.body._id
        res.body.title.should.equal('hacktiv8 phase2')
        res.body.textPost.should.equal('ini adalah isi artikelnya')
        res.body.category.should.equal('tulisan pemula')
        res.should.have.status(200)
        done()
      })
  })

  it(`harus berhasil menampilkan artikel yang berhasil disimpan`, function(done) {
    chai.request(server)
      .get('/api/article/5a1bb76f972a4709bcbdecbd')
      .end((err, res) => {
        res.body[res.body.length-1].title.should.equal('hacktiv8 phase2')
        res.body[res.body.length-1].textPost.should.equal('ini adalah isi artikelnya')
        res.body[res.body.length-1].category.should.equal('tulisan pemula')
        res.body[res.body.length-1]._id.should.equal(testId)
        res.should.have.status(200)
        done()
      })
  })

  it(`harus berhasil menyimpan artikel yang telah diubah`, function(done) {
    chai.request(server)
      .get(`/api/article/byarticle/${testId}`)
      .send({
        'title'    : 'hacktiv8 phase2 yang baru',
        'textPost' : 'ini adalah isi artikelnya yang baru',
        'category' : 'tulisan pemula yang baru'
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body._id.should.equal(testId)
        res.body.title.should.equal('hacktiv8 phase2 yang baru')
        res.body.textPost.should.equal('ini adalah isi artikelnya yang baru')
        res.body.category.should.equal('tulisan pemula yang baru')
        done()
      })
  })

  it(`harus berhasil menghapus artikel`, function(done) {
    chai.request(server)
      .delete(`/api/article/${testId}`)
      .end((err, res) => {
        res.body._id.should.equal(testId)
        res.should.have.status(200)
        done()
      })
  })
  // it(`harus berhasil memastikan orang sudah berhasil login`)
})