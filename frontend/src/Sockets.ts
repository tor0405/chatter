import io from 'socket.io-client';
/*
The socket-classes will not stateless like the api classes, as websockets is not stateless.
 */

export class ChatSocket {
    private msgReciever:Function;
    private socket:SocketIOClient.Socket = io();
    private name:string="";

    constructor(chatID:string="", msgReciever:Function=()=>{}, infoReciever:Function=()=>{}){
        this.socket = io('http://localhost:3000/', {path: '/websocket/socket.io',transports:['websocket']});
        this.socket.send(JSON.stringify({"chatID":chatID}));
        this.msgReciever=msgReciever;
        this.socket.on("message", this.recieve.bind(this));
        this.socket.on("connection", this.setName)
    }

    private setName(name:string):void{
        this.name=name;
    }

    public getName():string{
        return this.name;
    }

    private recieve(msg:string){
        this.msgReciever(JSON.parse(msg))
    }


    public send(msg:string){
        this.socket.send(msg)
    }

}
