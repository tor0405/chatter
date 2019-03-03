import * as React from "react";
import "./Chat.scss";
import { ChatApi, UserApi } from "../../Api";
import { RouteComponentProps } from "react-router-dom";
import ChatMessage from "./ChatMessage/ChatMessage";
import ChatInput from "./ChatInput/ChatInput";
import socket from "./../../socket";
import ChatHeader from "./ChatHeader/ChatHeader";
import { toast } from "react-toastify";

interface State {
  messages: message[],
  socket: SocketIOClient.Socket | null,
  info: {
    public_id: string,
    admin: boolean,
    open: boolean
  }
}

interface Props extends RouteComponentProps<{ id: string; }> {
  history: any,
}

interface message {
  msg: string,
  senderId: string,
  senderName: string,
  date: string;
  content: string,
}

//TODO:autoscroll when new msg

export default class Chat extends React.Component<Props, State> {
  chatBody: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      socket: null,
      info: {
        public_id: "",
        admin: false,
        open: false
      }
    };
  }

  componentDidMount(): void {
    socket.user.login(UserApi.getUserToken());
    socket.user.onLoginResponse((status: any) => {
      if (status == "true") {
        socket.chat.connect(this.props.match.params.id);
        socket.chat.onMessage(this.recieveMessage.bind(this));
        socket.chat.onInfo(this.recieveInfo.bind(this));
        socket.chat.onError(this.recieveError.bind(this));
        socket.chat.onChatSetup(this.setupChat.bind(this));
      }
    });


  }

  private setupChat(chatInfo: any) {
    let info = JSON.parse(chatInfo);
    let admin = ((chat) => {
      let userId = UserApi.getUserId();
      return chat.participants.every((user: any) => {
        if (user._id === userId) {
          return user.admin;
        } else {
          return true;
        }
      });
    })(info.chat);

    if (info.chat.messages) {
      console.log(info.chat.open);
      this.setState({
        messages: info.chat.messages,
        info: {
          public_id: info.chat.public_id,
          admin: admin,
          open: info.chat.open
        }
      });
    }
    this.scrollToBottom("auto");
  }

  private recieveInfo(infoIn: any) {

  }

  private recieveError(errorIn: String) {
    if (errorIn == "LOCKED") {
      toast.error("Rommet er låst", { autoClose: 2000 });
    }
    this.props.history.push("/");
  }

  private recieveMessage(msgIn: string): void {
    let msg = JSON.parse(msgIn);
    if (!this.state.messages.find(m => m.date == msg.date)) {
      this.setState({
        messages: [...this.state.messages, msg]
      });
    }
    this.scrollToBottom("smooth");
  }

  public sendMessage(msg: string) {
    socket.chat.sendMessage(msg);
  }

  public renderMessages() {
    return this.state.messages.map(msg => {
      return (
        <ChatMessage name={msg.senderName} date={msg.date} key={msg.date} text={msg.content}
                     self={msg.senderId == UserApi.getUserId()}/>
      );

    });
  }

  switchUpdate(open: boolean) {
    ChatApi.updateRoom(this.state.info.public_id, { open }).then(res => {
      toast("Rominnstillinger oppdatert", { autoClose: 2000 });
    });
    this.setState({
      info: {
        ...this.state.info,
        open: open
      }
    });
  }

  scrollToBottom(behavior: ScrollOptions["behavior"]) {
    if (this.chatBody) {
      this.chatBody.scrollTo({
        top: this.chatBody.scrollHeight,
        behavior: behavior
      });
    }
  }


  render() {
    return (
      <div className={"chat__container"}>
        <ChatHeader admin={this.state.info.admin} open={this.state.info.open}
                    public_id={this.state.info.public_id}
                    switchCallback={this.switchUpdate.bind(this)}
        />
        <section className={"chat__body"}>
          <div ref={el => {
            this.chatBody = el;
          }} className={"chat__content"}>
            {this.renderMessages()}
          </div>
        </section>
        <ChatInput callback={this.sendMessage.bind(this)}/>
      </div>
    );
  }

}
