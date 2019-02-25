let socket = require('socket.io');

let chat = require("./chat");

module.exports = (app)=>{
    let io= socket(app);
    io.on('connection', function(socket){
        chat(io);
    });
};
