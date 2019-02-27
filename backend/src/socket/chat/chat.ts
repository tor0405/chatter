//let devMessage={"msg":"Hvordan går det?", "msgId":"123", "senderId":"123", "name":"Tor", "date":Date.now()}

/*
  io.emit("message", JSON.stringify(devMessage));
  io.on('message', function(msg){
      io.emit("message", JSON.stringify({"msg":msg, "msgId":Math.floor(Math.random()*100), "senderId":"123", "name":"Tor", "date":Date.now()}))
  });*/


import chatSocketController from "./chatSocketController";


function connectionCallback(io:any, msg:any){
    if(msg.error){
        io.emit("chat-error", "Not working..")
    }else{
        io.emit("chat-info", "connected");
        io.emit("chat-info", JSON.stringify({chat:msg.chat}))
    }
}

module.exports = (io:any, decoded:any)=>{
    io.on("chat-connect", (msg:any)=>{
        chatSocketController.getChat(msg, decoded,(msg:any)=>connectionCallback(io,msg))
    })
};
