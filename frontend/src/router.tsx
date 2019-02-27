
import * as React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import { App } from './App';
import { Login } from './views/login/Login';
import {UserApi} from "./Api";
import Chat from "./views/chat/Chat"
import Landing from "./views/landing/Landing"

const ProtectedRoute = (isAllowed:any, { ...props }) =>
        isAllowed==true
        ? <Route {...props}/>
        : <Redirect to="/login"/>;

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <Router>
            <div>
                <Route component={App} />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/login" component={Login} />
                    <ProtectedRoute
                        isAllowed={UserApi.isLoggedIn()}
                        exact
                        path="/chat/:id" component={Chat}/>
                </Switch>
            </div>
        </Router>
    );
};
