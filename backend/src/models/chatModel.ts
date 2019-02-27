const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let chatModel = new mongoose.Schema(
		{
				public_id:String,
				participants: [{_id:String}],
				messages:[{
					from:String,
					content:String,
					Date:Date
				}]
		}
);




module.exports = mongoose.model('Chat', chatModel);
