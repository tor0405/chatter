import io from "socket.io-client";

let socket = io('ws://localhost:3000', {
        path: '/socket/socket.io', transports: ['websocket'],
    },
);
socket.connect();

export default {
    user:{
        login(token:string){
            socket.emit("login", token)
        },
        onLoginResponse(callback:Function){
            socket.on("login-event", callback)
        }
    },

    chat:{
        connect(chatId:string){
            socket.emit("chat-connect", chatId)
        },
        onInfo(callback:Function){
            socket.on("chat-info", callback);
        },
        onMessage(callback:Function){
            socket.on("chat-message", callback);
        },
        sendMessage(msg:any){ //TODO:make interface
          socket.emit("chat-message", msg)
        },
        clear(){
            socket.off("chat-info");
        }
    }
};

