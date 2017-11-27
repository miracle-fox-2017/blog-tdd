const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	password:  String,
	full_name:   String,
	email: String,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;