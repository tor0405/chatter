let socket = require("socket.io");

let chat = require("./chat/chat.ts");
let jwt = require("jsonwebtoken");

module.exports = (app) => {
  let io = socket(app);
  io.on("connect", socket => {
    console.log("\n\n\n---------------\n");
    console.log("hallo");
    console.log("New client connected");
    socket.on("login", (token) => {
      socket.join(socket.id);
      jwt.verify(token, "Password123", {}, (err, decoded) => { //TODO: env!
        if (err) {
          socket.emit("login-event", "false");
        } else {
          io.sockets.in(socket.id).emit("login-event", "true");
          chat(socket, decoded, io);
        }
      });

    });
  });


};
