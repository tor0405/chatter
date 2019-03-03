import io from "socket.io-client";

let socket = io("ws://localhost/", { //TODO: setup env
    path: "/socket/socket.io", transports: ["websocket"]
  }
);
socket.connect();

export default {
  user: {
    login(token: string) {
      socket.emit("login", token);
    },
    onLoginResponse(callback: Function) {
      socket.on("login-event", callback);
    }
  },

  chat: {
    connect(chatId: string) {
      socket.emit("chat-connect", chatId);
    },
    onInfo(callback: Function) {
      socket.on("chat-info", callback);
    },
    onMessage(callback: Function) {
      socket.on("chat-reply", callback);
    },
    onChatSetup(callback: Function) {
      socket.on("chat-setup", callback);
    },
    sendMessage(text: any) { //TODO:make interface
      let msg = {
        content: text,
        date: Date.now()
      };
      socket.emit("chat-message", JSON.stringify(msg));
    },
    clear() {
      socket.off("chat-info");
    }
  }
};

