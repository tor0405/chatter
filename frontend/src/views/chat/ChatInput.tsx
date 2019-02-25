import * as React from 'react';
import "./ChatInput.scss"

interface State{
    currentMsg:string;
}
interface Props {
    callback:Function
}

export default class ChatInput extends React.Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state={
            currentMsg:""
        }
    }

    render(){
        return (
            <section className={"chat__new-message"}>
                <form className={"chat__new-message__form"}>
                    <textarea value={this.state.currentMsg}
                              onChange={(e:React.FormEvent<HTMLTextAreaElement>)=>{
                                  // @ts-ignore en faktisk feil i TS gjør at jeg må bruke denne
                                  this.setState({currentMsg:e.target.value})}}
                              className={"chat__new-message__input"}
                              placeholder={"Skriv ny melding..."} />
                    <button className={"chat__new-message-submit"}>Send</button>
                </form>
            </section>
        );
    }
};
