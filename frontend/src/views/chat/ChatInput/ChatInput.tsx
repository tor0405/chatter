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

    private submit(e:any){
        e.preventDefault();
        this.props.callback(this.state.currentMsg);
        this.setState({
            currentMsg:""
        })
    }

    render(){
        return (
            <section className={"chat__new-message"}>
                <form className={"chat__new-message__form"}>
                    <input value={this.state.currentMsg}
                              onChange={(e:React.FormEvent<HTMLInputElement>)=>{
                                  // @ts-ignore en faktisk feil i TS gjør at jeg må bruke denne
                                  this.setState({currentMsg:e.target.value})}}
                              className={"chat__new-message__input"}
                              placeholder={"Skriv ny melding..."} />
                    <button onClick={(e)=>{this.submit(e)}} className={"chat__new-message-submit"}>Send</button>
                </form>
            </section>
        );
    }
};
