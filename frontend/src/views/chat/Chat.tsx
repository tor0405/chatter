import * as React from 'react';
import './Chat.scss'
import {User} from "../../Api"


export default class Chat extends React.Component {

    render(){
        return(
            <div className={"chat__container"}>
                <section className={"chat__header"}>
                        <span className={"chat__name"}>Tor Berre</span>
                </section>
                <section className={"chat__body"}>
                        <div className={"chat__content"}>
                            <fieldset className={"chat__message"}>
                                <legend className={"chat__message__username"}>Tor</legend>
                                <span className={"chat__message__content"}>Hallo, hvordan går det?</span>
                            </fieldset>
                            <fieldset className={"chat__message chat__message--self"}>
                                <legend className={"chat__message__username"}>Meg</legend>
                                <span className={"chat__message__content"}>Bare bra, hva med deg?</span>
                            </fieldset>
                            <fieldset className={"chat__message"}>
                                <legend className={"chat__message__username"}>Tor</legend>
                                <span className={"chat__message__content"}>Baaaare bra.</span>
                            </fieldset>
                        </div>
                </section>
                <section className={"chat__new-message"}>
                    <form className={"chat__new-message__form"}>
                        <textarea className={"chat__new-message__input"} placeholder={"Skriv ny melding..."}></textarea>
                        <button className={"chat__new-message-submit"}>Send</button>
                    </form>
                </section>
            </div>
        )
    }

}
