const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  email: String,
});

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;
