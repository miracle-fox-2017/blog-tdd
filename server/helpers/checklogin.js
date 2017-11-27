const jwt = require('jsonwebtoken');
require('dotenv').config()

function checklogin(token, cb) {	
	jwt.verify(token, process.env.secretkey , function(err, decoded) {
		if(err){
			cb(err)
		}else{
			cb(null,decoded)
		}
	});	
}

module.exports = checklogin