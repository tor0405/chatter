import * as React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FunctionComponent<{}> = () => {
    return (
        <div>
            <Link to={"/login"}>Login</Link>
            <Link to={"/test"}>test</Link>
        </div>
    );
}
