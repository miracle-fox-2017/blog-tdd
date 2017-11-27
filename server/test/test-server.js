var chai = require('chai');
var chaiHttp = require('chai-http');
chai.should()
const app = require('../app')
chai.use(chaiHttp);

describe('Article', function () {
    it('Get Article', function (done) {
        chai.request(app)
            .get('/api/articles')
            .end(function (err, res) {
                res.should.have.status(200)
                // res.should.be.a('object')
                // res.should.json
                done()
            })
    })

    it('Post article', function (done) {
        chai.request(app)
            .post('/api/articles')
            .send({
                'title': "Coba post article",
                'description': "Ini hanyalah test percobaan"
            })
            .end(function (err, res) {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('object')
                res.body.should.have.property('title')
                res.body.should.have.property('description')
                res.body.title.should.equal('Coba post article')
                res.body.description.should.equal('Ini hanyalah test percobaan')
                done()
            })
    })

    it("Edit articles", function (done) {
        chai.request(app)
            .get('/api/articles')
            .end(function (err, res) {
                chai.request(app)
                    .put('/api/articles/' + res.body[2]._id)
                    .send({ 'title': 'Coba mocha chai' })
                    .end(function (err, res) {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.be.a('object')
                        res.body.should.have.property('title')
                        res.body.should.have.property('description')
                        res.body.should.have.property('_id')
                        res.body.title.should.equal('Coba mocha chai')
                        done()
                    })
            })
    })

    it("Delete article", function (done) {
        chai.request(app)
            .get('/api/articles')
            .end(function (err, res) {
                chai.request(app)
                    .delete('/api/articles/' + res.body[0]._id)
                    .end(function (err, res) {
                        res.should.have.status(200)
                        res.should.be.json
                        res.body.should.be.a('object')
                        res.body.should.have.property('message')
                        res.body.message.should.equal("Successfully deleted!")
                        done()
                    })
            })

    })
})

describe('User', function () {
    it('Post signup', function (done) {
        chai.request(app)
            .post('/api/signup')
            .send({
                'name': "Amelia Rahman",
                'username': "ameliarahman",
                'password': "amelia",
                'email': "amel.rahman5@gmail.com"

            })
            .end(function (err, res) {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.message.should.equal('Successfully inserted!')
                done()
            })
    })

    it('Post signin', function (done) {
        chai.request(app)
            .post('/api/signin')
            .send({
                'username': 'wisnudj',
                'password': '123'
            })
            .end(function (err, res) {
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.should.have.property('token')
                res.body.message.should.equal('Login berhasil')
                res.body.token.should.not.equal(undefined)
                done()

            })
    })
})

// describe("Blog TDD", function () {
//     it('Menampilkan semua data artikel /articles GET')
//     it('Menyimpan semua data artikel /articles POST')
//     it('Menghapus data artikel /aricles/:id DELETE')
//     it('Mengedit data artikel /aritcles/:id PUT')
// })
