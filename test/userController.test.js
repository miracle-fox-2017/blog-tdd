var chai = require('chai')
var chaiHttp = require('chai-http');
let should = chai.should();
let authorId = "23423asdas";
let userId = "4235345345345";
let app = require("../app");

chai.use(chaiHttp);

/*
* Test the Blog users
*/
describe('/GET blog users', () => {
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

describe('/GET:userId blog users', () => {
	it('it should GET a single user', (done) => {
		chai.request(app)
		.get('/api/users/'+userId)
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

describe('/POST blog user', () => {
	it('it should POST single users and return a new user', (done) => {

		let user = {
			_id: "asdasdasd3432432",
			username: "markt88",
			email: "markt@mail.com",
			password: "234234234",
			full_name: "Mark Twain",
		}

		chai.request(app)
		.post('/api/users')
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

			done();
		});
	});
});

describe('/PUT:id blog user', () => {
	it('it should EDIT single users and return the new user', (done) => {
		let user = {
			title: "Welcome to the Jungle",
			content: "I'm the king of the jungle",
			category: "News",
			createdAt: new Date(),
			author: authorId
		}

		chai.request(app)
		.put('/api/users/'+userId)
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

			done();
		});
	});
});

describe('/DELETE:id blog user', () => {
	it('it should DELETE single users and return the deleted user', (done) => {

		chai.request(app)
		.delete('/api/users/'+userId)
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