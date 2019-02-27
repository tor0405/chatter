var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat');

var jwt = require('jsonwebtoken');




interface message{
    from:string;
    content:string;
    Date:Date;
}


export function sendMessage(chatId:string, message:message, callback:Function){
    if(message){
        Chat.findOneAndUpdate({_id:chatId},{$push:{messages:message}}, (err, doc)=>{
            if(err){
                callback({error:err})
            }else{
                callback({success:true})
            }
        })
    }else{

    }
}


export function getChat(chatId:string, callback:Function){
    Chat.findOne({_id:chatId}, (err, res)=>{
        if(err){
            callback({error:err})
        }else{
            callback({success:true, chat:res})
        }
    })
}

export function createChat(creatorId:string, callback:Function){
    let new_chat=new Chat({participants:{_id:creatorId}, messages:[]});
    new_chat.save((err, res)=>{
        if(err){
            callback({error:err})
        }else{
            callback({success:true, chat:res})
        }
    })
}

