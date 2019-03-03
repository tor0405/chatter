import chatSocketController from "./chatSocketController";

//TODO: Dont chain socket listeners

//TODO: Create common error messages in enums


module.exports = (socket: any, decoded: any, io: any) => {
  socket.on("chat-connect", (msg: any) => {
    chatSocketController.getChat(msg, decoded, (msg: any) => {
      if (msg.error) {
        io.sockets.in(socket.id).emit("chat-error", msg.error);
      } else {
        io.sockets.in(socket.id).emit("chat-info", "connected");
        io.sockets.in(socket.id).emit("chat-setup", JSON.stringify({ chat: msg.chat }));
        let chatId = msg.chat.public_id;
        socket.join(chatId);
        socket.on("chat-message", (msgIn: any) => {
          let msg = {
            ...JSON.parse(msgIn),
            senderId: decoded.id,
            senderName: decoded.fullName
          };
          chatSocketController.sendMessage(chatId, msg, (text: any) => {
            io.sockets.in(chatId).emit("chat-reply", JSON.stringify(msg));
          });
        });
      }
    });
  });
};
