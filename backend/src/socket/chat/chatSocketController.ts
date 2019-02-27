var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');

var jwt = require('jsonwebtoken');




interface message {
    from:string;
    content:string;
    Date:Date;
}


function sendMessage(chatId:string, message:message, callback:Function){
    if(message){
        Chat.findOneAndUpdate({_id:chatId},{$push:{messages:message}}, (err:any, doc:any)=>{
            if(err){
                callback({error:err})
            }else{
                callback({success:true})
            }
        })
    }else{

    }
}


function getChat(chatId:string, callback:Function){
    Chat.findOne({_id:chatId}, (err:any, res:any)=>{
        if(err){
            callback({error:err})
        }else{
            callback({success:true, chat:res})
        }
    })
}

function createChat(creatorId:string, callback:Function){
    let new_chat=new Chat({participants:{_id:creatorId}, messages:[]});
    new_chat.save((err: any, res:any)=>{
        if(err){
            callback({error:err})
        }else{
            callback({success:true, chat:res})
        }
    })
}

export default {
    sendMessage,
    getChat,
    createChat
}
