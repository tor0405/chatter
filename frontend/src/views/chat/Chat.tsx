import * as React from 'react';
import './Chat.scss'
import {ChatSocket} from "../../Sockets";
import {UserApi} from "../../Api";
import {RouteComponentProps} from 'react-router-dom';
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput"

interface State {
    messages:message[],
    socket:ChatSocket,
    name:string
}

interface Props extends RouteComponentProps<{ id: string; }>{

}

interface message{
    text:string,
    senderId:string,
    msgId:string;
    name:string,
}

export default class Chat extends React.Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            messages:[],
            socket:new ChatSocket(),
            name:"Chat med"
        }
    }

    componentDidMount(): void {
        let socket = new ChatSocket(this.props.match.params.id, this.messageRecieved.bind(this));
        this.setState({socket})
    }

    private messageRecieved(msg:message): void{
        if(!this.state.messages.find(m=>m.msgId==msg.msgId)){
            this.setState({
                messages:[...this.state.messages, msg]
            });
        }
    }

    public sendMessage(msg:string){
        this.state.socket.send(msg)
    }

    public renderMessages(){
        return this.state.messages.map(msg=>{
            return(
                <ChatMessage name={msg.name} key={msg.senderId} text={msg.text} self={msg.senderId==UserApi.getUserId()}/>
            )
        })
    }




    render(){
        return(
            <div className={"chat__container"}>
                <section className={"chat__header"}>
                        <span className={"chat__name"}>Tor Berre</span>
                </section>
                <section className={"chat__body"}>
                    <div className={"chat__content"}>
                        {this.renderMessages()}
                    </div>
                </section>
                <ChatInput callback={this.sendMessage}/>

            </div>
        )
    }

}
