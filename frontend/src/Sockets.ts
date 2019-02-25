import io from 'socket.io-client';
/*
The socket-classes will not stateless like the api classes, as websockets is not stateless.
 */

export class ChatSocket {
    private caller:Function;
    private socket:SocketIOClient.Socket = io();

    constructor(chatID:string="", caller:Function=()=>{}){
        this.socket = io('http://localhost:3000/', {path: '/websocket/socket.io',transports:['websocket']});
        this.socket.send(JSON.stringify({"chatID":chatID}));
        this.caller=caller;
        this.socket.on("message", this.recieve.bind(this));
    }


    private recieve(msg:string){
        this.caller(JSON.parse(msg))
    }


    public send(msg:string){
        this.socket.send(msg)
    }

}
