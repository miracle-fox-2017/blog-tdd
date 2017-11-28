var chai = require('chai')
var chaiHttp = require('chai-http');
let should = chai.should();

var createdUserId = '';
var createdUsername = '';
var createdPassword = '123456';
var createdToken = '';

let app = require("../app");

chai.use(chaiHttp);

describe('/POST Register user', () => {
	it('it should POST single users and return a new user', (done) => {

		let user = {
			username: "ninja22",
			email: "ninja22@mail.com",
			password: createdPassword,
			full_name: "Ninja Register",
		}

		chai.request(app)
		.post('/register')
		.send(user)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			res.body.should.have.property('user');
			res.body.user.should.have.property('username');
			res.body.user.should.have.property('email');
			res.body.user.should.have.property('full_name');
			res.body.user.should.have.property('_id');

			createdUserId = res.body.user._id;
			createdUsername = res.body.user.username;
			createdPassword = "123456";

			done();
		});
	});
});

describe('/POST Login user', () => {
	it('it should POST login user return single user token', (done) => {

		chai.request(app)
		.post('/login')
		.send({
			username: createdUsername,
			password: "123456",
		})
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			res.body.should.have.property('token');
			res.body.should.have.property('email');
			res.body.should.have.property('full_name');

			createdToken = res.body.token;

			done();
		});
	});
});

/*
* Test the Blog users
*/
describe('/GET All users', () => {
	it('it should GET all the users', (done) => {
		chai.request(app)
		.get('/api/users')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('array');
			done();
		});
	});
});

describe('/GET:userId single users', () => {
	it('it should GET a single user', (done) => {
		chai.request(app)
		.get('/api/users/'+createdUserId)
		.set('token_blog', createdToken)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('_id');
			res.body.should.have.property('username');
			res.body.should.have.property('email');
			res.body.should.have.property('full_name');

			done();
		});
	});
});

describe('/PUT:id Edit User', () => {
	it('it should EDIT single users and return the new user', (done) => {
		let user = {
			username: "bloodyroar45",
			password: "111111",
			full_name: "Registered Edit",
			email: new Date(),
		}

		chai.request(app)
		.put('/api/users/'+createdUserId)
		.send(user)
		.set('token_blog', createdToken)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			res.body.should.have.property('user');
			res.body.user.should.have.property('username');
			res.body.user.should.have.property('email');
			res.body.user.should.have.property('full_name');
			res.body.user.should.have.property('_id');

			done();
		});
	});
});

/*
* Test the Blog articles
*/

describe('/POST blog article', () => {
	it('it should POST single articles and return a new article', (done) => {

		let article = {
			title: "Welcome to the Jungle",
			content: "I'm the king of the jungle",
			category: "News",
			createdAt: new Date(),
			author: "Mark Twain"
		}

		chai.request(app)
		.post('/api/articles')
		.send(article)
		.set('token_blog', createdToken)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			res.body.should.have.property('article');
			res.body.article.should.have.property('title');
			res.body.article.should.have.property('content');
			res.body.article.should.have.property('category');
			res.body.article.should.have.property('author');

			articleId = res.body.article._id;

			done();
		});
	});
});

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

describe('/PUT:id blog article', () => {
	it('it should EDIT single articles and return the new article', (done) => {
		let article = {
			title: "Welcome to the Desert",
			content: "I'm the king of the Desert",
			category: "News",
			createdAt: new Date(),
			author: "Sambo"
		}

		chai.request(app)
		.put('/api/articles/'+articleId)
		.send(article)
		.set('token_blog', createdToken)
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

/* Delete User and Article */

describe('/DELETE:id blog article', () => {
	it('it should DELETE single articles and return the deleted article', (done) => {

		chai.request(app)
		.delete('/api/articles/'+articleId)
		.set('token_blog', createdToken)
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

describe('/DELETE:id Single User', () => {
	it('it should DELETE single users and return the deleted user', (done) => {

		chai.request(app)
		.delete('/api/users/'+createdUserId)
		.set('token_blog', createdToken)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message');
			res.body.should.have.property('user');
			res.body.user.should.have.property('username');
			res.body.user.should.have.property('email');
			res.body.user.should.have.property('full_name');
			res.body.user.should.have.property('_id');

			done();
		});
	});
});
