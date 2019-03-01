

let socket = require('socket.io');

let chat = require("./chat/chat.ts");
let jwt =  require("jsonwebtoken");

module.exports = (app)=>{
    let io= socket(app);
    io.on("connection", socket => {
        console.log("New client connected");
        socket.on("login", (token)=>{
            jwt.verify(token, "Password123", {}, (err, decoded)=>{
                if(err){
                    io.emit("login-event", "false");
                }else{
                    io.emit("login-event", "true");
                    chat(socket, decoded, io);
                }
            });

        });
    });



};
