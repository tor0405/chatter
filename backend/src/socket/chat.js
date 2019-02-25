
module.exports = (io)=>{

    io.emit('request', /* */); // emit an event to the socket
    io.emit('broadcast', /* */); // emit an event to all connected sockets
    io.on('reply', function(){ /* */ }); // listen to the event
    io.emit("halo")

};
