import io from "socket.io-client";

let socket = io('ws://localhost:80', {
        path: '/socket/socket.io', transports: ['websocket'],
    },
);

export default {
    user:{
        login(token:string){
            socket.emit("login", token)
        }
    },

    chat:{
        connect(chatId:string){
            socket.emit("connect", chatId)
        },
        onInfo(callback:Function){
            socket.on("info", callback);
        },
        sendMessage(msg:any){ //TODO:make interface
          socket.emit("message", msg)
        },
        clear(){
            socket.off("info");
        }
    }
};

