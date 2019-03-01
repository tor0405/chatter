import * as React from 'react';
import './ChatList.scss'
import {ChatApi} from "../../Api"
import {Link} from "react-router-dom";

interface Chat {
    public_id:string
}

interface State {
    chatList:Chat[]
}

interface Props {
}

export class ChatList extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state={
            chatList:[]
        }
    }


    componentDidMount(): void {
        ChatApi.getUserChats().then(res=>{
            this.setState({
                chatList:res.chatList
            })
        })
    }

    renderChatList(){
        if(this.state.chatList){
            return this.state.chatList.map(e=>{
                return(
                    <Link key={e.public_id} to={"/chat/"+e.public_id} className={"chatlist__item"}>
                       {e.public_id}
                    </Link>
                )
            })
        }
    }


    public render() {
        return (
            <div className="chatlist__container">
                {this.renderChatList()}
            </div>
        );
    }

}
