
import * as React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { App } from './App';
import { Login } from './views/login/Login';
import Chat from "./views/chat/Chat"

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <Router>
            <div>
                <Route component={App} />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/chat/:id" component={Chat} />
                </Switch>
            </div>
        </Router>
    );
};
