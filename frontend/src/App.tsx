import * as React from 'react';
import { Header } from './components/Header';

export const App: React.FunctionComponent<{}> = (props) => {
    return (
        <div>
            <Header />
            {props.children}
        </div>

    );
};
