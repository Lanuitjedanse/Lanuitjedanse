import { NavLink } from "react-router-dom";
// import { ReactComponent as House } from "./client/public/house.svg";
import Playlist from "./playlist";

export default function HamburgerMenu({ toggleBurgerMenu }) {
    // console.log("props.toggleBurgerMenu: ", props.toggleBurgerMenu);
    return (
        <nav>
            <ul className="hamburger-menu">
                <NavLink
                    onClick={toggleBurgerMenu}
                    exact
                    to="/profile"
                    activeClassName="burger-active"
                >
                    <img className="menu-icon" src="/profile.svg" />

                    <li>Profile</li>
                </NavLink>
                <NavLink
                    exact
                    to="/"
                    activeClassName="burger-active"
                    onClick={toggleBurgerMenu}
                >
                    <img className="menu-icon" src="/location.svg" />
                    <li>Map</li>
                </NavLink>
                <NavLink
                    onClick={toggleBurgerMenu}
                    to="/feed"
                    activeClassName="burger-active"
                >
                    <img className="menu-icon" src="/envelope.svg" />
                    <li>Feed</li>
                </NavLink>
                <a onClick={toggleBurgerMenu} href="/logout">
                    <img className="menu-icon" src="/switch-off.svg" />
                    <li>Logout</li>
                </a>
            </ul>
        </nav>
    );
}
