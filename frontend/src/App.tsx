import * as React from 'react';
import { Header } from './components/Header';
import {UserApi} from "./Api"


interface Props {
    children:any
}
interface State {
    isLoggedIn:boolean
}

export class App extends React.Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state={
            isLoggedIn:false
        }
    }
    componentDidMount(): void {
        if(this.state.isLoggedIn!=(window as any).isLoggedIn){
            this.setState({
                isLoggedIn:(window as any).isLoggedIn
            })
        }
    }

    componentDidUpdate(): void {
        console.log(this.state.isLoggedIn);
        if(this.state.isLoggedIn!=(window as any).isLoggedIn){
            this.setState({
                isLoggedIn:(window as any).isLoggedIn
            })
        }
    }

    render(){
        return (
            <div>
                <Header loggedIn={this.state.isLoggedIn} />
                {this.props.children}
            </div>

        );
    }
};
