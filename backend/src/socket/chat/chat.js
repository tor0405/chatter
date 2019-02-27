//let devMessage={"msg":"Hvordan går det?", "msgId":"123", "senderId":"123", "name":"Tor", "date":Date.now()}

/*
  io.emit("message", JSON.stringify(devMessage));
  io.on('message', function(msg){
      io.emit("message", JSON.stringify({"msg":msg, "msgId":Math.floor(Math.random()*100), "senderId":"123", "name":"Tor", "date":Date.now()}))
  });*/

import


module.exports = (io)=>{

    io.emit("info", "connected");

    io.on("connect", (msg)=>{

    })

};
