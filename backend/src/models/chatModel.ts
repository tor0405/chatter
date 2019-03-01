const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let chatModel = new mongoose.Schema(
		{
				public_id:{
					type:String,
					unique:true
				},
				participants: [{_id:String}],
				messages:[{
					senderId:String,
					content:String,
					Date:Date,
					senderName:String
				}],
				invite_only:Boolean,
				open:{
					type:Boolean,
					required:true
				},
				secret:String
		}
);




module.exports = mongoose.model('Chat', chatModel);
