
import * as React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { App } from './app';
import { Login } from './views/login/Login';

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <Router>
            <div>
                <Route component={App} />
                <Switch>
                    <Route exact path="/login" component={Login} />
                </Switch>
            </div>
        </Router>
    );
}
