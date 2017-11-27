const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
app = require('../app.js')
const ConfimToken = require('../helpers/checklogin')
chai.use(chaiHTTP);

var idBlog = '';

var authorName = 'Bernard Hiro'  // Test author
var titleName = 'Angle will Died' // Test title
var yearArticle = 1992 // Test year

// Check Login input username and password

var usernameLogin = 'admin'
var usernamePassword = 'admin'



describe('blog tdd', function() {
	describe('create artikel', function(){
		it('article has been saved', function(done){
			chai.request(app)
			.post("/add")
			.send({
				author : authorName,
				title : titleName,
				year : yearArticle
			})
			.end((err,res) => {
				let tempRes = res.text;
				tempRes = JSON.parse(tempRes)
				idBlog = tempRes._id
				// console.log(idBlog)
				expect(res.status).to.equal(200)
				expect(res).to.be.an('object');
				done()
			})
		})
	})

	describe('show article', function(){
		it('show article success', function(done){
			chai.request(app)
			.get(`/article/${idBlog}`)
			.end((err,res) => {
				// console.log(res.body)
				expect(res.status).to.equal(200)
				expect(res).to.be.an('object');
				expect(res.body.author).to.equal(authorName);
				expect(res.body.title).to.equal(titleName);
				expect(res.body.year).to.equal(yearArticle);
				done()
			})
		})
	})

	describe('delete article',function(){
		it('delete article success', function(done){
			chai.request(app)
			.delete(`/article/${idBlog}`)
			.end((err,res) => {
				// console.log(res)
				expect(res.status).to.equal(200)
				expect(res).to.be.an('object');
				expect(res.body.author).to.equal(authorName);
				expect(res.body.title).to.equal(titleName);
				expect(res.body.year).to.equal(yearArticle);
				done()
			})
		})
	})

	describe('check login', function() {
		it('login valid', function(done) {
			chai.request(app)
			.post(`/users/login`)
			.send({
				username : usernameLogin,
				password : usernamePassword
			})
			.end((err,res) => {
				console.log(res.body.token)
				expect(res.status).to.equal(200)
				expect(res.body).to.be.an('object')
				ConfimToken(res.body.token, function(err, result) {
					expect(result.username).to.equal(usernameLogin)
				})
				done()
			})
		})
	})

})