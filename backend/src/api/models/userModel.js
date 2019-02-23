const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let UserSchema = new mongoose.Schema(
		{
				username: String,
				fullName:String,
				password: String
		}
);

module.exports = mongoose.model('User', UserSchema);
