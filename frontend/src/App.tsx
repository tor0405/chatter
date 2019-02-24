import * as React from 'react';
import { Header } from './components/Header';
import {User} from "./Api"

export const App: React.FunctionComponent<{}> = (props) => {
    return (
        <div>
            <Header loggedIn={User.isLoggedIn()} />
            {props.children}
        </div>

    );
};
