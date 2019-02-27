const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let chatModel = new mongoose.Schema(
		{
				participants: Array,
				messages:Array
		}
);

module.exports = mongoose.model('Chat', chatModel);
