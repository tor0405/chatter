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
    msgId: string;
    name: string,
}

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
            }
        })
    }

    private recieveInfo(info: object) {
        //this.setState(info)
    }

    private recieveMessage(msgIn: string): void {
        let msg = JSON.parse(msgIn);
        if (!this.state.messages.find(m => m.msgId == msg.msgId)) {
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
                <ChatMessage name={msg.name} key={msg.msgId} text={msg.msg} self={msg.senderId == UserApi.getUserId()}/>
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
