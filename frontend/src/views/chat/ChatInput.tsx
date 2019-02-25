import * as React from 'react';

interface State{
    currentMsg:string;
}
interface Props {
    callback:Function
}

export const Header: React.FunctionComponent<{}> = () => {
    return (
        <section className={"chat__new-message"}>
            <form className={"chat__new-message__form"}>
                <textarea className={"chat__new-message__input"} placeholder={"Skriv ny melding..."} />
                <button className={"chat__new-message-submit"}>Send</button>
            </form>
        </section>
    );
};
