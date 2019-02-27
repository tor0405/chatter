const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let chatModel = new mongoose.Schema(
		{
				participants: [{_id:String}],
				messages:[{
					from:String,
					content:String,
					Date:Date
				}]
		}
);




module.exports = mongoose.model('Chat', chatModel);
