import io from 'socket.io-client';
/*
The socket-classes will not stateless like the api classes, as websockets is not stateless.
 */

export class ChatSocket {
    private caller:Function;

    constructor(chatID:string, caller:Function){
        const socket = io('http://localhost:3000/', {path: '/websocket/socket.io',transports:['websocket']});
        socket.send(JSON.stringify({"chatID":chatID}));
        this.caller=caller;
        socket.on("message", this.recieve.bind(this));
    }

    private recieve(msg:string){
        this.caller(JSON.parse(msg))
    }


}
