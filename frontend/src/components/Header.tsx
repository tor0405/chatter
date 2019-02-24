import * as React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'

interface Props {
    loggedIn:boolean
}

export const Header: React.FunctionComponent<Props> = (props) => {
    function loggedIn() {
        return(
            <nav className="header__nav">
                <Link className="nav__link" to={"/login"}>
                    <button className="link__button">
                        Hjem
                    </button>
                </Link>
                <Link className="nav__link" to={"/register"}>
                    <button className="link__button">
                        Logg ut
                    </button>
                </Link>
            </nav>
        )
    }

    function loggedOut(){
        return(
            <nav className="header__nav">
                <Link className="nav__link" to={"/login"}>
                    <button className="link__button">
                        Login
                    </button>
                </Link>
                <Link className="nav__link" to={"/register"}>
                    <button className="link__button">
                        Register
                    </button>
                </Link>
            </nav>
        )
    }

    return (
        <div className="header">
            {props.loggedIn?loggedIn():loggedOut()}
        </div>
    );
};
