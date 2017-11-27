require('dotenv').config();
var Helper = require('./helpers/helper');



Helper.signWebToken({
	_id : "234234sdasdads234",
	username: "rendsow",
	password: "123456"
}).then(user => {
	console.log(user)

}).catch(err => res.send(err.message));