var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');

var jwt = require('jsonwebtoken');


exports.sendMessage = function (chatId, message, callback) {
    if(message){
        Chat.findOneAndUpdate({id:chatId},{$push:{messages:message}}, (err, doc)=>{
            if(err){
                callback({error:err})
            }else{
                callback({success:true})
            }
        })
    }else{

    }
};
