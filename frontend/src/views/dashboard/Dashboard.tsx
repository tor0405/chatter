import * as React from 'react';
import './Dashboard.scss'
import {UserApi} from "../../Api"
import Chat from "../chat/Chat";
import {ChatList} from "./ChatList";
import {Info} from "./Info";

interface State {
}

interface Props {
    history:any
}

export class Dashboard extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
    }


    public render() {
        return (
            <div className="dashboard__container">
                <div className={"dashboard__content"}>
                    <section className={"dashboard__info"}>
                        <Info {...this.props} />
                    </section>
                    <section className={"dashboard__sidebar"}>
                        <ChatList />
                    </section>
                </div>
            </div>
        );
    }

}
