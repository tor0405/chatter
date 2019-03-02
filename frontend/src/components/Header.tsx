import * as React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'
import {UserApi} from "../Api";
import {useState} from "react";

interface Props {
    loggedIn:boolean
}

export const Header: React.FunctionComponent<Props> = (props) => {
    const [isActive, setActive] = useState(false);

    function loggedIn() {
        return(
            <nav className="header__nav">
                <section className={"header__left"}>
                    <Link className="nav__link" to={"/"}>
                        <button className="link__logo">
                            Chatter
                        </button>
                    </Link>
                </section>
                <section className={"header__right "+(isActive?" header__right--active":"")}>
                    <Link className="nav__link" onClick={UserApi.logOut} to={"/"}>
                        <button className="link__button">
                            Logg ut
                        </button>
                    </Link>
                </section>

                <section className={"header__mobile-menu"}>
                    <span onClick={()=>{setActive(!isActive)}} className={"menu-button "+(isActive?"is-active":"")} id="menuButton">
                        <span className="burger-icon"></span>
                    </span>
                </section>
            </nav>
        )
    }

    function loggedOut(){
        return(
            <nav className="header__nav">
                <section className={"header__left"}>
                    <Link className="nav__link" to={"/"}>
                        <button className="link__logo">
                            Chatter
                        </button>
                    </Link>
                </section>
                <section className={"header__right "+(isActive?" header__right--active":"")}>
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
                </section>
                <section className={"header__mobile-menu"}>
                    <span onClick={()=>{setActive(!isActive);console.log(isActive)}} className={"menu-button "+(isActive?"is-active":"")} id="menuButton">
                        <span className="burger-icon"></span>
                    </span>
                </section>
            </nav>
        )
    }

    return (
        <div className="header">
            {props.loggedIn?loggedIn():loggedOut()}
        </div>
    );
};
