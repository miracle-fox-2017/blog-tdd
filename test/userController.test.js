var chai = require('chai')
var chaiHttp = require('chai-http');
let should = chai.should();
let authorId = "23423asdas";
let safeUserId = "5a1bdb20087c1037796abd56";
const token_blog = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTFiZGNiNDJmNWYyOTNhMjI0MmQ4ODMiLCJ1c2VybmFtZSI6Im5hdGFyIiwicGFzc3dvcmQiOiIkMmEkMTAkVU1GMjhJN1IwLlY5Mm9ZYm1YY1BmTzA5emo2b25ibkNGRmprRnRSSjJ3em91UHZZRE9qZk8iLCJpYXQiOjE1MTE3NzcxODJ9.TgpTg2HmhqrB_x3IAtEr4ZKJmXq6ztOSIKhz3F2NO64";

var createdUserId = '';
var createdUsername = '';
var createdPassword = '123456';
var createdToken = '';

let app = require("../app");

chai.use(chaiHttp);

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
		.get('/api/users/'+safeUserId)
		.set('token_blog', token_blog)
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

/*describe('/POST User', () => {
	it('it should POST single users and return a new user', (done) => {

		let user = {
			username: "kenji22",
			email: "kenji22@mail.com",
			password: "123456",
			full_name: "Kenji Twain",
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

			createdUserId = res.body.user._id;

			done();
		});
	});
});*/

describe('/POST Register user', () => {
	let cuserid = "";
	let cusername = "";
	let cpassword = "";

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

			console.log(res.body.username);
			console.log(res.body)

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

describe('/PUT:id Edit User', () => {
	it('it should EDIT single users and return the new user', (done) => {
		let user = {
			username: "bloodyroar45",
			password: "111111",
			full_name: "Registered Edit",
			email: new Date(),
		}

		console.log("~~~createdUserId: "+createdUserId)

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