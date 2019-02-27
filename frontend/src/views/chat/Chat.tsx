import * as React from 'react';
import './Chat.scss'
import {UserApi} from "../../Api";
import {RouteComponentProps} from 'react-router-dom';
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput"
import socket from "./../../socket"
import {User} from "../../domain/UserInterfaces";

interface State {
    messages: message[],
    socket: SocketIOClient.Socket | null,
    info: {
        name: string
    }
}

interface Props extends RouteComponentProps<{ id: string; }> {

}

interface message {
    msg: string,
    senderId: string,
    senderName:string,
    date: string;
    content: string,
}

//TODO:autoscroll when new msg
export default class Chat extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            messages: [],
            socket: null,
            info: {
                name: ""
            }
        }
    }

    componentDidMount(): void {
        socket.user.login(UserApi.getUserToken());
        socket.user.onLoginResponse((status:any)=>{
            if(status=="true"){
                socket.chat.connect(this.props.match.params.id);
                socket.chat.onMessage(this.recieveMessage.bind(this));
                socket.chat.onInfo(this.recieveInfo.bind(this))
                socket.chat.onChatSetup(this.setupChat.bind(this))
            }
        })
    }

    private setupChat(chatInfo:any){
        let info=JSON.parse(chatInfo);
        if(info.chat.messages){
            this.setState({
                messages:info.chat.messages
            });
        }
    }

    private recieveInfo(infoIn: any) {

    }

    private recieveMessage(msgIn: string): void {
        let msg = JSON.parse(msgIn);
        console.log(msg)
        if (!this.state.messages.find(m => m.date == msg.date)) {
            this.setState({
                messages: [...this.state.messages, msg]
            });
        }
    }

    public sendMessage(msg: string) {
        socket.chat.sendMessage(msg)
    }

    public renderMessages() {
        return this.state.messages.map(msg => {
            return (
                <ChatMessage name={msg.senderName} date={msg.date} key={msg.date} text={msg.content} self={msg.senderId == UserApi.getUserId()}/>
            )
        })
    }


    render() {
        return (
            <div className={"chat__container"}>
                <section className={"chat__header"}>
                    <span className={"chat__name"}>{this.state.info.name}</span>
                </section>
                <section className={"chat__body"}>
                    <div className={"chat__content"}>
                        {this.renderMessages()}
                    </div>
                </section>
                <ChatInput callback={this.sendMessage.bind(this)}/>
            </div>
        )
    }

}
