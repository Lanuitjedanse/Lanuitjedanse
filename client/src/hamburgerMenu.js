import { NavLink } from "react-router-dom";
// import { ReactComponent as House } from "./client/public/house.svg";

export default function HamburgerMenu({ toggleBurgerMenu }) {
    // console.log("props.toggleBurgerMenu: ", props.toggleBurgerMenu);
    return (
        <nav>
            <ul className="hamburger-menu">
                <NavLink
                    onClick={toggleBurgerMenu}
                    exact
                    to="/"
                    activeClassName="burger-active"
                >
                    <img className="menu-icon" src="/house.svg" fill="white" />

                    <li>Profile</li>
                </NavLink>
                <NavLink
                    to="/chat"
                    activeClassName="burger-active"
                    onClick={toggleBurgerMenu}
                >
                    <img className="menu-icon" src="/chat.svg" />
                    <li>Map</li>
                </NavLink>
                <NavLink
                    onClick={toggleBurgerMenu}
                    to="/show-my-friends"
                    activeClassName="burger-active"
                >
                    <img className="menu-icon" src="/friends.svg" />
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
