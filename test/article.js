//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let mongoose = require("mongoose")

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let expect = chai.expect

chai.use(chaiHttp)

describe('Users Blog API Integration Tests', function() {
  // read
    describe('#GET / Users', function() { 
      it('should get all user', function(done) { 
        chai.request('http://localhost:3000') .get('/api/user')
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body).to.be.an('array'); 
            done(); 
          }); 
      });
    });
    // create
    describe('## Create user ', function() { 
      it('should create a user', function(done) { 
        let newUser = {
          fullname : 'Argus Tinus',
          username : 'argus',
          password : 'argus',
        }
        chai.request('http://localhost:3000') 
        .post('/api/user') 
        .send(newUser) 
        .end(function(err, res) { 
          // console.log(res.body)
          expect(res.statusCode).to.equal(201); 
          expect(res.body).to.be.an('object');
          expect(res.body.data_User).to.have.property('fullname').eql('Argus Tinus');
          expect(res.body.data_User).to.have.property('username').eql('argus'); 
          newUser = res.body; 
          done(); 
        }); 
      }); 
    });
     // update
    describe('### Update user', function(){
      it('should update a user', function(done) { 
        chai.request('http://localhost:3000') 
        .put('/api/user/5a1be6dbd756a14dfd3ad15f') 
        .send({
          fullname : 'Wi$nu Djhaya Diningrat',
          username : 'wisnu',
          password : 'wisnu',
        }) 
        .end(function(err, res) { 
          // console.log('err>>>',err)
          // console.log('resbody<<<',res.body)
          expect(res.statusCode).to.equal(201); 
          expect(res.body).to.be.an('object');
          expect(res.body.data_User).to.have.property('fullname').eql('Wi$nu Djhaya Diningrat');
          expect(res.body.data_User).to.have.property('username').eql('wisnu');
          data_Article = res.body; 
          done(); 
        });
      }); 
    }) 
    // delete
    describe('#### delete user', function(){
      it('should delete a user', function(done) { 
        chai.request('http://localhost:3000') 
        .delete('/api/user/5a1be8c82f202163ba6d9532') 
        .end(function(err, res) { 
          // console.log('err>>>',err)
          // console.log('resbody<<<',res.body)
          expect(res.statusCode).to.equal(200); 
          done(); 
        });
      }); 
    })
})

describe('Blog API Integration Tests', function() {
  // read
  describe('#GET / article', function() { 
    it('should get all article', function(done) { 
      chai.request('http://localhost:3000') .get('/api/article')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.be.an('array'); 
          // expect(res.body).to.be.empty; 
          done(); 
        }); 
    });
  });
  // create
  describe('## Create article ', function() { 
    it('should create a article', function(done) { 
      let newArticle = {
        title : `'Justice League' dari Puncak Box Office`,
        category : 'hiburan',
        description : 'Jakarta, CNN Indonesia -- Film animasi Disney dan Pixar, Coco sukses mengusir gerombolan super hero DC di Justice League dari puncak box office. Coco diperkirakan sanggup meraih US$49 juta atau lebih dari Rp662 miliar di pasar domestik Amerika Utara di pekan debutnya.',
      }
      chai.request('http://localhost:3000') 
      .post('/api/article') 
      .send(newArticle) 
      .end(function(err, res) { 
        // console.log(res.body)
        expect(res.statusCode).to.equal(201); 
        expect(res.body).to.be.an('object');
        expect(res.body.data_Article).to.have.property('title').eql(`'Justice League' dari Puncak Box Office`);
        expect(res.body.data_Article).to.have.property('category').eql('hiburan'); 
        newArticle = res.body; 
        done(); 
      }); 
    }); 
  }); 
  // // update
  describe('### Update article', function(){
    it('should update a article', function(done) { 
      chai.request('http://localhost:3000') 
      .put('/api/article/5a1be20adcc9fe2933a6922d') 
      .send({
        title : `Saham Waspada Aksi Ambil Untung Akhir Tahun`,
        category : 'ekonomi',
        description : 'Jakarta, CNN Indonesia -- Indeks Harga Saham Gabungan (IHSG) diproyeksi bergerak terbatas sepanjang pekan ini, akibat aksi ambil untung (profit taking) kembali marak dilakukan pelaku pasar untuk kebutuhan liburan akhir tahun.\n\nSejumlah analis menyatakan, pelaku pasar juga tidak memiliki dorongan untuk melakukan aksi beli karena tidak ada ada dorongan sentimen positif dari dalam negeri.'
      
      }) 
      .end(function(err, res) { 
        // console.log('err>>>',err)
        // console.log('resbody<<<',res.body)
        expect(res.statusCode).to.equal(201); 
        expect(res.body).to.be.an('object');
        expect(res.body.data_Article).to.have.property('title').eql(`Saham Waspada Aksi Ambil Untung Akhir Tahun`);
        expect(res.body.data_Article).to.have.property('category').eql('ekonomi'); 
        data_Article = res.body; 
        done(); 
      });
    }); 
  })
  // // delete
  describe('#### delete article', function(){
    it('should delete a article', function(done) { 
      chai.request('http://localhost:3000') 
      .delete('/api/article/5a1be23f0f8aa12b575e93e2') 
      .end(function(err, res) { 
        // console.log('err>>>',err)
        // console.log('resbody<<<',res.body)
        expect(res.statusCode).to.equal(200); 
        done(); 
      });
    }); 
  })
});