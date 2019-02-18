import * as React from 'react';

interface State {
    password:String;
    username:String;
}

interface Props {
}

export class Login extends React.Component<Props, State> {

    public render() {
        return (
            <div>
                <h1>Heia</h1>
            </div>
        );
    }
}
