import * as React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'

export const Header: React.FunctionComponent<{}> = () => {
    return (
        <div className="header">
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
        </div>
    );
}
