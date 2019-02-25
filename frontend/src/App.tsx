import * as React from 'react';
import { Header } from './components/Header';
import {UserApi} from "./Api"

export const App: React.FunctionComponent<{}> = (props) => {
    return (
        <div>
            <Header loggedIn={UserApi.isLoggedIn()} />
            {props.children}
        </div>

    );
};
