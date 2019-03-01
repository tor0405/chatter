import * as React from 'react';
import './Info.scss'
const { uniqueNamesGenerator } = require('unique-names-generator');


interface Props {
    history:any
}
export class Info extends React.Component<Props> {
    constructor(props:Props) {
        super(props);
    }


    public generateLink(){
        this.props.history.push("/chat/"+uniqueNamesGenerator('-', true))
    }



    public render() {
        return (
            <div className="info__container">
                <h1>Velkommen til Chatter</h1>
                <b>Chatter lar deg snakke realtime med venner eller kollegaer.</b>
                <p>Trykk på knappen nedenfor for å generere en ny samtalelink som du kan sende til andre brukere</p>
                <button className={"info__create"} onClick={()=>{this.generateLink()}}>Generer samtale</button>
            </div>
        );
    }

}
