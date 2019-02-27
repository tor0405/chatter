//let devMessage={"msg":"Hvordan går det?", "msgId":"123", "senderId":"123", "name":"Tor", "date":Date.now()}

/*
  io.emit("message", JSON.stringify(devMessage));
  io.on('message', function(msg){
      io.emit("message", JSON.stringify({"msg":msg, "msgId":Math.floor(Math.random()*100), "senderId":"123", "name":"Tor", "date":Date.now()}))
  });*/


import * as chatSocketController from 'chatSocketController';

function connectionCallback(io, msg){
    if(msg.error){
        io.emit("error", "Not working..")
    }else{
        io.emit("info", "connected");
        io.emit("info", JSON.stringify({chat:msg.chat}))
    }
}

module.exports = (io)=>{

    io.on("connect", (msg)=>{
        chatSocketController.getChat(msg, connectionCallback(io))
    })

};
