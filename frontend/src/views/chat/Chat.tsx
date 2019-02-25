import * as React from 'react';
import './Chat.scss'
import {UserApi, ChatApi} from "../../Api"
import {RouteProps, RouteComponentProps, match} from 'react-router-dom';

interface State {
    messages:message[]
}

interface Props extends RouteComponentProps<{ id: string; }>{

}

interface message{
    text:string,
    id:string,
    name:string,
}

export default class Chat extends React.Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={
            messages:[]
        }
    }

    componentDidMount(): void {
        ChatApi.getChat(this.props.match.params.id)
            .then((res)=>{
              this.setState({messages:res.messages})
            })
            .catch(err=>{
                console.log(err)
            })

        ChatApi.initChat("1");
    }


    render(){
        return(
            <div className={"chat__container"}>
                <section className={"chat__header"}>
                        <span className={"chat__name"}>Tor Berre</span>
                </section>
                <section className={"chat__body"}>
                        <div className={"chat__content"}>

                        </div>
                </section>
                <section className={"chat__new-message"}>
                    <form className={"chat__new-message__form"}>
                        <textarea className={"chat__new-message__input"} placeholder={"Skriv ny melding..."} />
                        <button className={"chat__new-message-submit"}>Send</button>
                    </form>
                </section>
            </div>
        )
    }

}
