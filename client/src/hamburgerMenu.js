import { NavLink } from "react-router-dom";
// import { ReactComponent as House } from "./client/public/house.svg";
// import Playlist from "./playlist";

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
                    to="/all-bars"
                    activeClassName="burger-active"
                >
                    <img className="menu-icon" src="/cocktails.svg" />
                    <li>All Bars</li>
                </NavLink>
                <NavLink
                    onClick={toggleBurgerMenu}
                    to="/display-taste"
                    activeClassName="burger-active"
                >
                    <img className="menu-icon" src="/headphones.svg" />
                    <li>Music Preferences</li>
                </NavLink>
                <NavLink
                    onClick={toggleBurgerMenu}
                    to="/my-last-bar"
                    activeClassName="burger-active"
                >
                    <img className="menu-icon" src="/writing.svg" />
                    <li>Edit post</li>
                </NavLink>
                <NavLink
                    onClick={toggleBurgerMenu}
                    to="/all-my-posts"
                    activeClassName="burger-active"
                >
                    <img className="menu-icon" src="/envelope.svg" />
                    <li>All my posts</li>
                </NavLink>
                <a onClick={toggleBurgerMenu} href="/logout">
                    <img className="menu-icon" src="/switch-off.svg" />
                    <li>Logout</li>
                </a>
            </ul>
        </nav>
    );
}
