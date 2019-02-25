let devMessage={"msg":"Hvordan går det?", "msgId":"123", "senderId":"123", "name":"Tor", "date":Date.now()}

module.exports = (io)=>{

    io.emit('request', /* */); // emit an event to the socket
    io.emit('broadcast', /* */); // emit an event to all connected sockets
    io.emit("message", JSON.stringify(devMessage));
    io.on('message', function(msg){
        io.emit("message", JSON.stringify({"msg":msg, "msgId":Math.floor(Math.random()*100), "senderId":"123", "name":"Tor", "date":Date.now()}))
    });

};
