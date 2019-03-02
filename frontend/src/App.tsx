import * as React from 'react';
import {Header} from './components/Header';
import {RouteComponentProps} from "react-router";


interface OwnProps {
}

interface State {
    isLoggedIn: boolean
}

type Props = OwnProps & RouteComponentProps;

export class App extends React.Component<OwnProps, State> {
    constructor(props: OwnProps) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }


    componentDidMount(): void {
        if (this.state.isLoggedIn != (window as any).isLoggedIn) {
            this.setState({
                isLoggedIn: (window as any).isLoggedIn
            })
        }
    }


    componentDidUpdate(): void {
        if (this.state.isLoggedIn != (window as any).isLoggedIn) {
            this.setState({
                isLoggedIn: (window as any).isLoggedIn
            })
        }
    }

    render() {
        return (
            <div>
                <Header {...this.props} loggedIn={this.state.isLoggedIn}/>
                {this.props.children}
            </div>

        );
    }
};

