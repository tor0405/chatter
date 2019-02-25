import io from 'socket.io-client';
/*

The socket-classes will not stateless like the api classes, as websockets is not stateless.

 */

export class ChatSocket {
    private msgReciever:Function;
    private infoReciever:Function;
    private socket:SocketIOClient.Socket|null = null;
    private name:string="";

    constructor(chatID:string="", msgReciever:Function=()=>{}, infoReciever:Function=()=>{}){
        this.socket = io('ws://localhost:3000', {path: '/websocket/socket.io',transports:['websocket']});
        this.socket.send(JSON.stringify({"chatID":chatID}));
        this.msgReciever=msgReciever;                               //message from another user
        this.infoReciever=infoReciever;                             // info from the server
        this.socket.on("message", this.recieveMsg.bind(this));
        this.socket.on("info", this.infoReciever)
    }

    private setName(name:string):void{
        this.name=name;
    }

    public getName():string{
        return this.name;
    }

    private recieveMsg(msg:string){
        this.msgReciever(JSON.parse(msg))
    }

    private recieveInfo(info:string){
        this.infoReciever(JSON.parse(info))
    }

    public sendMsg(msg:string){
        (<SocketIOClient.Socket>this.socket).send(msg)
    }

}
