import * as React from 'react';
import "./ChatMessage.scss"


interface Props{
    name:string,
    text:string,
    self:boolean
}

export default class ChatMessage extends React.Component<Props>{
    render(){
        return(
            <fieldset className={"chat__message "+(this.props.self?"chat__message--self":"")}>
                <legend className={"chat__message__username"}>{this.props.name}</legend>
                <span className={"chat__message__content"}>{this.props.text}</span>
            </fieldset>
        )
    }
}
