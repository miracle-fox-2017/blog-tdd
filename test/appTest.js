var chai = require('chai')
    ,chaiHttp = require('chai-http')
    ,app = require('../app')
    ,expect = require('chai').expect

    chai.use(chaiHttp);
describe('Post Article', function(){
    it('post article', function(done){
        chai.request(app)
        .post('/api/blog/save')
        .send({title : 'Installing', konten:'blbalbalbala blballablaba laablablablbalalbal blablablbabal' })
        .end(function(err ,res){
            expect(res).to.have.status(200)
            expect(res).to.be.json
            done()
        })
    })
        
    it('get article',function(done){
        chai.request(app)
        .get('/api/blog/article')
        .end(function(err, res){
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            done()
        }) 
    })
    it('delete article', function(done){
        chai.request(app)
        .delete('/api/blog/article/5a1bd9facba6c13dea2ef6db')
        .end(function(err, res){
                expect(err).to.be.null;
                expect(res).to.have.status(200)
                done()
        })
    })

    
})



// chai.request(app)
// .get('/api/blog')