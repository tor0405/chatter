//let devMessage={"msg":"Hvordan går det?", "msgId":"123", "senderId":"123", "name":"Tor", "date":Date.now()}

/*
  io.emit("message", JSON.stringify(devMessage));
  io.on('message', function(msg){
      io.emit("message", JSON.stringify({"msg":msg, "msgId":Math.floor(Math.random()*100), "senderId":"123", "name":"Tor", "date":Date.now()}))
  });*/


import chatSocketController from "./chatSocketController";

function connectionCallback(io:any, msg:any){
    if(msg.error){
        io.emit("error", "Not working..")
    }else{
        io.emit("info", "connected");
        io.emit("info", JSON.stringify({chat:msg.chat}))
    }
}

module.exports = (io:any)=>{

    io.on("connect", (msg:any)=>{
        chatSocketController.getChat(msg, (msg:any)=>connectionCallback(io,msg))
    })

};
