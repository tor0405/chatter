
module.exports = (io)=>{

    io.emit('request', /* */); // emit an event to the socket
    io.emit('broadcast', /* */); // emit an event to all connected sockets
    io.on('reply', function(){ /* */ }); // listen to the event
    io.emit("message", JSON.stringify({"msg":"Hvordan går det?", "msgId":"123", "text":"1231", "senderId":"123", "name":"Tor", "date":Date.now()}))

};
