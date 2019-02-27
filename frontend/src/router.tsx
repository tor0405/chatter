
import * as React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import { App } from './App';
import { Login } from './views/login/Login';
import {UserApi} from "./Api";
import Chat from "./views/chat/Chat"
import Landing from "./views/landing/Landing"

import {Register} from "./views/register/Register";
import {Dashboard} from "./views/dashboard/Dashboard";
import {User} from "./domain/UserInterfaces";

const ProtectedRoute = (isAllowed:any, { ...props }) =>
        isAllowed==true
        ? <Route {...props}/>
        : <Redirect to="/login"/>;

const Index = (isLoggedIn:any, props:Props) =>
    isLoggedIn==true
        ? <Dashboard {...props} />
        : <Landing {...props} />;

interface Props {
    history:any
}

export const AppRouter: React.FunctionComponent<{}> = () => {
    return (
        <Router>
            <div>
                <Route component={App} />
                <Switch>
                    <Route
                        exact path={"/"}
                        render={(props:Props) =>
                            UserApi.isLoggedIn() ? (
                                <Dashboard {...props} />
                            ) : (
                                <Landing />
                            )
                        }
                    />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route
                        exact path={"/chat/:id"}
                        render={props =>
                            UserApi.isLoggedIn() ? (
                                <Chat {...props}/>
                            ) : (
                                <Redirect to="/login"/>
                            )
                        }
                    />
                </Switch>
            </div>
        </Router>
    );
};
