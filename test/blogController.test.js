var chai = require('chai')
var chaiHttp = require('chai-http');
let should = chai.should();
let authorId = "23423asdas";
let articleId = "4235345345345";
let app = require("../app");

chai.use(chaiHttp);

/*
* Test the Blog articles
*/
describe('/GET blog articles', () => {
	it('it should GET all the articles', (done) => {
		chai.request(app)
		.get('/api/articles/')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('array');
			done();
		});
	});
});

describe('/GET:articleId blog articles', () => {
	it('it should GET a single article', (done) => {
		chai.request(app)
		.get('/api/articles/'+articleId)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('_id');
			res.body.should.have.property('title');
			res.body.should.have.property('content');
			res.body.should.have.property('category');
			res.body.should.have.property('author');

			done();
		});
	});
});

describe('/POST blog article', () => {
	it('it should POST single articles and return a new article', (done) => {

		let article = {
			title: "Welcome to the Jungle",
			content: "I'm the king of the jungle",
			category: "News",
			createdAt: new Date(),
			author: authorId
		}

		chai.request(app)
		.post('/api/articles')
		.send(article)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			res.body.should.have.property('article');
			res.body.article.should.have.property('title');
			res.body.article.should.have.property('content');
			res.body.article.should.have.property('category');
			res.body.article.should.have.property('author');

			done();
		});
	});
});

describe('/PUT:id blog article', () => {
	it('it should EDIT single articles and return the new article', (done) => {
		let article = {
			title: "Welcome to the Jungle",
			content: "I'm the king of the jungle",
			category: "News",
			createdAt: new Date(),
			author: authorId
		}

		chai.request(app)
		.put('/api/articles/'+articleId)
		.send(article)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			res.body.should.have.property('article');
			res.body.article.should.have.property('_id');
			res.body.article.should.have.property('title');
			res.body.article.should.have.property('content');
			res.body.article.should.have.property('category');
			res.body.article.should.have.property('author');

			done();
		});
	});
});

describe('/DELETE:id blog article', () => {
	it('it should DELETE single articles and return the deleted article', (done) => {

		chai.request(app)
		.delete('/api/articles/'+articleId)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			res.body.should.have.property('article');
			res.body.article.should.have.property('_id');
			res.body.article.should.have.property('title');
			res.body.article.should.have.property('content');
			res.body.article.should.have.property('category');
			res.body.article.should.have.property('author');

			done();
		});
	});
});