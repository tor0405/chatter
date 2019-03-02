import * as React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {App} from './App';
import {Login} from './views/login/Login';
import {UserApi} from "./Api";
import Chat from "./views/chat/Chat"
import Landing from "./views/landing/Landing"

import {Register} from "./views/register/Register";
import {Dashboard} from "./views/dashboard/Dashboard";

const ProtectedRoute = (isAllowed: any, {...props}) =>
    isAllowed == true
        ? <Route {...props}/>
        : <Redirect to="/login"/>;

const Index = (isLoggedIn: any, props: Props) =>
    isLoggedIn == true
        ? <Dashboard {...props} />
        : <Landing/>;

interface Props {
    history: any
}

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Route component={App}/>
                <Switch>
                    <Route
                        exact path={"/"}
                        render={(props: Props) =>
                            UserApi.isLoggedIn() ? (
                                <Dashboard {...props} />
                            ) : (
                                <Landing/>
                            )
                        }
                    />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
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
