const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let chatModel = new mongoose.Schema(
		{
				public_id:String,
				participants: [{_id:String}],
				messages:[{
					senderId:String,
					content:String,
					Date:Date,
					senderName:String
				}]
		}
);




module.exports = mongoose.model('Chat', chatModel);
