

let socket = require('socket.io');

let chat = require("./chat/chat");
let jwt =  require("jsonwebtoken");

module.exports = (app)=>{
    let io= socket(app);
    io.on("connection", socket => {
        console.log("New client connected")
        io.on("message",(a)=>{
            console.log(a)
        });
        socket.on("login", (token)=>{
            console.log("hello")
            jwt.verify(token, "Password123", {}, (err, decoded)=>{
                io.emit("login-event", "true");
                chat(socket, decoded);
                console.log(err)
                console.log(decoded)
            });

        });
    });



};
