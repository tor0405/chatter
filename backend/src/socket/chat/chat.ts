//let devMessage={"msg":"Hvordan går det?", "msgId":"123", "senderId":"123", "name":"Tor", "date":Date.now()}

/*
  io.emit("message", JSON.stringify(devMessage));
  io.on('message', function(msg){
      io.emit("message", JSON.stringify({"msg":msg, "msgId":Math.floor(Math.random()*100), "senderId":"123", "name":"Tor", "date":Date.now()}))
  });*/


import chatSocketController from "./chatSocketController";


//TODO: Dont chain socket listeners

module.exports = (io:any, decoded:any, io_root:any)=>{
    io.on("chat-connect", (msg:any)=>{
        chatSocketController.getChat(msg, decoded,(msg:any)=>{
            if(msg.error){
                io.emit("chat-error", "Not working..")
            }else{
                io.emit("chat-info", "connected");
                io.emit("chat-setup", JSON.stringify({chat:msg.chat}));
                let chatId=msg.chat.public_id;
                io.join('/'+chatId);
                io.on("chat-message", (msgIn:any)=>{

                    let msg={
                        ...JSON.parse(msgIn),
                        senderId:decoded.id,
                        senderName:decoded.fullName
                    };
                    chatSocketController.sendMessage(chatId,msg,(text:any)=>{
                        io_root.in('/'+chatId).emit("chat-reply", JSON.stringify(msg))
                    })
                })
            }
        })
    })
};
