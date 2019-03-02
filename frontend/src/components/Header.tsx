import * as React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import './Header.scss'
import {UserApi} from "../Api";

interface Props {
    loggedIn: boolean,
    location?: any
}


export const Header: React.FunctionComponent<Props> = (props) => {

    const [navbarShown, showNavbar] = useState(false);
    const [lastLocation, changeLocation] = useState("");


    function locationChanged() {
        if (lastLocation != props.location) {
            changeLocation(props.location);
            showNavbar(false)
        }
    }

    locationChanged();


    function loggedIn() {
        return (
            <nav className="header__nav">
                <section className={"header__left"}>
                    <Link className="nav__link" to={"/"}>
                        <button className="link__logo">
                            Chatter
                        </button>
                    </Link>
                </section>
                <section className={"header__right " + (navbarShown ? " header__right--active" : "")}>
                    <Link className="nav__link" onClick={UserApi.logOut} to={"/"}>
                        <button className="link__button">
                            Logg ut
                        </button>
                    </Link>
                </section>

                <section className={"header__mobile-menu"}>
                    <span
                        onClick={() => {
                            showNavbar(!navbarShown)
                        }}
                        className={"menu-button " + (navbarShown ? "is-active" : "")}
                        id="menuButton">
                        <span className="burger-icon"></span>
                    </span>
                </section>
            </nav>
        )
    }

    function loggedOut() {
        return (
            <nav className="header__nav">
                <section className={"header__left"}>
                    <Link className="nav__link" to={"/"}>
                        <button className="link__logo">
                            Chatter
                        </button>
                    </Link>
                </section>
                <section className={"header__right " + (navbarShown ? " header__right--active" : "")}>
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
                    <span onClick={() => {
                        showNavbar(!navbarShown);
                    }} className={"menu-button " + (navbarShown ? "is-active" : "")} id="menuButton">
                        <span className="burger-icon"></span>
                    </span>
                </section>
            </nav>
        )
    }

    return (
        <div className="header">
            {props.loggedIn ? loggedIn() : loggedOut()}
        </div>
    );
};
