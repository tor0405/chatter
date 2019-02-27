import {create} from "domain";

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
        Chat.findOneAndUpdate({public_id:chatId},{$push:{messages:message}}, (err:any, doc:any)=>{
            if(err){
                callback({error:err})
            }else{
                callback({success:true})
            }
        })
    }else{

    }
}


function getChat(chatId:string,token:any, callback:Function){
    Chat.findOne({public_id:chatId}, (err:any, res:any)=>{
        if(err){
            callback({error:err})
        }else{
            if(res==null){
                createChat(token.id,chatId, (msg:any)=>{
                    if(msg.err){
                        callback({error:msg.err})
                    }else{
                        callback({success:true, chat:msg.chat, created:true})
                    }
                })
            }else{
                callback({success:true, chat:res, created:false})
            }
        }
    })
}

function createChat(creatorId:string, public_id:string,callback:Function){
    let new_chat=new Chat({public_id:public_id,participants:{_id:creatorId}, messages:[]});
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
