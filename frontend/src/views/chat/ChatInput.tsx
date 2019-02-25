import * as React from 'react';

interface State{
    currentMsg:string;
}
interface Props {
    callback:Function
}

export class ChatInput extends React.Component<Props, State> {
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
                    <textarea value={this.state.currentMsg} className={"chat__new-message__input"} placeholder={"Skriv ny melding..."} />
                    <button className={"chat__new-message-submit"}>Send</button>
                </form>
            </section>
        );
    }
};
